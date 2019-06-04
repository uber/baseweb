/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

//import * as React from 'react';
import {addGaps} from '../payment-card.js';

test('add gaps to a string', () => {
  expect(addGaps([4, 8, 12], '4111111111111111')).toBe('4111 1111 1111 1111');
  expect(addGaps([4, 10], '378282246310005')).toBe('3782 822463 10005');
  expect(addGaps([], '123456')).toBe('123456');
});
