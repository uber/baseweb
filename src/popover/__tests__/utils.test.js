/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* eslint-disable flowtype/no-weak-types */

import {
  capitalize,
  fromPopperPlacement,
  getOppositePosition,
  getPopoverMarginStyles,
  getArrowPositionStyles,
  getEndPosition,
  getStartPosition,
  isVerticalPosition,
  splitPlacement,
} from '../utils.js';

describe('Popover utils', () => {
  describe('getOppositePosition', () => {
    test('getOppositePosition should return opposite positions', () => {
      expect(getOppositePosition('top')).toBe('bottom');
      expect(getOppositePosition('bottom')).toBe('top');
      expect(getOppositePosition('left')).toBe('right');
      expect(getOppositePosition('right')).toBe('left');
    });
  });

  describe('capitalize', () => {
    test('capitalize should capitalize input strings', () => {
      expect(capitalize('top')).toBe('Top');
      expect(capitalize('left')).toBe('Left');
      expect(capitalize('')).toBe('');
      expect(capitalize('topLeft')).toBe('TopLeft');
    });
  });

  describe('fromPopperPlacement', () => {
    test('fromPopperPlacement to convert from popper placements to popover placements', () => {
      expect(fromPopperPlacement('right-start')).toBe('rightTop');
      expect(fromPopperPlacement('right')).toBe('right');
      expect(fromPopperPlacement('right-end')).toBe('rightBottom');
      expect(fromPopperPlacement('top-start')).toBe('topLeft');
      expect(fromPopperPlacement('top')).toBe('top');
      expect(fromPopperPlacement('top-end')).toBe('topRight');
      expect(fromPopperPlacement('')).toBe(null);
    });
  });

  describe('splitPlacement', () => {
    test('splitPlacement should split placements apart', () => {
      expect(splitPlacement('rightTop')).toEqual(['right', 'top']);
      expect(splitPlacement('right')).toEqual(['right']);
      expect(splitPlacement('rightBottom')).toEqual(['right', 'bottom']);
      expect(splitPlacement('topRight')).toEqual(['top', 'right']);
      expect(splitPlacement('top')).toEqual(['top']);
      expect(splitPlacement('topLeft')).toEqual(['top', 'left']);
      expect(splitPlacement('auto')).toEqual(['auto']);
      expect(splitPlacement(('': any))).toEqual([]);
    });
    test('splitPlacement should handle empty input', () => {
      expect(splitPlacement(('': any))).toEqual([]);
    });
  });

  describe('isVerticalPosition', () => {
    test('isVerticalPosition should return true if input string is vertical position', () => {
      expect(isVerticalPosition('top')).toEqual(true);
      expect(isVerticalPosition('bottom')).toEqual(true);
      expect(isVerticalPosition('left')).toEqual(false);
      expect(isVerticalPosition('right')).toEqual(false);
    });
    test('isVerticalPosition should handle empty or null input', () => {
      expect(isVerticalPosition('')).toEqual(false);
      const nullArg: any = null;
      expect(isVerticalPosition(nullArg)).toEqual(false);
    });
  });

  describe('getPopoverMarginStyles', () => {
    test('getPopoverMarginStyles should return correct margins without arrow', () => {
      const showArrow = false;
      expect(getPopoverMarginStyles(showArrow, 'topLeft')).toEqual({
        marginBottom: '8px',
      });
      expect(getPopoverMarginStyles(showArrow, 'top')).toEqual({
        marginBottom: '8px',
      });
      expect(getPopoverMarginStyles(showArrow, 'right')).toEqual({
        marginLeft: '8px',
      });
      expect(getPopoverMarginStyles(showArrow, 'bottomLeft')).toEqual({
        marginTop: '8px',
      });
    });
    test('getPopoverMarginStyles should return correct margins with arrow', () => {
      const showArrow = true;
      expect(getPopoverMarginStyles(showArrow, 'topLeft')).toEqual({
        marginBottom: '6px',
      });
      expect(getPopoverMarginStyles(showArrow, 'top')).toEqual({
        marginBottom: '6px',
      });
      expect(getPopoverMarginStyles(showArrow, 'right')).toEqual({
        marginLeft: '6px',
      });
      expect(getPopoverMarginStyles(showArrow, 'bottomLeft')).toEqual({
        marginTop: '6px',
      });
    });
  });

  describe('getArrowPositionStyles', () => {
    test('getArrowPositionStyles should return no styles when placement is unknown yet', () => {
      expect(getArrowPositionStyles({top: 0, left: 15}, 'auto')).toBe(null);
    });
    test('getArrowPositionStyles should return correct styles for topLeft', () => {
      expect(getArrowPositionStyles({top: 0, left: 15}, 'topLeft')).toEqual({
        bottom: '-4px',
        left: '15px',
      });
    });
    test('getArrowPositionStyles should return correct styles for leftTop', () => {
      expect(getArrowPositionStyles({top: 15, left: 0}, 'leftTop')).toEqual({
        right: '-4px',
        top: '15px',
      });
    });
  });

  describe('getStartPosition', () => {
    test('getStartPosition should return correct position for topLeft', () => {
      expect(getStartPosition({left: 10, top: 15}, 'topLeft', true)).toEqual(
        'translate3d(10px, 27px, 0)',
      );
    });
  });

  describe('getEndPosition', () => {
    test('getEndPosition should return correct end position', () => {
      expect(getEndPosition({left: 10, top: 15})).toEqual(
        'translate3d(10px, 15px, 0)',
      );
    });
  });
});
