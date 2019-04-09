/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {toPopperPlacement} from '../utils.js';

describe('Popover utils', () => {
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
});
