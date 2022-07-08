/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow
/* eslint-env node */
module.exports = {
  parser: 'babel-eslint',
  plugins: [
    'flowtype',
    'eslint-plugin-react',
    'eslint-plugin-import',
    'header',
    'jsx-a11y',
    'prettier',
    'import',
    'jest',
  ],
  env: {
    jest: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    'plugin:flowtype/recommended',
    'plugin:react/recommended',
    require.resolve('eslint-config-uber-universal-stage-3'),
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
    'prettier/flowtype',
  ],
  rules: {
    // Enforce flow file declarations
    'flowtype/require-valid-file-annotation': ['error', 'always'],
    'flowtype/space-after-type-colon': 'off',
    'react/jsx-filename-extension': 0,
    'react/prop-types': 0,
    // Enforces imports of external modules to be declared in the package.json
    'import/no-extraneous-dependencies': [
      'error',
      { optionalDependencies: false, devDependencies: true },
    ],
    'import/extensions': ['error', 'always', { ignorePackages: true }],
    'prettier/prettier': [
      'error',
      {
        printWidth: 100,
        tabWidth: 2,
        useTabs: false,
        semi: true,
        singleQuote: true,
        trailingComma: 'es5',
        bracketSpacing: true,
        bracketSameLine: false,
      },
    ],
    'import/prefer-default-export': ['off'],
    'header/header': [2, 'LICENSE-HEAD'],
    'jsx-a11y/no-autofocus': [
      2,
      {
        ignoreNonDOM: true,
      },
    ],
    'import/no-duplicates': 2,
    'import/newline-after-import': 2,
    'import/first': 2,
    'dot-notation': 2,
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
      files: ['packages/eslint-plugin-baseui/**/*.js', 'packages/baseweb-vscode-extension/**/*.js'],
      rules: {
        'flowtype/require-valid-file-annotation': 'off',
      },
    },
    {
      files: ['**/*.e2e.js'],
      rules: {
        'flowtype/require-valid-file-annotation': 'off',
      },
    },
    {
      files: ['**/*.ts', '**/*.tsx', '**/*.d.ts'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      rules: {
        'flowtype/require-valid-file-annotation': 'off',
        'flowtype/space-after-type-colon': 'off',
        'flowtype/no-types-missing-file-annotation': 'off',
        'header/header': 'off',
        'import/extensions': 'off',
        'cup/no-undef': 'off',
        'no-unused-vars': 'off',
        'no-redeclare': 'off',
      },
    },
  ],
};
