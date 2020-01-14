/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

'use strict';

const RuleTester = require('eslint').RuleTester;
const rule = require('../src/theme.js');
const MESSAGES = require('../src/messages.js');

RuleTester.setDefaultConfig({
  parser: require.resolve('babel-eslint'),
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
});

const tests = {
  valid: [],
  invalid: [
    {
      code: `
        // styled - no destructuring
        styled('div', props => {
          return {
            color: props.$theme.colors.foreground,
          };
        });
      `,
      output: `
        // styled - no destructuring
        styled('div', props => {
          return {
            color: props.$theme.colors.contentPrimary,
          };
        });
      `,
      errors: [
        {
          messageId: MESSAGES.replaceThemeProperty.id,
          data: {
            old: 'foreground',
            new: 'contentPrimary',
          },
        },
      ],
    },
    {
      code: `
        // withStyle - no destructuring
        withStyle(<Foo />, props => {
          return {
            color: props.$theme.colors.foreground,
          };
        });
      `,
      output: `
        // withStyle - no destructuring
        withStyle(<Foo />, props => {
          return {
            color: props.$theme.colors.contentPrimary,
          };
        });
      `,
      errors: [
        {
          messageId: MESSAGES.replaceThemeProperty.id,
          data: {
            old: 'foreground',
            new: 'contentPrimary',
          },
        },
      ],
    },
  ],
};

// For easier local testing
if (!process.env.CI) {
  let only = [];
  let skipped = [];
  [...tests.valid, ...tests.invalid].forEach(t => {
    if (t.skip) {
      delete t.skip;
      skipped.push(t);
    }
    if (t.only) {
      delete t.only;
      only.push(t);
    }
  });
  const predicate = t => {
    if (only.length > 0) {
      return only.indexOf(t) !== -1;
    }
    if (skipped.length > 0) {
      return skipped.indexOf(t) === -1;
    }
    return true;
  };
  tests.valid = tests.valid.filter(predicate);
  tests.invalid = tests.invalid.filter(predicate);
}

const ruleTester = new RuleTester();
ruleTester.run('deprecated-theme-api', rule, tests);
