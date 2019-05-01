const path = require('path');
const vendors = require('./vendors');
const webpack = require('webpack');
const ForkTsChecker = require('fork-ts-checker-webpack-plugin');

module.exports = ({ isDevelopment, plugins = [], rootDir, srcPath }) => ({
  devtool: 'source-map',
  entry: {
    client: [
      path.join(srcPath, 'client', 'index.tsx'),
      ...(isDevelopment ? ['webpack-hot-middleware/client'] : [])
    ],
    vendor: vendors
  },
  mode: isDevelopment ? 'development' : 'production',
  output: {
    filename: '[name].bundle.js',
    path: path.join(rootDir, 'dist', 'assets'),
    publicPath: '/assets'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'all',
          enforce: true,
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/
        }
      }
    }
  },
  plugins: [
    ...(isDevelopment ? [new webpack.HotModuleReplacementPlugin()] : []),
    ...plugins,
    new ForkTsChecker({
      checkSyntacticErrors: true,
      workers: 1
    })
  ]
});
