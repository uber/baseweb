/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* global __dirname */

// @flow

jest.autoMockOff();
const defineTest = require('jscodeshift/dist/testUtils').defineTest;

describe('styled-flowfixme', () => {
  defineTest(
    __dirname,
    'styled-v8-themedStyled',
    null,
    'styled-v8-themedStyled-component',
  );

  defineTest(
    __dirname,
    'styled-v8-themedStyled',
    null,
    'styled-v8-themedStyled-element',
  );

  defineTest(
    __dirname,
    'styled-v8-themedStyled',
    null,
    'styled-v8-themedStyled-mixed',
  );

  defineTest(
    __dirname,
    'styled-v8-themedStyled',
    null,
    'styled-v8-themedStyled-multi-diff',
  );

  defineTest(
    __dirname,
    'styled-v8-themedStyled',
    null,
    'styled-v8-themedStyled-multi-dup',
  );

  defineTest(
    __dirname,
    'styled-v8-themedStyled',
    null,
    'styled-v8-themedStyled-object',
  );
});
