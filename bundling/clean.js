const { exec } = require('child_process');
const { platform } = require('os');

const deleteFunction = mode => {
  switch (platform()) {
    case 'darwin':
    case 'linux':
      return mode == 'all'
        ? 'rm -rf node_modules'
        : 'find . -name "*.content.*" -o -name "*.bundle.js" -o -name "*.bundle.js.map" -type f -delete';
    case 'win32':
      return mode == 'all'
        ? 'del *.content.* *.bundle.js *.bundle.js.map node_modules/* /s /q'
        : 'del *.content.* *.bundle.js *.bundle.js.map /s /q';
    default:
      throw new Error('Could not determine OS for bundle clean-up');
  }
};

exec(deleteFunction('dist'));

module.exports = deleteFunction;
