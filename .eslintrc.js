module.exports = {
  parser: 'babel-eslint',
  plugins: ['flowtype'],
  extends: ['airbnb', 'plugin:flowtype/recommended'],
  rules: {
    'react/jsx-filename-extension': 0,
    'import/no-extraneous-dependencies': 0
  }
};
