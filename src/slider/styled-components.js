/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {getTrackBackground} from 'react-range';

import {styled} from '../styles/index.js';
import type {StylePropsT} from './types.js';

export const Root = styled('div', {position: 'relative', width: '100%'});
Root.displayName = 'StyledRoot';

export const Track = styled<StylePropsT>('div', props => {
  const {$theme, $value = [], $disabled, $isDragged} = props;
  const {sizing} = $theme;
  let cursor = 'inherit';
  if ($disabled) {
    cursor = 'not-allowed';
  } else if ($isDragged) {
    cursor = 'grabbing';
  } else if ($value.length === 1) {
    cursor = 'pointer';
  }
  return {
    paddingTop: sizing.scale1000,
    paddingBottom: sizing.scale600,
    paddingRight: sizing.scale600,
    paddingLeft: sizing.scale600,
    display: 'flex',
    cursor,
  };
});
Track.displayName = 'StyledTrack';

export const InnerTrack = styled<StylePropsT>('div', props => {
  const {$theme, $value = [], $min, $max, $disabled} = props;
  const {colors, borders, sizing, direction} = $theme;
  const borderRadius = $theme.borders.useRoundedCorners ? borders.radius100 : 0;
  return {
    borderTopLeftRadius: borderRadius,
    borderTopRightRadius: borderRadius,
    borderBottomRightRadius: borderRadius,
    borderBottomLeftRadius: borderRadius,
    background: getTrackBackground({
      values: $value,
      colors:
        $value.length === 1
          ? [colors.primary, colors.mono400]
          : [colors.mono400, colors.primary, colors.mono400],
      min: $min || 0,
      max: $max || 0,
      rtl: direction === 'rtl',
    }),
    height: sizing.scale100,
    width: '100%',
    alignSelf: 'center',
    cursor: $disabled ? 'not-allowed' : 'inherit',
  };
});
InnerTrack.displayName = 'StyledInnerTrack';

export const Tick = styled<StylePropsT>('div', props => {
  return {
    ...props.$theme.typography.font200,
  };
});
Tick.displayName = 'StyledTick';

export const TickBar = styled<StylePropsT>('div', props => {
  const {$theme} = props;
  const {sizing} = $theme;
  return {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: sizing.scale600,
    paddingLeft: sizing.scale600,
    paddingBottom: sizing.scale400,
  };
});
TickBar.displayName = 'StyledTickBar';

export const Thumb = styled<StylePropsT>('div', props => {
  const {$theme, $value = [], $thumbIndex, $disabled} = props;
  let isLeft = $value.length === 2 && $thumbIndex === 0;
  let isRight = $value.length === 2 && $thumbIndex === 1;

  if ($theme.direction === 'rtl' && (isRight || isLeft)) {
    isLeft = !isLeft;
    isRight = !isRight;
  }

  return {
    height: '24px',
    width: isLeft || isRight ? '12px' : '24px',
    borderTopLeftRadius: isRight ? '1px' : '4px',
    borderTopRightRadius: isLeft ? '1px' : '4px',
    borderBottomLeftRadius: isRight ? '1px' : '4px',
    borderBottomRightRadius: isLeft ? '1px' : '4px',
    backgroundColor: $theme.colors.mono100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: $theme.colors.mono400,
    boxShadow: '0 1px 4px rgba(0, 0, 0, 0.12)',
    cursor: $disabled ? 'not-allowed' : 'inherit',
  };
});
Thumb.displayName = 'StyledThumb';

export const InnerThumb = styled<StylePropsT>('div', props => {
  const {$theme, $isDragged} = props;
  return {
    height: '8px',
    width: '2px',
    borderTopLeftRadius: '2px',
    borderTopRightRadius: '2px',
    borderBottomRightRadius: '2px',
    borderBottomLeftRadius: '2px',
    backgroundColor: $isDragged ? $theme.colors.primary : $theme.colors.mono600,
  };
});
InnerThumb.displayName = 'StyledInnerThumb';

export const ThumbValue = styled<{}>('div', props => {
  const {$theme} = props;
  return {
    position: 'absolute',
    top: `-${$theme.sizing.scale800}`,
    ...$theme.typography.font200,
    backgroundColor: 'transparent',
    whiteSpace: 'nowrap',
  };
});
ThumbValue.displayName = 'StyledThumbValue';
