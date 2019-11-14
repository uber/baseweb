let defaultPresets;

if (process.env.BABEL_ENV === 'cjs') {
  defaultPresets = [
    [
      '@babel/preset-env',
      {
        modules: false,
        targets: {
          ie: '11',
        },
      },
    ],
  ];
} else {
  defaultPresets = [];
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
