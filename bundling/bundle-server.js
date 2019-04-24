const path = require('path');

module.exports = ({ isDevelopment, plugins = [], rootDir, srcPath }) => ({
  devtool: 'source-map',
  entry: {
    server: [path.join(srcPath, 'server', 'index.tsx')]
  },
  mode: isDevelopment ? 'development' : 'production',
  output: {
    filename: '[name].bundle.js',
    path: path.join(rootDir, 'dist'),
    libraryTarget: 'commonjs'
  },
  plugins
});
