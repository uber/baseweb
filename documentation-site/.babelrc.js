const env = require('./env-config.js');

module.exports = {
  presets: ['next/babel', '@babel/preset-flow'],
  plugins: [['transform-define', env]],
};
