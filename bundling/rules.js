const path = require('path');

module.exports = ({
  environment,
  isDevelopment = false,
  isServer = false,
  rootDir
}) => ({
  rules: [
    {
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'ts-loader',
          options: {
            transpileOnly: true
          }
        }
      ]
    },
    {
      test: /\.(ico|svg|png|jpg|jpeg|gif|woff)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            emitFile: !isServer,
            name: '[hash].content.[ext]',
            publicPath: '/assets/'
          }
        }
      ]
    },
    {
      enforce: 'pre',
      loader: 'source-map-loader',
      test: /\.js$/
    }
  ]
});
