/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type { StyleObject } from 'styletron-standard';

import { styled, type Theme } from '../styles';
import { KIND, SIZE, SHAPE, MIN_HIT_AREA } from './constants';
import type { SharedStyleProps } from './types';
import type { Font } from '../themes/types';

// note: Tried doing a standard override of the styled function, but it didn't work
// it seems like there is some bug when override $as
type InternalStyleFn = (props: { $theme: Theme } & SharedStyleProps) => StyleObject;
const createStyledBaseButton = <T extends 'button' | 'a'>(type: T, styleFn?: InternalStyleFn) =>
  styled<T, SharedStyleProps>(
    type,
    ({
      $theme,
      $size,
      $colors,
      $kind,
      $shape,
      $isLoading,
      $isSelected,
      $disabled,
      $isFocusVisible,
      $minHitArea,
      $as,
    }) => ({
      display: 'inline-flex',
      // need to maintain button width while showing loading spinner
      flexDirection: $isLoading ? 'column' : 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderLeftWidth: 0,
      borderTopWidth: 0,
      borderRightWidth: 0,
      borderBottomWidth: 0,
      borderLeftStyle: 'none',
      borderTopStyle: 'none',
      borderRightStyle: 'none',
      borderBottomStyle: 'none',
      outline: 'none',
      boxShadow: $isFocusVisible ? `inset 0 0 0 3px ${$theme.colors.borderAccent}` : 'none',
      textDecoration: 'none',
      WebkitAppearance: 'none',
      transitionProperty: 'background',
      transitionDuration: $theme.animation.timing200,
      transitionTimingFunction: $theme.animation.linearCurve,
      cursor: 'pointer',
      ':disabled': {
        cursor: 'not-allowed',
        ...getDisabledStyles({ $theme, $kind, $disabled, $isSelected }),
      },
      marginLeft: 0,
      marginTop: 0,
      marginRight: 0,
      marginBottom: 0,
      ...getFontStyles({ $theme, $size }),
      ...getBorderRadiiStyles({ $theme, $size, $shape }),
      ...getPaddingStyles({ $theme, $size, $shape }),
      ...getColorStyles({
        $theme,
        $colors,
        $kind,
        $isLoading,
        $isSelected,
        $disabled,
      }),
      ...getAnchorDisabledStyles({ $as, $theme, $kind, $isSelected, $disabled }),
      ...getShapeStyles({ $shape, $size }),
      ...getMinHitAreaStyles({ $minHitArea, $size, $shape }),
      ...styleFn?.({
        $theme,
        $size,
        $colors,
        $kind,
        $shape,
        $isLoading,
        $isSelected,
        $disabled,
        $isFocusVisible,
        $minHitArea,
        $as,
      }),
    })
  );

export const BaseButton = createStyledBaseButton('button');
BaseButton.displayName = 'BaseButton';
export const AnchorBaseButton = createStyledBaseButton(
  'a',
  ({ $theme, $kind, $isSelected, $disabled }) =>
    getAnchorDisabledStyles({ $as: 'a', $theme, $kind, $isSelected, $disabled })
);
BaseButton.displayName = 'BaseButton';

export const EndEnhancer = styled<'div', SharedStyleProps>('div', ({ $theme }) => {
  const marginDirection: string = $theme.direction === 'rtl' ? 'marginRight' : 'marginLeft';
  return {
    display: 'flex',
    [marginDirection]: $theme.sizing.scale300,
  };
});

EndEnhancer.displayName = 'EndEnhancer';

export const StartEnhancer = styled<'div', SharedStyleProps>('div', ({ $theme }) => {
  const marginDirection: string = $theme.direction === 'rtl' ? 'marginLeft' : 'marginRight';
  return {
    display: 'flex',
    [marginDirection]: $theme.sizing.scale300,
  };
});

StartEnhancer.displayName = 'StartEnhancer';

export const LoadingSpinnerContainer = styled<'div', SharedStyleProps>(
  'div',
  ({ $theme, $size }) => {
    // we don't have a theming value for this
    let margins = '3px';
    if (
      $size === SIZE.mini ||
      $size === SIZE.xSmall ||
      $size === SIZE.compact ||
      $size === SIZE.small
    ) {
      margins = $theme.sizing.scale0;
    }
    if ($size === SIZE.large) {
      margins = $theme.sizing.scale100;
    }

    return {
      lineHeight: 0,
      position: 'static' as const,
      marginBottom: margins,
      marginTop: margins,
    };
  }
);

LoadingSpinnerContainer.displayName = 'LoadingSpinnerContainer';

export const LoadingSpinner = styled<'span', SharedStyleProps>(
  'span',
  ({ $theme, $kind, $disabled, $size }) => {
    const { foreground, background } = getLoadingSpinnerColors({
      $theme,
      $kind,
      $disabled,
    });

    let dimension = $theme.sizing.scale550;
    if (
      $size === SIZE.mini ||
      $size === SIZE.xSmall ||
      $size === SIZE.compact ||
      $size === SIZE.small
    ) {
      dimension = $theme.sizing.scale500;
    }
    if ($size === SIZE.large) {
      dimension = $theme.sizing.scale600;
    }

    return {
      height: dimension,
      width: dimension,
      borderTopLeftRadius: '50%',
      borderTopRightRadius: '50%',
      borderBottomRightRadius: '50%',
      borderBottomLeftRadius: '50%',
      borderLeftStyle: 'solid',
      borderTopStyle: 'solid',
      borderRightStyle: 'solid',
      borderBottomStyle: 'solid',
      borderLeftWidth: $theme.sizing.scale0,
      borderTopWidth: $theme.sizing.scale0,
      borderRightWidth: $theme.sizing.scale0,
      borderBottomWidth: $theme.sizing.scale0,
      borderTopColor: foreground,
      borderLeftColor: background,
      borderBottomColor: background,
      borderRightColor: background,
      boxSizing: 'border-box',
      display: 'inline-block',
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
  }
);

LoadingSpinner.displayName = 'LoadingSpinner';

// @ts-ignore
function getLoadingSpinnerColors({ $theme, $kind, $disabled }) {
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
    case KIND.primary:
    default: {
      return {
        foreground: $theme.colors.buttonPrimarySpinnerForeground,
        background: $theme.colors.buttonPrimarySpinnerBackground,
      };
    }
  }
}

// @ts-ignore
function getBorderRadiiStyles({ $theme, $size, $shape }) {
  let value = $theme.borders.buttonBorderRadius;

  if ($shape === SHAPE.pill) {
    if ($size === SIZE.compact || $size === SIZE.small) {
      value = '30px';
    } else if ($size === SIZE.large) {
      value = '42px';
    } else {
      value = '38px';
    }
  } else if ($shape === SHAPE.circle || $shape === SHAPE.round) {
    value = '50%';
  } else if ($size === SIZE.mini || $size === SIZE.xSmall) {
    value = $theme.borders.buttonBorderRadiusMini;
  }

  return {
    borderTopRightRadius: value,
    borderBottomRightRadius: value,
    borderTopLeftRadius: value,
    borderBottomLeftRadius: value,
  };
}

// @ts-ignore
function getFontStyles({ $theme, $size }): Font {
  switch ($size) {
    case SIZE.xSmall:
    case SIZE.mini:
      return $theme.typography.font150;
    case SIZE.small:
    case SIZE.compact:
      return $theme.typography.font250;
    case SIZE.large:
      return $theme.typography.font450;
    default:
      return $theme.typography.font350;
  }
}

function getAnchorDisabledStyles({ $as, $theme, $kind, $isSelected, $disabled }) {
  if (!($as === 'a' && $disabled)) {
    return {};
  }

  return {
    cursor: 'not-allowed',
    pointerEvents: 'none',
    ...getDisabledStyles({ $theme, $kind, $isSelected, $disabled }),
  };
}

// @ts-ignore
function getDisabledStyles({ $theme, $kind, $isSelected, $disabled }) {
  if ($disabled && $isSelected) {
    if ($kind === KIND.primary || $kind === KIND.secondary) {
      return {
        color: $theme.colors.buttonDisabledActiveText,
        backgroundColor: $theme.colors.buttonDisabledActiveFill,
      };
    } else if ($kind === KIND.tertiary) {
      return {
        backgroundColor: $theme.colors.buttonTertiaryDisabledActiveFill,
        color: $theme.colors.buttonTertiaryDisabledActiveText,
      };
    }
  }

  return {
    backgroundColor: $kind === KIND.tertiary ? 'transparent' : $theme.colors.buttonDisabledFill,
    color: $theme.colors.buttonDisabledText,
  };
}

// @ts-ignore
function getPaddingStyles({ $theme, $size, $shape }) {
  const iconShape = $shape === SHAPE.square || $shape === SHAPE.circle || $shape === SHAPE.round;
  switch ($size) {
    case SIZE.mini:
    case SIZE.xSmall:
      return {
        paddingTop: $theme.sizing.scale200,
        paddingBottom: $theme.sizing.scale200,
        paddingLeft: iconShape ? $theme.sizing.scale200 : $theme.sizing.scale300,
        paddingRight: iconShape ? $theme.sizing.scale200 : $theme.sizing.scale300,
      };
    case SIZE.compact:
    case SIZE.small:
      return {
        paddingTop: $theme.sizing.scale400,
        paddingBottom: $theme.sizing.scale400,
        paddingLeft: iconShape ? $theme.sizing.scale400 : $theme.sizing.scale500,
        paddingRight: iconShape ? $theme.sizing.scale400 : $theme.sizing.scale500,
      };
    case SIZE.large:
      return {
        paddingTop: $theme.sizing.scale600,
        paddingBottom: $theme.sizing.scale600,
        paddingLeft: iconShape ? $theme.sizing.scale600 : $theme.sizing.scale700,
        paddingRight: iconShape ? $theme.sizing.scale600 : $theme.sizing.scale700,
      };
    default:
      return {
        paddingTop: $theme.sizing.scale550,
        paddingBottom: $theme.sizing.scale550,
        paddingLeft: iconShape ? $theme.sizing.scale550 : $theme.sizing.scale600,
        paddingRight: iconShape ? $theme.sizing.scale550 : $theme.sizing.scale600,
      };
  }
}

type ColorStyles = {
  color?: string;
  backgroundColor?: string;
  ':hover'?: {
    boxShadow?: string;
    backgroundColor?: string;
  };
  ':focus'?: {
    boxShadow?: string;
    backgroundColor?: string;
  };
  ':active'?: {
    boxShadow?: string;
    backgroundColor?: string;
  };
};

function getColorStyles({
  // @ts-ignore
  $theme,
  // @ts-ignore
  $colors,
  // @ts-ignore
  $isLoading,
  // @ts-ignore
  $isSelected,
  // @ts-ignore
  $kind,
  // @ts-ignore
  $disabled,
}): ColorStyles {
  if ($colors) {
    return {
      color: $colors.color,
      backgroundColor: $colors.backgroundColor,
      ':hover': {
        boxShadow: 'inset 999px 999px 0px rgba(0, 0, 0, 0.04)',
      },
      ':active': {
        boxShadow: 'inset 999px 999px 0px rgba(0, 0, 0, 0.08)',
      },
    };
  }

  if ($disabled) {
    return Object.freeze({});
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
        ':active': {
          backgroundColor: $theme.colors.buttonPrimaryActive,
        },
      };
    case KIND.secondary:
      if ($isSelected) {
        return {
          color: $theme.colors.buttonPrimaryText,
          backgroundColor: $theme.colors.buttonPrimaryFill,
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
        ':active': {
          backgroundColor: $theme.colors.buttonTertiaryActive,
        },
      };
    default:
      return Object.freeze({});
  }
}

// @ts-ignore
function getShapeStyles({ $shape, $size }): {
  height?: string;
  width?: string;
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
} {
  if ($shape === SHAPE.circle || $shape === SHAPE.square) {
    let height, width;
    switch ($size) {
      case SIZE.mini:
      case SIZE.xSmall:
        height = '28px';
        width = '28px';
        break;
      case SIZE.compact:
      case SIZE.small:
        height = '36px';
        width = '36px';
        break;
      case SIZE.large:
        height = '56px';
        width = '56px';
        break;
      case SIZE.default:
      case SIZE.medium:
      default:
        height = '48px';
        width = '48px';
        break;
    }
    return {
      height,
      width,
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: 0,
      paddingRight: 0,
    };
  } else {
    return {};
  }
}

export const getArtworkSize = ({ $theme, $size }: { $theme: Theme; $size?: keyof typeof SIZE }) => {
  switch ($size) {
    case SIZE.mini:
    case SIZE.xSmall:
      return $theme.sizing.scale500;
    case SIZE.compact:
    case SIZE.small:
      return $theme.sizing.scale600;
    case SIZE.large:
      return $theme.sizing.scale800;
    case SIZE.default:
    case SIZE.medium:
    default:
      return $theme.sizing.scale700;
  }
};

// @ts-ignore
function getMinHitAreaStyles({ $minHitArea, $size, $shape }) {
  if (!$minHitArea || $minHitArea !== MIN_HIT_AREA.tap) {
    return {};
  }

  return {
    '::before': {
      content: '""',
      position: 'absolute' as const,
      top: '50%',
      left: 0,
      right: 0,
      height: '48px',
      minHeight: '48px',
      transform: 'translateY(-50%)',
    },
    position: 'relative' as const,
  };
}
