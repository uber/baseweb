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
  parsePopperOffset,
  splitPlacement,
  toPopperPlacement,
} from '../utils';

describe('Popover utils', () => {
  test('getOppositePosition', () => {
    expect(getOppositePosition('top')).toBe('bottom');
    expect(getOppositePosition('bottom')).toBe('top');
    expect(getOppositePosition('left')).toBe('right');
    expect(getOppositePosition('right')).toBe('left');
  });

  test('capitalize', () => {
    expect(capitalize('top')).toBe('Top');
    expect(capitalize('left')).toBe('Left');
    expect(capitalize('')).toBe('');
    expect(capitalize('topLeft')).toBe('TopLeft');
  });

  test('toPopperPlacement', () => {
    expect(toPopperPlacement('rightTop')).toBe('right-start');
    expect(toPopperPlacement('right')).toBe('right');
    expect(toPopperPlacement('rightBottom')).toBe('right-end');
    expect(toPopperPlacement('topLeft')).toBe('top-start');
    expect(toPopperPlacement('top')).toBe('top');
    expect(toPopperPlacement('topRight')).toBe('top-end');
  });

  test('fromPopperPlacement', () => {
    expect(fromPopperPlacement('right-start')).toBe('rightTop');
    expect(fromPopperPlacement('right')).toBe('right');
    expect(fromPopperPlacement('right-end')).toBe('rightBottom');
    expect(fromPopperPlacement('top-start')).toBe('topLeft');
    expect(fromPopperPlacement('top')).toBe('top');
    expect(fromPopperPlacement('top-end')).toBe('topRight');
    expect(fromPopperPlacement('')).toBe(null);
  });

  test('parsePopperOffset', () => {
    expect(
      parsePopperOffset({
        top: 10,
        left: 15,
      }),
    ).toEqual({top: 10, left: 15});
    expect(
      parsePopperOffset({
        top: 10.1,
        left: 15.24,
      }),
    ).toEqual({top: 10, left: 15});
    expect(
      parsePopperOffset({
        top: null,
        left: null,
      }),
    ).toEqual({top: 0, left: 0});
  });

  test('splitPlacement', () => {
    expect(splitPlacement('rightTop')).toEqual(['right', 'top']);
    expect(splitPlacement('right')).toEqual(['right']);
    expect(splitPlacement('rightBottom')).toEqual(['right', 'bottom']);
    expect(splitPlacement('topRight')).toEqual(['top', 'right']);
    expect(splitPlacement('top')).toEqual(['top']);
    expect(splitPlacement('topLeft')).toEqual(['top', 'left']);
    expect(splitPlacement('auto')).toEqual(['auto']);
    expect(splitPlacement(('': any))).toEqual([]);
  });

  test('isVerticalPosition', () => {
    expect(isVerticalPosition('top')).toEqual(true);
    expect(isVerticalPosition('bottom')).toEqual(true);
    expect(isVerticalPosition('left')).toEqual(false);
    expect(isVerticalPosition('right')).toEqual(false);
    expect(isVerticalPosition('')).toEqual(false);
    const nullArg: any = null;
    expect(isVerticalPosition(nullArg)).toEqual(false);
  });

  test('getPopoverMarginStyles', () => {
    let showArrow = false;
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

    showArrow = true;
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

  test('getArrowPositionStyles', () => {
    expect(getArrowPositionStyles({top: 0, left: 15}, 'auto')).toBe(null);
    expect(getArrowPositionStyles({top: 0, left: 15}, 'topLeft')).toEqual({
      bottom: '-4px',
      left: '15px',
    });
    expect(getArrowPositionStyles({top: 15, left: 0}, 'leftTop')).toEqual({
      right: '-4px',
      top: '15px',
    });
  });

  test('getStartPosition', () => {
    expect(getStartPosition({left: 10, top: 15}, 'topLeft', true)).toEqual(
      'translate3d(10px, 27px, 0)',
    );
  });

  test('getEndPosition', () => {
    expect(getEndPosition({left: 10, top: 15})).toEqual(
      'translate3d(10px, 15px, 0)',
    );
  });
});
