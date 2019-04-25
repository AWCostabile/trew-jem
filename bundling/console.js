const { multiColor } = require('./utils');

const onBuild = (envionment, isDevelopment, isLocal, isServer) =>
  console.log(
    multiColor([
      ['\nCreating ', 'cyan'],
      isLocal ? ['local ', 'green'] : ['remote ', 'red'],
      [isDevelopment ? 'preview' : 'release', 'yellow'],
      [' build of ', 'cyan'],
      [envionment, 'green'],
      [isServer ? ' server' : ' client', 'yellow'],
      [' bundle\n', 'cyan']
    ])
  );

const onListen = port =>
  console.log(
    multiColor([
      ['\nWeb service is listening on port ', 'red'],
      [`${port}\n`, 'yellow']
    ])
  );

const onNoFile = file =>
  multiColor([['Failed to find file: ', 'red'], [file, 'yellow']]);

const onResponse = (status, path) =>
  console.log(
    multiColor([
      ['[server: ', 'cyan'],
      [status, status < 400 ? (status < 300 ? 'green' : 'yellow') : 'red'],
      [']', 'cyan'],
      [': ', 'white'],
      [path, 'blue']
    ])
  );

module.exports = {
  onBuild,
  onListen,
  onNoFile,
  onResponse
};
