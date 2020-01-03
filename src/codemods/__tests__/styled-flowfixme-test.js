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
    'styled-flowfixme',
    null,
    'styled-flowfixme-baseui-import',
  );

  defineTest(
    __dirname,
    'styled-flowfixme',
    null,
    'styled-flowfixme-existing-generics',
  );

  defineTest(__dirname, 'styled-flowfixme', null, 'styled-flowfixme-flow');
  defineTest(__dirname, 'styled-flowfixme', null, 'styled-flowfixme-no-flow');
  defineTest(__dirname, 'styled-flowfixme', null, 'styled-flowfixme-renamed');

  defineTest(
    __dirname,
    'styled-flowfixme',
    null,
    'styled-flowfixme-styletron-import',
  );
});
