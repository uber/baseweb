/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { styled } from '../styles';

import type { SharedStyleProps } from './types';

// @ts-ignore
function getBorderColor(props) {
  const { $disabled, $checked, $error, $isIndeterminate, $theme, $isFocusVisible } = props;
  const { colors } = $theme;
  if ($disabled) {
    return colors.tickFillDisabled;
  } else if ($checked || $isIndeterminate) {
    return 'transparent';
  } else if ($error) {
    return colors.borderNegative;
  } else if ($isFocusVisible) {
    return colors.borderSelected;
  } else {
    return colors.tickBorder;
  }
}

// @ts-ignore
function getLabelPadding(props) {
  const { $labelPlacement = '', $theme } = props;
  const { sizing } = $theme;
  const { scale300 } = sizing;
  let paddingDirection;

  switch ($labelPlacement) {
    case 'top':
      paddingDirection = 'Bottom';
      break;
    case 'bottom':
      paddingDirection = 'Top';
      break;
    case 'left':
      paddingDirection = 'Right';
      break;
    default:
    case 'right':
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
  };
}

// @ts-ignore
function getBackgroundColor(props) {
  const { $disabled, $checked, $isIndeterminate, $error, $isHovered, $isActive, $theme } = props;
  const { colors } = $theme;
  if ($disabled) {
    if ($checked || $isIndeterminate) {
      return colors.tickFillDisabled;
    } else {
      return colors.tickFill;
    }
  } else if ($error && ($isIndeterminate || $checked)) {
    if ($isActive) {
      return colors.tickFillErrorSelectedHoverActive;
    } else if ($isHovered) {
      return colors.tickFillErrorSelectedHover;
    } else {
      return colors.tickFillErrorSelected;
    }
  } else if ($error) {
    if ($isActive) {
      return colors.tickFillErrorHoverActive;
    } else if ($isHovered) {
      return colors.tickFillErrorHover;
    } else {
      return colors.tickFillError;
    }
  } else if ($isIndeterminate || $checked) {
    if ($isActive) {
      return colors.tickFillSelectedHoverActive;
    } else if ($isHovered) {
      return colors.tickFillSelectedHover;
    } else {
      return colors.tickFillSelected;
    }
  } else {
    if ($isActive) {
      return colors.tickFillActive;
    } else if ($isHovered) {
      return colors.tickFillHover;
    } else {
      return colors.tickFill;
    }
  }
}

// @ts-ignore
function getLabelColor(props) {
  const { $disabled, $theme } = props;
  const { colors } = $theme;
  return $disabled ? colors.contentSecondary : colors.contentPrimary;
}

export const Root = styled<'label', SharedStyleProps>('label', (props) => {
  const { $disabled, $labelPlacement } = props;
  return {
    flexDirection: $labelPlacement === 'top' || $labelPlacement === 'bottom' ? 'column' : 'row',
    display: 'flex',
    alignItems: $labelPlacement === 'top' || $labelPlacement === 'bottom' ? 'center' : 'flex-start',
    cursor: $disabled ? 'not-allowed' : 'pointer',
    userSelect: 'none',
  };
});

Root.displayName = 'Root';

// @ts-ignore
export const Checkmark = styled<'span', SharedStyleProps>('span', (props) => {
  const { $checked, $disabled, $error, $isIndeterminate, $theme, $isFocusVisible } = props;
  const { sizing, animation } = $theme;

  const tickColor = $disabled
    ? $theme.colors.tickMarkFillDisabled
    : $error
    ? $theme.colors.tickMarkFillError
    : $theme.colors.tickMarkFill;

  const indeterminate = encodeURIComponent(`
    <svg width="14" height="4" viewBox="0 0 14 4" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 0.5H0V3.5H14V0.5Z" fill="${tickColor}"/>
    </svg>
  `);

  const check = encodeURIComponent(`
    <svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.50002 12.6L0.400024 6.60002L2.60002 4.40002L6.50002 8.40002L13.9 0.900024L16.1 3.10002L6.50002 12.6Z" fill="${tickColor}"/>
    </svg>
  `);

  const borderRadius = $theme.borders.checkboxBorderRadius;
  const borderColor = getBorderColor(props);

  return {
    flex: '0 0 auto',
    transitionDuration: animation.timing200,
    transitionTimingFunction: animation.easeOutCurve,
    transitionProperty: 'background-image, border-color, background-color',
    width: sizing.scale700,
    height: sizing.scale700,
    left: '4px',
    top: '4px',
    boxSizing: 'border-box',
    borderLeftStyle: 'solid',
    borderRightStyle: 'solid',
    borderTopStyle: 'solid',
    borderBottomStyle: 'solid',
    borderLeftWidth: '3px',
    borderRightWidth: '3px',
    borderTopWidth: '3px',
    borderBottomWidth: '3px',
    borderLeftColor: borderColor,
    borderRightColor: borderColor,
    borderTopColor: borderColor,
    borderBottomColor: borderColor,
    borderTopLeftRadius: borderRadius,
    borderTopRightRadius: borderRadius,
    borderBottomRightRadius: borderRadius,
    borderBottomLeftRadius: borderRadius,
    outline: $isFocusVisible && $checked ? `3px solid ${$theme.colors.accent}` : 'none',
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
    backgroundSize: 'contain',
    marginTop: $theme.sizing.scale0,
    marginBottom: $theme.sizing.scale0,
    marginLeft: $theme.sizing.scale0,
    marginRight: $theme.sizing.scale0,
  };
});

Checkmark.displayName = 'Checkmark';

export const Label = styled<'div', SharedStyleProps>('div', (props) => {
  const { $theme } = props;
  const { typography } = $theme;
  return {
    verticalAlign: 'middle',
    ...getLabelPadding(props),
    color: getLabelColor(props),
    ...typography.LabelMedium,
    lineHeight: '24px',
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

// @ts-ignore
export const Toggle = styled<'div', SharedStyleProps>('div', (props) => {
  let backgroundColor = props.$theme.colors.toggleFill;
  if (props.$disabled) {
    backgroundColor = props.$theme.colors.toggleFillDisabled;
  } else if (props.$checked && props.$error) {
    backgroundColor = props.$theme.colors.tickFillErrorSelected;
  } else if (props.$checked) {
    backgroundColor = props.$theme.colors.toggleFillChecked;
  }

  return {
    backgroundColor,
    borderTopLeftRadius: '50%',
    borderTopRightRadius: '50%',
    borderBottomRightRadius: '50%',
    borderBottomLeftRadius: '50%',
    boxShadow: props.$isFocusVisible
      ? `0 0 0 3px ${props.$theme.colors.accent}`
      : props.$isHovered && !props.$disabled
      ? props.$theme.lighting.shadow500
      : props.$theme.lighting.shadow400,
    outline: 'none',
    height: props.$theme.sizing.scale700,
    width: props.$theme.sizing.scale700,
    transform: props.$checked
      ? `translateX(${props.$theme.direction === 'rtl' ? '-100%' : '100%'})`
      : null,
    transition: `transform ${props.$theme.animation.timing200}`,
  };
});

Toggle.displayName = 'Toggle';

export const ToggleTrack = styled<'div', SharedStyleProps>('div', (props) => {
  let backgroundColor = props.$theme.colors.toggleTrackFill;
  if (props.$disabled) {
    backgroundColor = props.$theme.colors.toggleTrackFillDisabled;
  } else if (props.$error && props.$checked) {
    backgroundColor = props.$theme.colors.tickFillError;
  }
  return {
    alignItems: 'center',
    backgroundColor,
    borderTopLeftRadius: '7px',
    borderTopRightRadius: '7px',
    borderBottomRightRadius: '7px',
    borderBottomLeftRadius: '7px',
    display: 'flex',
    height: props.$theme.sizing.scale550,
    marginTop: props.$theme.sizing.scale200,
    marginBottom: props.$theme.sizing.scale100,
    marginLeft: props.$theme.sizing.scale200,
    marginRight: props.$theme.sizing.scale100,
    width: props.$theme.sizing.scale1000,
  };
});
ToggleTrack.displayName = 'ToggleTrack';
