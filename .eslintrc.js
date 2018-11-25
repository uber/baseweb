module.exports = {
  parser: 'babel-eslint',
  plugins: [
    'flowtype',
    'eslint-plugin-react',
    'eslint-plugin-import',
    'header',
    'jsx-a11y',
  ],
  env: {
    jest: true,
  },
  extends: [
    'plugin:flowtype/recommended',
    'plugin:react/recommended',
    require.resolve('eslint-config-uber-universal-stage-3'),
    'plugin:jsx-a11y/recommended',
  ],
  rules: {
    // Enforce flow file declarations
    'flowtype/require-valid-file-annotation': ['error', 'always'],
    'flowtype/no-weak-types': ['error'],
    'react/jsx-filename-extension': 0,
    'react/prop-types': 0,
    // Enforces imports of external modules to be declared in the package.json
    'import/no-extraneous-dependencies': [
      'error',
      {optionalDependencies: false},
    ],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'all',
        bracketSpacing: false,
      },
    ],
    'import/no-extraneous-dependencies': ['error', {devDependencies: true}],
    'import/prefer-default-export': ['off'],
    'header/header': [2, 'LICENSE-HEAD'],
  },
  overrides: [
    {
      files: ['*.test.js'],
      rules: {
        'flowtype/no-weak-types': 'off',
      },
    },
  ],
};
