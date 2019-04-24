module.exports = app =>
  app.get('/*', (req, res, next) => {
    res.setHeader('Cache-Control', 'assets, max-age=604800');

    const {
      data,
      status,
      isJson = false
    } = require('../../../dist/server.bundle').parseRequest({
      initialState: {},
      route: req.path,
      next
    });

    res.status(status)[isJson ? 'json' : 'send'](data);
  });
