// @flow
/* eslint-disable flowtype/no-weak-types */

import {
  getOppositePosition,
  capitalize,
  toPopperPlacement,
  fromPopperPlacement,
  splitPlacement,
  preparePopoverPositionStyles,
  prepareArrowPositionStyles,
  getPopoverMarginStyles,
  getTransformOrigin,
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

  test('preparePopoverPositionStyles', () => {
    expect(
      preparePopoverPositionStyles({
        'will-change': 'transform',
        top: 10,
        left: 15,
      }),
    ).toEqual({
      'will-change': 'transform',
      top: '10px',
      left: '15px',
    });

    expect(
      preparePopoverPositionStyles({
        'will-change': 'transform',
      }),
    ).toEqual({
      'will-change': 'transform',
      top: '0px',
      left: '0px',
    });

    expect(preparePopoverPositionStyles()).toEqual({left: '0px', top: '0px'});
  });

  test('prepareArrowPositionStyles', () => {
    expect(
      prepareArrowPositionStyles({left: 10, top: 0}, 'bottomLeft'),
    ).toEqual({
      top: '-5px',
      left: '10px',
    });
    expect(prepareArrowPositionStyles({left: 50, top: 0}, 'bottom')).toEqual({
      top: '-5px',
      left: '50px',
    });
    expect(
      prepareArrowPositionStyles({left: 100, top: 0}, 'bottomRight'),
    ).toEqual({
      top: '-5px',
      left: '100px',
    });

    expect(prepareArrowPositionStyles({left: 0, top: 10}, 'leftTop')).toEqual({
      top: '10px',
      right: '-5px',
    });
    expect(prepareArrowPositionStyles({left: 0, top: 10}, 'rightTop')).toEqual({
      top: '10px',
      left: '-5px',
    });
    expect(prepareArrowPositionStyles({}, 'rightTop')).toEqual({
      top: '0px',
      left: '-5px',
    });
    expect(prepareArrowPositionStyles({}, 'topLeft')).toEqual({
      bottom: '-5px',
      left: '0px',
    });

    expect(prepareArrowPositionStyles(undefined, 'auto')).toEqual({
      top: '0px',
      left: '0px',
    });
  });

  test('getPopoverMarginStyles', () => {
    let showArrow = false;
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

  test('getTransformOrigin', () => {
    expect(getTransformOrigin('leftTop')).toBe('right top');
    expect(getTransformOrigin('left')).toBe('right center');
    expect(getTransformOrigin('rightTop')).toBe('left top');
    expect(getTransformOrigin('topLeft')).toBe('left bottom');
    expect(getTransformOrigin('top')).toBe('center bottom');
    expect(getTransformOrigin('bottomLeft')).toBe('left top');

    // With arrow styles
    expect(getTransformOrigin('leftTop', {left: '0px', top: '10px'})).toBe(
      'right 10px',
    );
    expect(getTransformOrigin('leftBottom', {left: '0px', top: '10px'})).toBe(
      'right 10px',
    );
    expect(getTransformOrigin('topLeft', {left: '10px', top: '0px'})).toBe(
      '10px bottom',
    );
    expect(getTransformOrigin('topRight', {left: '10px', top: '0px'})).toBe(
      '10px bottom',
    );
  });
});
