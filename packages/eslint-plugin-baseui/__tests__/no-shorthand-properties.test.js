/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

'use strict';

const { RuleTester } = require('eslint');
const rule = require('../src/no-shorthand-properties.js');

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
      code: `
      import {Button} from "baseui/button"
      return (<Button overrides={{Root: {style: {borderTopColor: 'white'}}}} />);`,
    },
    {
      code: `
      import {Button} from "baseui/button"
      return (<Button overrides={{Root: {style: () => ({borderTopColor: 'white'})}}} />);`,
    },
    {
      code: `
      import {Button} from "baseui/button"
      return (<Button overrides={{Root: {style: function() {return {borderTopColor: 'white'}; }}}} />);`,
    },
    {
      code: `
      import {Button} from "baseui/button"
      return (<Button overrides={{Root: {style: function() {
        const hello = 'white';
        return {borderTopColor: hello}; 
      }
      }}} />);`,
    },
  ],
  invalid: [
    {
      code: `
      import {Button} from "baseui/button"
      return (<Button overrides={{Root: {style: {borderColor: 'white'}}}} />);`,
      errors: 1,
    },
    {
      code: `
      import {Button} from "baseui/button"
      return (<Button overrides={{Root: {style: () => ({borderColor: 'white'})}}} />);`,
      errors: 1,
    },
    {
      code: `
      import {Button} from "baseui/button"
      return (<Button overrides={{Root: {style: function() {return {borderColor: 'white'}; }}}} />);`,
      errors: 1,
    },

    {
      code: `
      import {Button} from "baseui/button"
      return (<Button overrides={{Root: {style: function() {
        const hello = 'white';
        return {borderColor: hello}; 
      }
      }}} />);`,
      errors: 1,
    },
  ],
};

// For easier local testing
if (!process.env.CI) {
  let only = [];
  let skipped = [];
  [...tests.valid, ...tests.invalid].forEach((t) => {
    if (t.skip) {
      delete t.skip;
      skipped.push(t);
    }
    if (t.only) {
      delete t.only;
      only.push(t);
    }
  });
  const predicate = (t) => {
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
ruleTester.run('no-shorthand-properties', rule, tests);
