const path = require('path');
const { json } = require('body-parser');
const express = require('express');
const { onListen } = require('../bundling/console');

const app = express();
const port = process.env.PORT || 8080;
const rootDir = path.resolve(__dirname, '..');

// Hide powered by express
app.disable('x-powered-by');

// Serving static files
app.use('/assets', express.static(path.resolve(rootDir, 'dist', 'assets')));
app.use(json());

// Start the server
app.listen(port, () => onListen(port));

// Only load in correct configuration
(!!(process.env.DEVELOPMENT || '').match(/true/)
  ? require('./dev')
  : require('./prod'))(app, { rootDir });
