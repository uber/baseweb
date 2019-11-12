let defaultPresets;

if (process.env.BABEL_ENV === 'es') {
  defaultPresets = [];
} else {
  defaultPresets = [
    [
      '@babel/preset-env',
      {
        modules: process.env.BABEL_ENV === 'esm' ? false : 'commonjs',
        targets: {
          ie: '11',
        },
      },
    ],
  ];
}

module.exports = {
  presets: [
    ...defaultPresets,
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
