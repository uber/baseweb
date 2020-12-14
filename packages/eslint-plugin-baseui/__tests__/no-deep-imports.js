/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

'use strict';

const {RuleTester} = require('eslint');
const rule = require('../src/no-deep-imports.js');

RuleTester.setDefaultConfig({
  parser: require.resolve('babel-eslint'),
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
});

const tests = {
  valid: [
    {
      code: `import {useStyletron} from "baseui"`,
    },
    {
      code: `import {Button} from "baseui/button"`,
    },
    {
      code: `import {PhoneInput} from "baseui/phone-input"`,
    },
  ],
  invalid: [
    {
      code: `import {StyledButton} from "baseui/button/styled-components.js"`,
      errors: 1,
    },
    {
      code: `import {COUNTRIES} from "baseui/phone-input/constants.js"`,
      errors: 1,
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
ruleTester.run('no-deep-imports', rule, tests);
