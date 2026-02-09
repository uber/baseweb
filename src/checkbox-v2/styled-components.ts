/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { styled, type Theme } from '../styles';

import type { SharedStyleProps } from './types';
import { LABEL_PLACEMENT } from './constants';
import { getFocusOutlineStyle, getOverlayColor } from '../utils/get-shared-styles';

type UtilityProps = SharedStyleProps & { $theme: Theme };

function getBorderColor(props: UtilityProps) {
  const { $disabled, $checked, $error, $isIndeterminate, $theme, $isFocusVisible } = props;
  const { colors } = $theme;
  if ($disabled) {
    return colors.contentStateDisabled;
  }
  if ($checked || $isIndeterminate) {
    return 'transparent';
  }
  if ($error) {
    return colors.tagRedContentSecondary;
  }
  if ($isFocusVisible) {
    return colors.borderSelected;
  }

  return colors.contentTertiary;
}

function getLabelPadding(props: UtilityProps) {
  const { $labelPlacement = '', $theme } = props;
  const { sizing } = $theme;
  const { scale100 } = sizing;
  let paddingDirection;

  switch ($labelPlacement) {
    case LABEL_PLACEMENT.left:
      paddingDirection = 'Right';
      break;
    default:
    case LABEL_PLACEMENT.right:
      paddingDirection = 'Left';
      break;
  }

  if ($theme.direction === 'rtl' && paddingDirection === 'Left') {
    paddingDirection = 'Right';
  } else if ($theme.direction === 'rtl' && paddingDirection === 'Right') {
    paddingDirection = 'Left';
  }

  return {
    [`padding${paddingDirection}`]: scale100,
  };
}

function getBackgroundColor(props: UtilityProps) {
  const { $disabled, $checked, $isIndeterminate, $error, $isHovered, $isActive, $theme } = props;
  const { colors } = $theme;

  if ($disabled) {
    return $checked || $isIndeterminate ? colors.contentStateDisabled : 'transparent';
  }
  if ($checked || $isIndeterminate) {
    return $error ? colors.tagRedContentSecondary : colors.contentPrimary;
  }
  if ($isHovered) {
    return $error ? colors.hoverNegativeAlpha : colors.hoverOverlayAlpha;
  }
  if ($isActive) {
    return $error ? colors.pressedNegativeAlpha : colors.pressedOverlayAlpha;
  }
  return 'transparent';
}

function getLabelColor(props: UtilityProps) {
  const { $disabled, $theme } = props;
  const { colors } = $theme;
  return $disabled ? colors.contentStateDisabled : colors.contentPrimary;
}

export const Root = styled<'label', SharedStyleProps>('label', (props) => {
  const { $disabled, $theme } = props;
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
      padding: sizing.scale300,
    },
  };
});

Root.displayName = 'Root';

// Styled checkmark container as the state layer, backplate container
export const CheckmarkContainer = styled<'span', SharedStyleProps>('span', (props) => {
  const { $theme } = props;
  const { sizing } = $theme;
  const { hoveredColor, pressedColor } = getOverlayColor(props);

  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    minHeight: sizing.scale900,
    minWidth: sizing.scale900,
    borderRadius: sizing.scale300,
    paddingTop: sizing.scale300,
    paddingBottom: sizing.scale300,
    paddingLeft: sizing.scale300,
    paddingRight: sizing.scale300,
    '@media (hover: hover)': {
      ':hover': {
        backgroundColor: hoveredColor,
      },
    },
    ':active': {
      backgroundColor: pressedColor,
    },
  };
});

// @ts-ignore
export const Checkmark = styled<'span', SharedStyleProps>('span', (props) => {
  const { $checked, $isIndeterminate, $theme, $isFocusVisible, $isFocused } = props;
  const { sizing, animation } = $theme;

  const tickColor = $theme.colors.contentInversePrimary;

  const indeterminate = encodeURIComponent(`
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 10.5H6v3h12v-3Z" fill="${tickColor}"/>
    </svg>
  `);

  const check = encodeURIComponent(`
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="m10 17.34-4.56-4.56 2.12-2.12L10 13.1l6.44-6.44 2.12 2.12L10 17.34Z" fill="${tickColor}"/>
    </svg>
  `);

  const borderRadius = sizing.scale100;
  const borderColor = getBorderColor(props);

  return {
    flex: '0 0 auto',
    transitionDuration: animation.timing200,
    transitionTimingFunction: animation.easeOutCurve,
    transitionProperty: 'background-image, border-color, background-color',
    width: '17px',
    height: '17px',
    boxSizing: 'border-box',
    borderLeftStyle: 'solid',
    borderRightStyle: 'solid',
    borderTopStyle: 'solid',
    borderBottomStyle: 'solid',
    borderLeftWidth: sizing.scale0,
    borderRightWidth: sizing.scale0,
    borderTopWidth: sizing.scale0,
    borderBottomWidth: sizing.scale0,
    borderLeftColor: borderColor,
    borderRightColor: borderColor,
    borderTopColor: borderColor,
    borderBottomColor: borderColor,
    borderTopLeftRadius: borderRadius,
    borderTopRightRadius: borderRadius,
    borderBottomRightRadius: borderRadius,
    borderBottomLeftRadius: borderRadius,
    // Apply focus outline style if the checkbox is focused and focus is visible（focused by Tab)
    ...($isFocusVisible && $isFocused ? getFocusOutlineStyle($theme) : {}),
    display: 'inline-block',
    verticalAlign: 'middle',
    backgroundImage: $isIndeterminate
      ? `url('data:image/svg+xml,${indeterminate}');`
      : $checked
      ? `url('data:image/svg+xml,${check}');`
      : null,
    backgroundColor: getBackgroundColor(props),
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  };
});

Checkmark.displayName = 'Checkmark';

export const Label = styled<'div', SharedStyleProps>('div', (props) => {
  const { $theme } = props;
  const { typography, sizing } = $theme;
  return {
    verticalAlign: 'middle',
    paddingTop: sizing.scale200, // top padding to make checkbox aligned with first row of the label
    ...getLabelPadding(props),
    color: getLabelColor(props),
    ...typography.ParagraphSmall,
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
