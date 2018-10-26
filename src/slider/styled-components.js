/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {styled} from '../styles/index';
import {startThumbIcon, endThumbIcon, singleThumbIcon} from './icons';

export const Root = styled('div', props => {
  return {
    paddingTop: '1px',
    position: 'relative',
  };
});

export const Axis = styled('div', props => {
  const {$theme} = props;
  const {colors, borders, sizing} = $theme;
  return {
    position: 'relative',
    marginTop: sizing.scale900,
    marginBottom: sizing.scale900,
    marginRight: sizing.scale400,
    marginLeft: sizing.scale400,
    borderRadius: $theme.borders.useRoundedCorners ? borders.radius100 : '0px',
    backgroundColor: colors.mono400,
    height: sizing.scale100,
  };
});

export const AxisRange = styled('div', props => {
  const {$max, $min, $index, $isRange, $value, $theme} = props;
  const {colors, borders, sizing} = $theme;
  const fillColor = colors.primary400;
  const emptyColor = colors.mono400;
  let barColor;
  if ($isRange) {
    barColor = $index % 2 === 0 ? emptyColor : fillColor;
  } else {
    barColor = $index % 2 === 0 ? fillColor : emptyColor;
  }
  const value =
    $isRange && $index ? $value[$index] - $value[$index - 1] : $value[$index];
  const totalRangeValue = $max - $min;
  const width = `${(value / totalRangeValue) * 100}%`;
  const offset =
    $isRange && $index
      ? `${($value[$index - 1] / totalRangeValue) * 100}%`
      : null;
  return {
    borderRadius: borders.useRoundedCorners ? sizing.scale0 : '0',
    height: '100%',
    position: 'absolute',
    top: '0',
    marginLeft: offset,
    backgroundColor: barColor,
    width: width,
  };
});

export const Tick = styled('div', props => {
  return {};
});

export const TickBar = styled('div', props => {
  const {$theme} = props;
  const {sizing} = $theme;
  return {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: sizing.scale400,
    marginBottom: sizing.scale400,
    marginRight: sizing.scale400,
    marginLeft: sizing.scale400,
  };
});

export const Thumb = styled('div', props => {
  const {
    $theme,
    $value,
    $max,
    $index,
    $currentThumb,
    $disabled,
    $isRange,
  } = props;
  const $isActive = $index === $currentThumb;
  const offset = Math.round(($value[$index] / $max) * 100);
  const {animation, colors, sizing} = $theme;
  const backgroundColor = $disabled ? colors.mono500 : colors.white;
  const thumbColor = getThumbColor({...props, $isActive});
  let toggleSVG = '';
  const $isStart = $isRange && $index % 2 === 0;
  const $isEnd = $isRange && $index % 2 !== 0;
  if ($isStart) {
    toggleSVG = startThumbIcon(backgroundColor, thumbColor);
  } else if ($isEnd) {
    toggleSVG = endThumbIcon(backgroundColor, thumbColor);
  } else {
    toggleSVG = singleThumbIcon(backgroundColor, thumbColor);
  }
  return {
    transitionDuration: animation.timing100,
    transitionTimingFunction: animation.easeOutCurve,
    transitionProperty: 'background-color',
    ':after': {
      position: 'absolute',
      content: `url('data:image/svg+xml;utf8,${toggleSVG}')`,
    },
    position: 'relative',
    top: '-14px',
    cursor: 'pointer',
    zIndex: '1',
    left: `${offset}%`,
    marginLeft: $isRange ? '-8px' : $index % 2 ? '-32px' : '-16px',
    ':before': {
      position: 'absolute',
      content: `"${Math.round($value[$index])}"`,
      top: '-14px',
      marginLeft: sizing.scale100,
      width: sizing.scale600,
      height: sizing.scale600,
    },
  };
});

function getThumbColor(props) {
  const {
    $disabled,
    $isFocused,
    $isError,
    $isHovered,
    $isActive,
    $theme,
  } = props;
  const {colors} = $theme;
  if ($disabled) {
    return colors.mono600;
  } else if ($isActive || $isFocused || $isHovered) {
    return colors.primary400;
  } else if ($isError) {
    if ($isActive || $isFocused) {
      return colors.negative200;
    } else if ($isHovered) {
      return colors.negative100;
    } else {
      return colors.negative50;
    }
  } else {
    return colors.mono600;
  }
}
