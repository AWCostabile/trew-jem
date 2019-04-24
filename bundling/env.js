const dotEnv = require('dotenv');
const path = require('path');

module.exports = (rootDir, isDevelopment) => {
  if (!isDevelopment) {
    const env = dotEnv.config({
      path: path.join(rootDir, '.env')
    });

    if (!env.error) {
      return env.parsed;
    }
  }

  const localEnv = dotEnv.config({
    path: path.join(rootDir, '.env.local')
  });

  if (!localEnv.error) {
    return localEnv.parsed;
  }

  const devEnv = dotEnv.config({
    path: path.join(rootDir, '.env.dev')
  });

  if (devEnv.error) {
    throw devEnv.error;
  }

  return devEnv.parsed;
};
