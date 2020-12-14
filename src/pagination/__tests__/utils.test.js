/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {clamp} from '../utils.js';

describe('Pagination Utils', () => {
  test('clamp', () => {
    expect(clamp(1, 0, 2)).toEqual(1);
    expect(clamp(1, 2, 2)).toEqual(2);
    expect(clamp(1, 3, 2)).toEqual(2);
    expect(clamp(1, 3, 5)).toEqual(3);
  });
});
