/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { styled, hexToRgb } from '../styles';
import { SIZE, KIND } from './constants';
import type { Size, Kind } from './types';

export const StyledRoot = styled<'div', { $kind: Kind }>('div', ({ $kind, $theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: $theme.sizing.scale300,
  width: 'fit-content',
  paddingTop: $theme.sizing.scale100,
  paddingRight: $theme.sizing.scale500,
  paddingBottom: $theme.sizing.scale100,
  paddingLeft: $theme.sizing.scale500,
  borderRadius: $theme.borders.radius500,
  backgroundColor:
    $kind === KIND.backgroundProtection ? $theme.colors.backgroundPrimary : 'transparent',
}));
StyledRoot.displayName = 'StyledRoot';

export const StyledDot = styled<
  'input',
  { $active: boolean; $kind: Kind; $size: Size; $disabled: boolean; $isVisible: boolean }
>('input', ({ $active, $kind, $size, $disabled, $isVisible, $theme }) => {
  const sizes = {
    [SIZE.large]: {
      height: $theme.sizing.scale300,
      width: $theme.sizing.scale300,
    },
    [SIZE.medium]: {
      height: $theme.sizing.scale200,
      width: $theme.sizing.scale200,
      marginTop: '1px',
      marginRight: '1px',
      marginBottom: '1px',
      marginLeft: '1px',
    },
    [SIZE.small]: {
      height: $theme.sizing.scale100,
      width: $theme.sizing.scale100,
      marginTop: $theme.sizing.scale0,
      marginRight: $theme.sizing.scale0,
      marginBottom: $theme.sizing.scale0,
      marginLeft: $theme.sizing.scale0,
    },
  };

  const colors = {
    [KIND.default]: {
      active: $theme.colors.contentPrimary,
      inactive: $theme.colors.backgroundTertiary,
    },
    [KIND.backgroundProtection]: {
      active: $theme.colors.contentPrimary,
      inactive: $theme.colors.backgroundTertiary,
    },
    [KIND.inverse]: {
      active: $theme.colors.contentInversePrimary,
      inactive: $theme.colors.backgroundInversePrimary,
    },
    [KIND.alwaysLight]: {
      active: $theme.colors.contentOnColorInverse,
      inactive: hexToRgb($theme.colors.backgroundAlwaysDark, '0.12'),
    },
    [KIND.alwaysDark]: {
      active: $theme.colors.contentOnColor,
      inactive: hexToRgb($theme.colors.backgroundAlwaysLight, '0.24'),
    },
  };

  return {
    // reset default input styles
    appearance: 'none',
    margin: 0,
    // base web styles
    ...sizes[$size],
    borderRadius: '50%',
    backgroundColor: $disabled
      ? $theme.colors.contentStateDisabled
      : $active
      ? colors[$kind].active
      : colors[$kind].inactive,
    ...(!$isVisible
      ? {
          // https://www.nomensa.com/blog/how-improve-web-accessibility-hiding-elements
          border: 0,
          clip: 'rect(1px, 1px, 1px, 1px)',
          height: '1px',
          margin: '-1px',
          overflow: 'hidden',
          padding: 0,
          position: 'absolute',
          width: '1px',
        }
      : {}),
  };
});
StyledDot.displayName = 'StyledDot';
