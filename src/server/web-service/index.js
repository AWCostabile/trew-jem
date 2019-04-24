const path = require('path');
const express = require('express');
const { multiColor } = require('../../../bundling/utils');

const app = express();
const port = process.env.PORT || 8080;
const rootDir = path.resolve(__dirname, '..', '..', '..');

// hide powered by express
app.disable('x-powered-by');

// Serving static files
app.use('/assets', express.static(path.resolve(rootDir, 'dist', 'assets')));

// start the server
app.listen(port, () => {
  console.log(
    multiColor([
      ['\nWeb service is listening on port ', 'red'],
      [`${port}\n`, 'yellow']
    ])
  );
});

// tiny trick to stop server during local development
(!!(process.env.DEVELOPMENT || '').match(/true/)
  ? require('./dev')
  : require('./prod'))(app, { rootDir });
