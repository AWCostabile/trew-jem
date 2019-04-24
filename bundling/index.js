const path = require("path");
const createConfig = require("./creator");

const rootDir = path.resolve(__dirname, "..");
const srcPath = path.resolve(rootDir, "src");

const isDevelopment = !!(process.env.DEVELOPMENT || "").match(/true/);
const isServer = !!(process.env.SERVER || "").match(/true/);

module.exports = createConfig({
  isDevelopment,
  isServer,
  rootDir,
  srcPath
});
