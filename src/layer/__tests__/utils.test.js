/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {toPopperPlacement, parsePopperOffset} from '../utils.js';

describe('toPopperPlacement', () => {
  test('toPopperPlacement should convert from popover placements to popper placements', () => {
    expect(toPopperPlacement('rightTop')).toBe('right-start');
    expect(toPopperPlacement('right')).toBe('right');
    expect(toPopperPlacement('rightBottom')).toBe('right-end');
    expect(toPopperPlacement('topLeft')).toBe('top-start');
    expect(toPopperPlacement('top')).toBe('top');
    expect(toPopperPlacement('topRight')).toBe('top-end');
  });
});

describe('parsePopperOffset', () => {
  test('parsePopperOffset should handle valid integer inputs', () => {
    expect(
      parsePopperOffset({
        top: 10,
        left: 15,
      }),
    ).toEqual({top: 10, left: 15});
  });
  test('parsePopperOffset should round float inputs', () => {
    expect(
      parsePopperOffset({
        top: 10.1,
        left: 15.24,
      }),
    ).toEqual({top: 10, left: 15});
  });
  test('parsePopperOffset should be resilient to null input', () => {
    expect(
      parsePopperOffset({
        top: null,
        left: null,
      }),
    ).toEqual({top: 0, left: 0});
  });
});
