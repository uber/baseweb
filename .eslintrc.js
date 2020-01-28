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
  globals: {
    page: true,
    browser: true,
    context: true,
    jestPuppeteer: true,
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
    'flowtype/space-after-type-colon': 'off',
    'react/jsx-filename-extension': 0,
    'react/prop-types': 0,
    // Enforces imports of external modules to be declared in the package.json
    'import/no-extraneous-dependencies': [
      'error',
      {optionalDependencies: false, devDependencies: true},
    ],
    'import/extensions': ['error', 'always', {ignorePackages: true}],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'all',
        bracketSpacing: false,
      },
    ],
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
    {
      files: ['documentation-site/**/*.js'],
      rules: {
        'import/extensions': 'off',
        'react/display-name': 'off',
      },
    },
    {
      files: [
        'packages/eslint-plugin-baseui/**/*.js',
        'packages/baseweb-vscode-extension/**/*.js',
      ],
      rules: {
        'flowtype/require-valid-file-annotation': 'off',
      },
    },
  ],
};
