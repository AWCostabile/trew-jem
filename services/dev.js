const path = require('path');
const webpack = require('webpack');
const fs = new (require('memory-fs'))();
const requireFromString = require('require-from-string');
const configCreator = require('../bundling/creator');
const { onResponse } = require('../bundling/console');

module.exports = (app, { rootDir }) => {
  function applyWatch(app, isServer) {
    const config = configCreator({
      isDevelopment: true,
      isServer,
      rootDir,
      srcPath: path.resolve(rootDir, 'src')
    });

    const compiler = webpack(config);

    app.use(
      require('webpack-dev-middleware')(compiler, {
        noInfo: true,
        publicPath: config.output.publicPath,
        stats: 'errors-only',
        watchOptions: {
          ignored: /node_modules/,
          aggregateTimeout: 1000,
          poll: 2000
        }
      })
    );

    if (isServer) {
      compiler.outputFileSystem = fs;
    }

    app.use(require('webpack-hot-middleware')(compiler));
  }

  app.get('/exit-application', (_, res) => {
    if (process.env.PORT) {
      res.send('Sorry, the server denies your request');
    } else {
      res.send('shutting down');
      process.exit(0);
    }
  });

  applyWatch(app, false);
  applyWatch(app, true);

  app.all('/*', async (req, res) => {
    const file = requireFromString(
      fs.readFileSync(path.join(rootDir, 'dist', 'server.bundle.js'), 'utf8'),
      'server.bundle.js'
    );

    const response = await file.parseRequest({
      initialState: {},
      ...req
    });

    const { data, headers = {}, isJson = false, status } = response;

    res.set({
      'Cache-Control': 'assets, max-age=604800',
      ...headers
    });

    onResponse(status, req.path);

    res.status(status)[isJson ? 'json' : 'send'](data);
  });
};
