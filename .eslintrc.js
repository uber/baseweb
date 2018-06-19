module.exports = {
  parser: 'babel-eslint',
  plugins: ['flowtype'],
  env: {
    jest: true,
  },
  extends: [
    'airbnb',
    'eslint-config-uber-universal-stage-3',
    'plugin:flowtype/recommended',
  ],
  rules: {
    'react/jsx-filename-extension': 0,
    'import/no-extraneous-dependencies': 0,
    'prettier/prettier': ['error', {
      singleQuote: true,
      trailingComma: 'all',
      bracketSpacing: false
    }]
  },
};
