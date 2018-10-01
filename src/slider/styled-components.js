/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {styled} from '../styles/index';
import {} from './constants';
import {getToggleCheckMarkStyles} from '../checkbox/styled-components';

export const Root = styled('div', props => {
  return {
    position: 'relative',
  };
});

export const Axis = styled('div', props => {
  const {$theme} = props;
  const {} = $theme;
  let background = 'linear-gradient(to right';
  const fillColor = '#1B6DE0';
  const emptyColor = '#CCCCCC';
  const values = props.$value;
  const isRange = values.length % 2 === 0;
  for (let i = 0; i < values.length; i++) {
    background += ', ';
    if (isRange) {
      background += i % 2 === 0 ? emptyColor : fillColor;
      background += ' ' + values[i] + '%, ';
      background += i % 2 === 0 ? fillColor : emptyColor;
      background += ' 0% ';
    } else {
      background += i % 2 === 0 ? fillColor : emptyColor;
      background += ' ' + values[i] + '%, ';
      background += i % 2 === 0 ? emptyColor : fillColor;
      background += ' 0% ';
    }
  }
  background += ', ' + emptyColor + ' 0%';
  background += ')';
  return {
    margin: '34px 10px 10px',
    borderRadius: $theme.borders.useRoundedCorners ? '2px' : '0px',
    background: background,
    height: '4px',
  };
});

export const Tick = styled('div', props => {
  const {$theme} = props;
  const {} = $theme;
  return {};
});

export const TickBar = styled('div', props => {
  const {$theme} = props;
  const {} = $theme;
  return {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '10px 10px',
  };
});

export const Thumb = styled('div', props => {
  const {$theme, $value, $max, $index, $currentThumb} = props;
  const offset = Math.round(($value[$index] / $max) * 100);
  const isRange = $value.length > 1;
  const $isActive = $index === $currentThumb;
  return {
    ...getToggleCheckMarkStyles({...props, ...{$isActive, $isStart: true}}),
    backgroundColor: null,
    position: 'relative',
    top: '-10px',
    left: offset + '%',
    marginLeft: props.$index % 2 ? '-32px' : '-16px',
    ':before': {
      position: 'absolute',
      content: `"${Math.round(props.$value[props.$index])}"`,
      display: 'block',
      top: '-24px',
      marginLeft: '4px',
      width: '16px',
      height: '16px',
    },
  };
});
