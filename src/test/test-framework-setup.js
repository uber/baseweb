/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import 'jest-enzyme';
import toHaveStyleRule from './expect-to-have-style-rule.js';

expect.extend({toHaveStyleRule});

jest.mock('../styles/styled.js');
jest.mock('../utils/get-bui-id.js');
