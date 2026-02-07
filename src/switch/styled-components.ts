/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { styled, type Theme } from '../styles';

import type { SharedStyleProps } from './types';
import { LABEL_PLACEMENT, SIZE } from './constants';
import { getFocusOutlineStyle } from '../utils/get-shared-styles';

type UtilityProps = SharedStyleProps & { $theme: Theme };

function getLabelPadding(props: UtilityProps) {
  const { $labelPlacement, $theme, $size } = props;
  const { sizing } = $theme;
  const { scale0, scale100, scale300 } = sizing;
  let paddingDirection;

  switch ($labelPlacement) {
    case LABEL_PLACEMENT.left:
      paddingDirection = 'Right';
      break;
    case LABEL_PLACEMENT.right:
    default:
      paddingDirection = 'Left';
      break;
  }

  if ($theme.direction === 'rtl' && paddingDirection === 'Left') {
    paddingDirection = 'Right';
  } else if ($theme.direction === 'rtl' && paddingDirection === 'Right') {
    paddingDirection = 'Left';
  }

  return {
    [`padding${paddingDirection}`]: scale300,
    paddingTop: $size === SIZE.small ? scale0 : scale100,
  };
}

function getLabelColor(props: UtilityProps) {
  const { $disabled, $theme } = props;
  const { colors } = $theme;
  return $disabled ? colors.contentStateDisabled : colors.contentPrimary;
}

export const Root = styled<'label', SharedStyleProps>('label', (props) => {
  const { $disabled, $theme, $size } = props;
  const { sizing } = $theme;
  return {
    flexDirection: 'row',
    display: 'inline-flex',
    verticalAlign: 'middle',
    alignItems: 'flex-start',
    cursor: $disabled ? 'not-allowed' : 'pointer',
    userSelect: 'none',
    '@media (pointer: coarse)': {
      // Increase target size for touch devices to meet the minimum touch target size of 48x48dp
      padding: $size === SIZE.small ? sizing.scale500 : sizing.scale300,
    },
  };
});

Root.displayName = 'Root';

export const Toggle = styled<'div', SharedStyleProps>('div', (props) => {
  const { $theme, $checked, $disabled, $size, $isHovered, $showIcon } = props;
  const { sizing, colors, direction } = $theme;
  let backgroundColor = colors.contentTertiary;
  if ($disabled) {
    backgroundColor = colors.contentStateDisabled;
  } else if ($checked) {
    backgroundColor = colors.contentInversePrimary;
  }

  let height, width;
  switch ($size) {
    case SIZE.small:
      if ($checked) {
        // 16px
        width = sizing.scale600;
        height = sizing.scale600;
      } else {
        // 12px
        width = sizing.scale500;
        height = sizing.scale500;
      }

      break;
    case SIZE.default:
    default:
      if ($checked) {
        // 24px
        width = sizing.scale800;
        height = sizing.scale800;
      } else {
        // 16px
        width = sizing.scale600;
        height = sizing.scale600;
      }

      break;
  }

  const translateX = $size === SIZE.small ? sizing.scale600 : sizing.scale700;
  const iconSize = $size === SIZE.small ? 12 : 16;
  const checkmarkIcon = encodeURIComponent(`
    <svg width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="m8.5 19.84-6.56-6.56 2.12-2.12L8.5 15.6 19.94 4.16l2.12 2.12L8.5 19.84Z" fill="${colors.contentPrimary}"/>
    </svg>
  `);

  return {
    backgroundColor,
    borderTopLeftRadius: '50%',
    borderTopRightRadius: '50%',
    borderBottomRightRadius: '50%',
    borderBottomLeftRadius: '50%',
    boxShadow:
      $isHovered && !$checked
        ? `inset 0 0 0 999px ${colors.hoverOverlayInverseAlpha}`
        : $isHovered && $checked
        ? `inset 0 0 0 999px ${colors.hoverOverlayAlpha}`
        : 'none',
    outline: 'none',
    height,
    width,
    transform: $checked
      ? `translateX(${direction === 'rtl' ? `-${translateX}` : translateX})`
      : undefined,
    transition: 'transform 350ms cubic-bezier(0.27, 1.06, 0.18, 1.00)',
    backgroundImage:
      $showIcon && $checked ? `url('data:image/svg+xml,${checkmarkIcon}');` : undefined,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  };
});

Toggle.displayName = 'Toggle';

export const ToggleTrack = styled<'div', SharedStyleProps>('div', (props) => {
  const { $size, $theme, $checked, $disabled, $isHovered, $isFocusVisible, $isFocused } = props;
  const { sizing, colors } = $theme;

  let height, width;
  switch ($size) {
    case SIZE.small:
      width = sizing.scale1000; //'40px';
      height = sizing.scale800; //'24px';
      break;
    case SIZE.default:
    default:
      width = '52px';
      height = sizing.scale900; //'32px';
      break;
  }

  let backgroundColor = colors.backgroundTertiary;
  if ($disabled) {
    backgroundColor = colors.backgroundStateDisabled;
  } else if ($checked) {
    backgroundColor = colors.backgroundInversePrimary;
  }

  let borderColor = 'transparent';
  let borderStyle = 'solid';
  let borderWidth = sizing.scale0;
  let outline = 'none';
  let outlineOffset = '0px';
  if ($disabled) {
    borderColor = colors.borderStateDisabled;
  }

  if (!$disabled && !$checked) {
    borderColor = colors.contentTertiary;
  }

  if (!$disabled && $checked) {
    borderStyle = 'none';
    borderWidth = '0px';
  }

  if (!$disabled && $isFocusVisible && $isFocused) {
    const outlineStyles = getFocusOutlineStyle($theme);
    outline = outlineStyles.outline;
    outlineOffset = outlineStyles.outlineOffset;
  }

  return {
    alignItems: 'center',
    backgroundColor,
    borderTopLeftRadius: '999px',
    borderTopRightRadius: '999px',
    borderBottomRightRadius: '999px',
    borderBottomLeftRadius: '999px',
    borderStyle,
    borderWidth,
    borderColor,
    display: 'flex',
    flex: '0 0 auto',
    height,
    width,
    outline,
    outlineOffset,
    paddingTop: sizing.scale100,
    paddingBottom: sizing.scale100,
    paddingLeft: sizing.scale100,
    paddingRight: sizing.scale100,
    boxSizing: 'border-box',
    boxShadow:
      $isHovered && !$checked
        ? `inset 0 0 0 999px ${colors.hoverOverlayAlpha}`
        : $isHovered && $checked
        ? `inset 0 0 0 999px ${colors.hoverOverlayInverseAlpha}`
        : 'none',
  };
});
ToggleTrack.displayName = 'ToggleTrack';

export const Label = styled<'div', SharedStyleProps>('div', (props) => {
  const { $theme, $size } = props;
  const { typography } = $theme;
  return {
    verticalAlign: 'middle',
    ...getLabelPadding(props),
    color: getLabelColor(props),
    ...($size === SIZE.small ? typography.ParagraphSmall : typography.ParagraphMedium),
  };
});

Label.displayName = 'Label';

// tricky style for focus event cause display: none doesn't work
export const Input = styled('input', {
  opacity: 0,
  width: 0,
  height: 0,
  overflow: 'hidden',
  margin: 0,
  padding: 0,
  position: 'absolute',
});

Input.displayName = 'Input';
