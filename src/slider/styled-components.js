/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {styled} from '../styles/index';
import {StyledBarProgress} from '../progress-bar';

export const Root = styled('div', props => {
  return {
    paddingTop: '1px',
    position: 'relative',
  };
});

export const Axis = styled('div', props => {
  const {$theme} = props;
  const {colors} = $theme;
  return {
    position: 'relative',
    margin: '34px 10px 10px',
    borderRadius: $theme.borders.useRoundedCorners ? '2px' : '0px',
    background: colors.mono400,
    height: '4px',
  };
});

export const AxisRange = styled(StyledBarProgress, props => {
  const {$max, $min, $index, $isRange, $value, $theme} = props;
  const {colors} = $theme;
  const fillColor = colors.primary400;
  const emptyColor = colors.mono400;
  let $color;
  if ($isRange) {
    $color = $index % 2 === 0 ? emptyColor : fillColor;
  } else {
    $color = $index % 2 === 0 ? fillColor : emptyColor;
  }
  const value =
    $isRange && $index ? $value[$index] - $value[$index - 1] : $value[$index];
  const $successValue = $max - $min;
  const width = `${(value / $successValue) * 100}%`;
  const offset =
    $isRange && $index
      ? `${($value[$index - 1] / $successValue) * 100}%`
      : null;
  return {
    position: 'absolute',
    top: '0',
    marginLeft: offset,
    backgroundColor: $color,
    width: width,
    transition: 'none',
  };
});

export const Tick = styled('div', props => {
  return {};
});

export const TickBar = styled('div', props => {
  return {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '10px 10px',
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
  const {animation, colors} = $theme;
  const backGroundColor = $disabled ? colors.mono500 : 'white';
  const toggleThumbColor = getToggleThumbColor({...props, $isActive});
  let toggleSVG = '';
  const $isStart = $isRange && $index % 2 === 0;
  const $isEnd = $isRange && $index % 2 !== 0;
  if ($isStart) {
    toggleSVG = `<svg width="20" height="32" viewBox="0 0 20 32" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(#filter0_d)"><path d="M4 7C4 4.79086 5.79086 3 8 3H15C15.5523 3 16 3.44772 16 4V26C16 26.5523 15.5523 27 15 27H8C5.79086 27 4 25.2091 4 23V7Z" fill="${backGroundColor}"/></g><rect x="9" y="11" width="2" height="8" rx="1" fill="${toggleThumbColor}"/><defs><filter id="filter0_d" x="0" y="0" width="20" height="32" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="1"/><feGaussianBlur stdDeviation="2"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>`;
  } else if ($isEnd) {
    toggleSVG = `<svg width="20" height="32" viewBox="0 0 20 32" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(#filter0_d)"><path d="M4 4C4 3.44772 4.44772 3 5 3H12C14.2091 3 16 4.79086 16 7V23C16 25.2091 14.2091 27 12 27H5C4.44772 27 4 26.5523 4 26V4Z" fill="${backGroundColor}"/></g><rect x="9" y="11" width="2" height="8" rx="1" fill="${toggleThumbColor}"/><defs><filter id="filter0_d" x="0" y="0" width="20" height="32" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="1"/><feGaussianBlur stdDeviation="2"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>`;
  } else {
    toggleSVG = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(#filter0_d)"><rect x="4" y="3" width="24" height="24" rx="4" fill="${backGroundColor}"/><rect width="2" height="8"  x="15" y="11" rx="1" fill="${toggleThumbColor}"/></g><defs><filter id="filter0_d" x="0" y="0" width="32" height="32" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="1"/><feGaussianBlur stdDeviation="2"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.32 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>`;
  }
  return {
    transitionDuration: animation.timing100,
    transitionTimingFunction: animation.easeOutCurve,
    transitionProperty: 'background-color',
    ':after': {
      position: 'absolute',
      content: `url('data:image/svg+xml;utf8,` + toggleSVG + `')`,
    },
    position: 'relative',
    top: '-14px',
    cursor: 'pointer',
    zIndex: '1',
    left: offset + '%',
    marginLeft: $isRange ? '-8px' : $index % 2 ? '-32px' : '-16px',
    ':before': {
      position: 'absolute',
      content: `"${Math.round($value[$index])}"`,
      top: '-14px',
      marginLeft: '4px',
      width: '16px',
      height: '16px',
    },
  };
});

function getToggleThumbColor(props) {
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
