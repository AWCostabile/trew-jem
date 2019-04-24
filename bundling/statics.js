const path = require('path');

module.exports = ({ environment, srcPath }) => {
  return filename =>
    require(path.join(
      srcPath,
      'static',
      `${String(environment).toLowerCase()}-${filename}`
    ));
};
