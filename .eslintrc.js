module.exports = {
  parser: 'babel-eslint',
  plugins: ['flowtype'],
  extends: [
    'airbnb',
    'eslint-config-uber-universal-stage-3',
    'plugin:flowtype/recommended',
  ],
  rules: {
    'react/jsx-filename-extension': 0,
    'import/no-extraneous-dependencies': 0,
  },
};
