// Loads all of the .js files in this directory and stores them in the Config object

const Config = {};

const requireConfig = require.context("./", false, /^(?!.*index.js).*\.js/);

requireConfig.keys().forEach(fileName => {
  const config = requireConfig(fileName);
  const name = fileName
    .split("/")
    .pop()
    .replace(/\.\w+$/, "");
  Config[name] = config.default;
});

export default Config;
