/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { getTrackBackground } from 'react-range';

import { styled } from '../styles/index';
import type { StylePropsT } from './types';

export const Root = styled('div', { position: 'relative', width: '100%' });
Root.displayName = 'StyledRoot';

export const Track = styled<'div', StylePropsT>('div', (props) => {
  const { $theme, $value = [], $disabled, $isDragged } = props;
  const { sizing } = $theme;
  let cursor = 'inherit';
  if ($disabled) {
    cursor = 'not-allowed';
  } else if ($isDragged) {
    cursor = 'grabbing';
  } else if ($value.length === 1) {
    cursor = 'pointer';
  }
  return {
    paddingTop: sizing.scale600,
    paddingBottom: sizing.scale600,
    paddingRight: sizing.scale600,
    paddingLeft: sizing.scale600,
    display: 'flex',
    cursor,
    backgroundColor: $theme.colors.sliderTrackFill,
  };
});
Track.displayName = 'StyledTrack';

export const InnerTrack = styled<'div', StylePropsT>('div', (props) => {
  const { $theme, $value = [], $min, $max, $disabled } = props;
  const { colors, borders, direction } = $theme;
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
          ? [
              $disabled ? colors.borderOpaque : colors.primary,
              $disabled ? colors.backgroundSecondary : colors.borderOpaque,
            ]
          : [
              $disabled ? colors.backgroundSecondary : colors.borderOpaque,
              $disabled ? colors.borderOpaque : colors.primary,
              $disabled ? colors.backgroundSecondary : colors.borderOpaque,
            ],
      min: $min || 0,
      max: $max || 0,
      rtl: direction === 'rtl',
    }),
    height: '2px',
    width: '100%',
    alignSelf: 'center',
    cursor: $disabled ? 'not-allowed' : 'inherit',
  };
});
InnerTrack.displayName = 'StyledInnerTrack';

export const Mark = styled<'div', StylePropsT>('div', (props) => {
  return {
    width: '4px',
    height: '2px',
    backgroundColor: props.$theme.colors.backgroundPrimary,
    marginLeft: '16px',
  };
});
Mark.displayName = 'StyledMark';

export const Tick = styled<'div', StylePropsT>('div', (props) => {
  return {
    ...props.$theme.typography.font200,
    color: props.$theme.colors.contentPrimary,
  };
});
Tick.displayName = 'StyledTick';

export const TickBar = styled<'div', StylePropsT>('div', (props) => {
  const { $theme } = props;
  const { sizing } = $theme;
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

export const Thumb = styled<'div', StylePropsT>('div', (props) => {
  const { $theme, $value = [], $thumbIndex, $disabled } = props;
  let isLeft = $value.length === 2 && $thumbIndex === 0;
  let isRight = $value.length === 2 && $thumbIndex === 1;

  if ($theme.direction === 'rtl' && (isRight || isLeft)) {
    isLeft = !isLeft;
    isRight = !isRight;
  }

  return {
    height: '24px',
    width: '24px',
    borderTopLeftRadius: '24px',
    borderTopRightRadius: '24px',
    borderBottomLeftRadius: '24px',
    borderBottomRightRadius: '24px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: $disabled
      ? $theme.colors.sliderHandleFillDisabled
      : $theme.colors.sliderHandleFill,
    outline: 'none',
    boxShadow: props.$isFocusVisible
      ? `0 0 0 3px ${$theme.colors.accent}`
      : '0 1px 4px rgba(0, 0, 0, 0.12)',
    cursor: $disabled ? 'not-allowed' : 'inherit',
  };
});
Thumb.displayName = 'StyledThumb';

export const InnerThumb = styled<'div', StylePropsT>('div', (props) => {
  const { $disabled, $theme } = props;
  return {
    position: 'absolute',
    top: '-16px',
    width: '4px',
    height: '20px',
    backgroundColor: $disabled
      ? $theme.colors.sliderHandleFillDisabled
      : $theme.colors.sliderHandleInnerFill,
  };
});
InnerThumb.displayName = 'StyledInnerThumb';

export const ThumbValue = styled<'div', StylePropsT>('div', (props) => {
  const { $disabled, $theme } = props;
  return {
    position: 'absolute',
    top: `-${$theme.sizing.scale1400}`,
    ...$theme.typography.font200,
    backgroundColor: $disabled
      ? $theme.colors.sliderHandleFillDisabled
      : $theme.colors.sliderHandleInnerFill,
    color: $theme.colors.contentInversePrimary,
    paddingLeft: $theme.sizing.scale600,
    paddingRight: $theme.sizing.scale600,
    paddingTop: $theme.sizing.scale500,
    paddingBottom: $theme.sizing.scale500,
    borderBottomLeftRadius: '48px',
    borderBottomRightRadius: '48px',
    borderTopLeftRadius: '48px',
    borderTopRightRadius: '48px',
    whiteSpace: 'nowrap',
  };
});
ThumbValue.displayName = 'StyledThumbValue';
