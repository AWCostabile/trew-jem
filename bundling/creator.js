const path = require('path');
const webpack = require('webpack');

const client = require('./bundle-client');
const server = require('./bundle-server');
const getEnv = require('./env');
const toRules = require('./rules');
const { multiColor } = require('./utils');

module.exports = ({
  isDevelopment = false,
  isServer = false,
  rootDir,
  srcPath
}) => {
  const env = getEnv(rootDir, isDevelopment);
  const config = isServer ? server : client;
  const _isDevelopment = isDevelopment || !!env.LOCAL_BUILD.match(/true/);
  const isLocal = !!env.LOCAL_BUILD.match(/true/);

  const { rules } = toRules({
    environment: env.ENVIRONMENT,
    isDevelopment: _isDevelopment,
    isServer,
    rootDir,
    srcPath
  });

  console.log(
    multiColor([
      ['\nCreating ', 'cyan'],
      isLocal ? ['local ', 'green'] : ['remote ', 'red'],
      [_isDevelopment ? 'preview' : 'release', 'yellow'],
      [' build of ', 'cyan'],
      [env.ENVIRONMENT, 'green'],
      [isServer ? ' server' : ' client', 'yellow'],
      [' bundle\n', 'cyan']
    ])
  );

  const performance = isLocal ? { hints: 'warning' } : { hints: false };

  return {
    ...config({
      isDevelopment: _isDevelopment,
      srcPath,
      rootDir,
      plugins: [
        new webpack.DefinePlugin({
          APP_LOGO: `'static/logo-${env.ENVIRONMENT}.png'`,
          BASE_URL: `"${env.BASE_URL}"`,
          DEVELOPMENT: _isDevelopment,
          LOCAL_BUILD: isLocal,
          SERVER: isServer
        })
      ]
    }),
    module: { rules },
    performance,
    resolve: {
      modules: [path.join(rootDir, 'node_modules'), srcPath],
      extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
      enforceExtension: false
    }
  };
};
