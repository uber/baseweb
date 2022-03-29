/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow
import { styled, expandBorderStyles } from '../styles/index.js';
import { STYLE_TYPE } from './constants.js';

import type { SharedStylePropsT } from './types.js';

function getBorderColor(props) {
  const { $disabled, $checked, $isError, $error, $isIndeterminate, $theme, $isFocusVisible } =
    props;
  const { colors } = $theme;
  if ($disabled) {
    return colors.tickFillDisabled;
  } else if ($checked || $isIndeterminate) {
    return 'transparent';
  } else if ($error || $isError) {
    return colors.borderNegative;
  } else if ($isFocusVisible) {
    return colors.borderSelected;
  } else {
    return colors.tickBorder;
  }
}

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

function getBackgroundColor(props) {
  const {
    $disabled,
    $checked,
    $isIndeterminate,
    $isError,
    $error,
    $isHovered,
    $isActive,
    $theme,
    $checkmarkType,
  } = props;
  const isToggle = $checkmarkType === STYLE_TYPE.toggle;
  const { colors } = $theme;
  if ($disabled) {
    if (isToggle) {
      return colors.toggleFillDisabled;
    }
    if ($checked || $isIndeterminate) {
      return colors.tickFillDisabled;
    } else {
      return colors.tickFill;
    }
  } else if (($error || $isError) && ($isIndeterminate || $checked)) {
    if ($isActive) {
      return colors.tickFillErrorSelectedHoverActive;
    } else if ($isHovered) {
      return colors.tickFillErrorSelectedHover;
    } else {
      return colors.tickFillErrorSelected;
    }
  } else if ($error || $isError) {
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
      return isToggle ? colors.sliderTrackFillActive : colors.tickFillActive;
    } else if ($isHovered) {
      return isToggle ? colors.sliderTrackFillHover : colors.tickFillHover;
    } else {
      return isToggle ? colors.toggleTrackFill : colors.tickFill;
    }
  }
}

function getLabelColor(props) {
  const { $disabled, $theme } = props;
  const { colors } = $theme;
  return $disabled ? colors.contentSecondary : colors.contentPrimary;
}

export const Root = styled<SharedStylePropsT>('label', (props) => {
  const { $disabled, $labelPlacement } = props;
  return {
    flexDirection: $labelPlacement === 'top' || $labelPlacement === 'bottom' ? 'column' : 'row',
    display: 'flex',
    alignItems: $labelPlacement === 'top' || $labelPlacement === 'bottom' ? 'center' : 'flex-start',
    cursor: $disabled ? 'not-allowed' : 'pointer',
    userSelect: 'none',
  };
});

export const Checkmark = styled<SharedStylePropsT>('span', (props) => {
  const { $checked, $disabled, $isError, $error, $isIndeterminate, $theme, $isFocusVisible } =
    props;
  const { sizing, animation } = $theme;

  const tickColor = $disabled
    ? $theme.colors.tickMarkFillDisabled
    : $isError || $error
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

  const borderRadius = $theme.borders.inputBorderRadius;
  const borderColor = getBorderColor(props);

  return ({
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
  }: {});
});

export const Label = styled<SharedStylePropsT>('div', (props) => {
  const { $theme, $checkmarkType } = props;
  const { typography } = $theme;
  return ({
    flex: $checkmarkType === STYLE_TYPE.toggle ? 'auto' : null,
    verticalAlign: 'middle',
    ...getLabelPadding(props),
    color: getLabelColor(props),
    ...typography.LabelMedium,
    lineHeight: '24px',
  }: {});
});

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

export const Toggle = styled<SharedStylePropsT>('div', (props) => {
  if (props.$checkmarkType === STYLE_TYPE.toggle) {
    const borderRadius = props.$theme.borders.useRoundedCorners
      ? props.$theme.borders.radius200
      : null;
    return ({
      ...expandBorderStyles(props.$theme.borders.border300),
      alignItems: 'center',
      backgroundColor: props.$theme.colors.mono100,
      borderTopLeftRadius: borderRadius,
      borderTopRightRadius: borderRadius,
      borderBottomRightRadius: borderRadius,
      borderBottomLeftRadius: borderRadius,
      boxShadow: props.$isFocusVisible
        ? `0 0 0 3px ${props.$theme.colors.accent}`
        : props.$theme.lighting.shadow400,
      outline: 'none',
      display: 'flex',
      justifyContent: 'center',
      height: props.$theme.sizing.scale800,
      width: props.$theme.sizing.scale800,
    }: {});
  }

  if (props.$checkmarkType === STYLE_TYPE.toggle_round) {
    let backgroundColor = props.$theme.colors.toggleFill;
    if (props.$disabled) {
      backgroundColor = props.$theme.colors.toggleFillDisabled;
    } else if (props.$checked && (props.$error || props.$isError)) {
      backgroundColor = props.$theme.colors.borderNegative;
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
  }

  return {};
});

export const ToggleInner = styled<SharedStylePropsT>('div', (props) => {
  if (props.$checkmarkType === STYLE_TYPE.toggle) {
    // eslint-disable-next-line no-inner-declarations
    const backgroundColor = () => {
      if (props.$disabled) {
        return props.$theme.colors.sliderHandleInnerFillDisabled;
      }

      if (props.$isActive && props.$checked) {
        return props.$theme.colors.sliderHandleInnerFillSelectedActive;
      }

      if (props.$isHovered && props.$checked) {
        return props.$theme.colors.sliderHandleInnerFillSelectedHover;
      }

      return props.$theme.colors.toggleTrackFill;
    };
    return {
      height: props.$theme.sizing.scale300,
      width: props.$theme.sizing.scale0,
      borderTopLeftRadius: props.$theme.borders.radius100,
      borderTopRightRadius: props.$theme.borders.radius100,
      borderBottomRightRadius: props.$theme.borders.radius100,
      borderBottomLeftRadius: props.$theme.borders.radius100,
      backgroundColor: backgroundColor(),
    };
  }

  if (props.$checkmarkType === STYLE_TYPE.toggle_round) {
    return {};
  }

  return {};
});

export const ToggleTrack = styled<SharedStylePropsT>('div', (props) => {
  if (props.$checkmarkType === STYLE_TYPE.toggle) {
    const borderRadius = props.$theme.borders.useRoundedCorners
      ? props.$theme.borders.radius200
      : null;
    return ({
      alignItems: 'center',
      backgroundColor: getBackgroundColor(props),
      borderTopLeftRadius: borderRadius,
      borderTopRightRadius: borderRadius,
      borderBottomRightRadius: borderRadius,
      borderBottomLeftRadius: borderRadius,
      display: 'flex',
      height: props.$theme.sizing.scale600,
      justifyContent: props.$checked ? 'flex-end' : 'flex-start',
      marginTop: props.$theme.sizing.scale100,
      marginBottom: props.$theme.sizing.scale100,
      marginLeft: props.$theme.sizing.scale100,
      marginRight: props.$theme.sizing.scale100,
      width: props.$theme.sizing.scale1000,
    }: {});
  }

  if (props.$checkmarkType === STYLE_TYPE.toggle_round) {
    let backgroundColor = props.$theme.colors.toggleTrackFill;
    if (props.$disabled) {
      backgroundColor = props.$theme.colors.toggleTrackFillDisabled;
    } else if ((props.$error || props.$isError) && props.$checked) {
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
  }

  return {};
});
