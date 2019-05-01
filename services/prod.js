const { onResponse } = require('../bundling/console');

module.exports = app =>
  app.all('/*', async (req, res) => {
    const response = await require('../dist/server.bundle').parseRequest({
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
