/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

//import * as React from 'react';
import {addGaps, sanitizeNumber, getCaretPosition} from '../utils.js';

test('add gaps to a string', () => {
  expect(addGaps([4, 8, 12], '4111111111111111')).toBe('4111 1111 1111 1111');
  expect(addGaps([4, 10], '378282246310005')).toBe('3782 822463 10005');
  expect(addGaps([], '123456')).toBe('123456');
});

test('sanitize number', () => {
  expect(sanitizeNumber('4111')).toBe('4111');
  expect(sanitizeNumber(' 4111/ ')).toBe('4111');
  expect(sanitizeNumber('kkk4-1-1-1abc')).toBe('4111');

  expect(sanitizeNumber('5555555555554444 1234')).toBe('5555555555554444');
  expect(sanitizeNumber('abc4111 1111 1111 1111 333 444')).toBe(
    '4111111111111111333',
  );
});

test('getCaretPosition', () => {
  // adding
  expect(getCaretPosition('4111 22', '41112', 7)).toEqual([7, '411122']);
  expect(getCaretPosition('41112', '4111', 5)).toEqual([6, '41112']);
  expect(getCaretPosition('41113 2222', '41112222', 5)).toEqual([
    6,
    '411132222',
  ]);

  // deleting
  expect(getCaretPosition('4111 22', '4111222', 7)).toEqual([7, '411122']);
  expect(getCaretPosition('41112345', '41112345', 4)).toEqual([3, '4112345']);
  expect(getCaretPosition('411 2345', '4112345', 3)).toEqual([3, '4112345']);
});
