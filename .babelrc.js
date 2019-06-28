const {BABEL_ENV} = process.env;
const modules = !(BABEL_ENV === 'es' || BABEL_ENV === 'modules') && 'commonjs';

module.exports = {
  presets: [
    ['@babel/preset-env', {modules}],
    '@babel/react',
    ['@babel/preset-flow', {all: true}],
  ],
  plugins: [
    './babel/cup.js',
    ['babel-plugin-transform-styletron-display-name', {importSources: 'any'}],
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-class-properties',
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: false,
        helpers: false,
        regenerator: true,
        useESModules: false,
      },
    ],
  ],
  env: {
    test: {
      plugins: [['./babel/cup.js']],
    },
  },
  ignore: ['./babel/cup.js'],
};
