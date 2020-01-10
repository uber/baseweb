/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {styled} from '../styles/index.js';
import {KIND, SIZE, SHAPE} from './constants.js';
import type {SharedStylePropsT} from './types.js';

export const BaseButton = styled<SharedStylePropsT>(
  'button',
  ({$theme, $size, $kind, $shape, $isLoading, $isSelected, $disabled}) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0,
    borderStyle: 'none',
    textDecoration: 'none',
    outline: 'none',
    WebkitAppearance: 'none',
    transitionProperty: 'background',
    transitionDuration: $theme.animation.timing100,
    transitionTimingFunction: $theme.animation.easeOutCurve,
    cursor: 'pointer',
    ':disabled': {
      cursor: 'not-allowed',
      backgroundColor: $theme.colors.buttonDisabledFill,
      color: $theme.colors.buttonDisabledText,
    },
    marginLeft: 0,
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    ...getFontStyles({$theme, $size}),
    ...getBorderRadiiStyles({$theme, $size, $shape}),
    ...getPaddingStyles({$theme, $size, $shape}),
    // Kind style override
    ...getKindStyles({$theme, $kind, $isLoading, $isSelected, $disabled}),
  }),
);

export const EndEnhancer = styled<SharedStylePropsT>('div', ({$theme}) => ({
  display: 'flex',
  [$theme.direction === 'rtl' ? 'marginRight' : 'marginLeft']: $theme.sizing
    .scale500,
}));

export const StartEnhancer = styled<SharedStylePropsT>('div', ({$theme}) => ({
  display: 'flex',
  [$theme.direction === 'rtl' ? 'marginLeft' : 'marginRight']: $theme.sizing
    .scale500,
}));

export const LoadingSpinnerContainer = styled('div', {
  // To center within parent
  position: 'absolute',
});

export const LoadingSpinner = styled<SharedStylePropsT>(
  'div',
  ({$theme, $kind, $disabled}) => {
    const {foreground, background} = getLoadingSpinnerColors({
      $theme,
      $kind,
      $disabled,
    });
    return {
      height: $theme.sizing.scale600,
      width: $theme.sizing.scale600,
      borderTopLeftRadius: '50%',
      borderTopRightRadius: '50%',
      borderBottomRightRadius: '50%',
      borderBottomLeftRadius: '50%',
      borderStyle: 'solid',
      borderWidth: $theme.sizing.scale0,
      borderTopColor: foreground,
      borderLeftColor: background,
      borderBottomColor: background,
      borderRightColor: background,
      animationDuration: $theme.animation.timing700,
      animationTimingFunction: 'linear',
      animationIterationCount: 'infinite',
      animationName: {
        to: {
          transform: 'rotate(360deg)',
        },
        from: {
          transform: 'rotate(0deg)',
        },
      },
    };
  },
);

function getLoadingSpinnerColors({$theme, $kind, $disabled}) {
  if ($disabled) {
    return {
      foreground: $theme.colors.buttonDisabledSpinnerForeground,
      background: $theme.colors.buttonDisabledSpinnerBackground,
    };
  }
  switch ($kind) {
    case KIND.secondary: {
      return {
        foreground: $theme.colors.buttonSecondarySpinnerForeground,
        background: $theme.colors.buttonSecondarySpinnerBackground,
      };
    }
    case KIND.tertiary: {
      return {
        foreground: $theme.colors.buttonTertiarySpinnerForeground,
        background: $theme.colors.buttonTertiarySpinnerBackground,
      };
    }
    case KIND.minimal: {
      return {
        foreground: $theme.colors.buttonMinimalSpinnerForeground,
        background: $theme.colors.buttonMinimalSpinnerBackground,
      };
    }
    case KIND.primary:
    default: {
      return {
        foreground: $theme.colors.buttonPrimarySpinnerForeground,
        background: $theme.colors.buttonPrimarySpinnerBackground,
      };
    }
  }
}

function getBorderRadiiStyles({$theme, $size, $shape}) {
  let value = $theme.borders.buttonBorderRadius;

  if ($shape === SHAPE.pill) {
    if ($size === SIZE.compact) {
      value = '30px';
    } else if ($size === SIZE.large) {
      value = '42px';
    } else {
      value = '38px';
    }
  } else if ($shape === SHAPE.round) {
    value = '50%';
  }

  return {
    borderTopRightRadius: value,
    borderBottomRightRadius: value,
    borderTopLeftRadius: value,
    borderBottomLeftRadius: value,
  };
}

function getFontStyles({$theme, $size}) {
  switch ($size) {
    case SIZE.compact:
      return $theme.typography.font250;
    case SIZE.large:
      return $theme.typography.font450;
    default:
      return $theme.typography.font350;
  }
}

function getPaddingStyles({$theme, $size, $shape}) {
  const iconShape = $shape === SHAPE.square || $shape === SHAPE.round;
  switch ($size) {
    case SIZE.compact:
      return {
        paddingTop: $theme.sizing.scale400,
        paddingBottom: $theme.sizing.scale400,
        paddingLeft: iconShape
          ? $theme.sizing.scale400
          : $theme.sizing.scale500,
        paddingRight: iconShape
          ? $theme.sizing.scale400
          : $theme.sizing.scale500,
      };
    case SIZE.large:
      return {
        paddingTop: $theme.sizing.scale600,
        paddingBottom: $theme.sizing.scale600,
        paddingLeft: iconShape
          ? $theme.sizing.scale600
          : $theme.sizing.scale700,
        paddingRight: iconShape
          ? $theme.sizing.scale600
          : $theme.sizing.scale700,
      };
    default:
      return {
        paddingTop: $theme.sizing.scale550,
        paddingBottom: $theme.sizing.scale550,
        paddingLeft: iconShape
          ? $theme.sizing.scale550
          : $theme.sizing.scale600,
        paddingRight: iconShape
          ? $theme.sizing.scale550
          : $theme.sizing.scale600,
      };
  }
}

function getKindStyles({$theme, $isLoading, $isSelected, $kind, $disabled}) {
  if ($disabled) {
    return {};
  }
  switch ($kind) {
    case KIND.primary:
      if ($isSelected) {
        return {
          color: $theme.colors.buttonPrimarySelectedText,
          backgroundColor: $theme.colors.buttonPrimarySelectedFill,
        };
      }
      return {
        color: $theme.colors.buttonPrimaryText,
        backgroundColor: $theme.colors.buttonPrimaryFill,
        ':hover': {
          backgroundColor: $isLoading
            ? $theme.colors.buttonPrimaryActive
            : $theme.colors.buttonPrimaryHover,
        },
        ':focus': {
          backgroundColor: $isLoading
            ? $theme.colors.buttonPrimaryActive
            : $theme.colors.buttonPrimaryHover,
        },
        ':active': {
          backgroundColor: $theme.colors.buttonPrimaryActive,
        },
      };
    case KIND.secondary:
      if ($isSelected) {
        return {
          color: $theme.colors.buttonSecondarySelectedText,
          backgroundColor: $theme.colors.buttonSecondarySelectedFill,
        };
      }
      return {
        color: $theme.colors.buttonSecondaryText,
        backgroundColor: $theme.colors.buttonSecondaryFill,
        ':hover': {
          backgroundColor: $isLoading
            ? $theme.colors.buttonSecondaryActive
            : $theme.colors.buttonSecondaryHover,
        },
        ':focus': {
          backgroundColor: $isLoading
            ? $theme.colors.buttonSecondaryActive
            : $theme.colors.buttonSecondaryHover,
        },
        ':active': {
          backgroundColor: $theme.colors.buttonSecondaryActive,
        },
      };
    case KIND.tertiary:
      if ($isSelected) {
        return {
          color: $theme.colors.buttonTertiarySelectedText,
          backgroundColor: $theme.colors.buttonTertiarySelectedFill,
        };
      }
      return {
        color: $theme.colors.buttonTertiaryText,
        backgroundColor: $theme.colors.buttonTertiaryFill,
        ':hover': {
          backgroundColor: $isLoading
            ? $theme.colors.buttonTertiaryActive
            : $theme.colors.buttonTertiaryHover,
        },
        ':focus': {
          backgroundColor: $isLoading
            ? $theme.colors.buttonTertiaryActive
            : $theme.colors.buttonTertiaryHover,
        },
        ':active': {
          backgroundColor: $theme.colors.buttonTertiaryActive,
        },
      };
    case KIND.minimal:
      if ($isSelected) {
        return {
          color: $theme.colors.buttonMinimalSelectedText,
          backgroundColor: $theme.colors.buttonMinimalSelectedFill,
        };
      }
      return {
        color: $theme.colors.buttonMinimalText,
        backgroundColor: $theme.colors.buttonMinimalFill,
        ':hover': {
          backgroundColor: $isLoading
            ? $theme.colors.buttonMinimalActive
            : $theme.colors.buttonMinimalHover,
        },
        ':focus': {
          backgroundColor: $isLoading
            ? $theme.colors.buttonMinimalActive
            : $theme.colors.buttonMinimalHover,
        },
        ':active': {
          backgroundColor: $theme.colors.buttonMinimalActive,
        },
      };
    default:
      return {};
  }
}
