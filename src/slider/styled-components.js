/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {styled} from '../styles/index.js';
import {getTrackBackground} from 'react-range';

export const Root = styled('div', props => {
  return {
    position: 'relative',
  };
});
Root.displayName = 'StyledRoot';

export const Track = styled('div', props => {
  const {$theme, $value, $disabled, $isDragged} = props;
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

export const InnerTrack = styled('div', props => {
  const {$theme, $value, $min, $max, $disabled} = props;
  const {colors, borders, sizing} = $theme;
  const borderRadius = $theme.borders.useRoundedCorners
    ? borders.radius100
    : '0px';
  return {
    borderTopRightRadius: borderRadius,
    borderBottomRightRadius: borderRadius,
    borderTopLeftRadius: borderRadius,
    borderBottomLeftRadius: borderRadius,
    background: getTrackBackground({
      values: $value,
      colors:
        $value.length === 1
          ? [colors.primary, colors.mono400]
          : [colors.mono400, colors.primary, colors.mono400],
      min: $min,
      max: $max,
    }),
    height: sizing.scale100,
    width: '100%',
    alignSelf: 'center',
    cursor: $disabled ? 'not-allowed' : 'inherit',
  };
});
InnerTrack.displayName = 'StyledInnerTrack';

export const Tick = styled('div', props => {
  return {
    ...props.$theme.typography.font300,
  };
});
Tick.displayName = 'StyledTick';

export const TickBar = styled('div', props => {
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

export const Thumb = styled('div', props => {
  const {$theme, $value, $thumbIndex, $disabled} = props;
  const isLeft = $value.length === 2 && $thumbIndex === 0;
  const isRight = $value.length === 2 && $thumbIndex === 1;
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
    boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.12)',
    cursor: $disabled ? 'not-allowed' : 'inherit',
  };
});
Thumb.displayName = 'StyledThumb';

export const InnerThumb = styled('div', props => {
  const {$theme, $isDragged} = props;
  return {
    height: '8px',
    width: '2px',
    borderTopRightRadius: '2px',
    borderBottomRightRadius: '2px',
    borderTopLeftRadius: '2px',
    borderBottomLeftRadius: '2px',
    backgroundColor: $isDragged ? $theme.colors.primary : $theme.colors.mono600,
  };
});
InnerThumb.displayName = 'StyledInnerThumb';

export const ThumbValue = styled('div', props => {
  const {$theme} = props;
  return {
    position: 'absolute',
    top: `-${$theme.sizing.scale800}`,
    ...$theme.typography.font300,
    backgroundColor: 'transparent',
  };
});
ThumbValue.displayName = 'StyledThumbValue';
