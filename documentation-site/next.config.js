const {resolve} = require('path');

module.exports = {
  webpack: (config, {buildId, dev, isServer, defaultLoaders}) => {
    config.resolve.alias.baseui = resolve(__dirname, '../dist');
    return config;
  },
};
