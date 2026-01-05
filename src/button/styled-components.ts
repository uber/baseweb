/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type { StyleObject } from 'styletron-standard';
import type { Properties } from 'csstype';
import { styled, type Theme } from '../styles';
import {
  KIND,
  SIZE,
  SHAPE,
  MIN_HIT_AREA,
  WIDTH_TYPE,
  BUTTON_GROUP_EXCLUSIVE_KINDS,
} from './constants';
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
      $backgroundSafe,
      $widthType,
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
      boxSizing: 'border-box', // <button> is default to border-box for most browsers, but <a> is content-box
      boxShadow:
        $isFocusVisible && $backgroundSafe
          ? `inset 0 0 0 2px ${$theme.colors.borderAccent}, ${$theme.lighting.shallowBelow}`
          : $backgroundSafe
          ? `${$theme.lighting.shallowBelow}`
          : $isFocusVisible
          ? `inset 0 0 0 2px ${$theme.colors.borderAccent}`
          : 'none',
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
      ...getDimensionStyles({ $theme, $size, $widthType }),
      ...getFontStyles({ $theme, $size }),
      ...getBorderRadiusStyles({ $theme, $size, $shape }),
      ...getPaddingStyles({ $theme, $size, $shape }),
      ...getDoubleBorderStyles({
        $theme,
        $isLoading,
        $isSelected,
        $kind,
        $disabled,
        $backgroundSafe,
      }),
      ...getColorStyles({
        $theme,
        $colors,
        $kind,
        $isLoading,
        $isSelected,
        $disabled,
        $backgroundSafe,
      }),
      ...getAnchorDisabledStyles({ $as, $theme, $kind, $isSelected, $disabled }),
      ...getShapeStyles({ $shape, $size, $theme }),
      ...getMinHitAreaStyles({ $minHitArea, $theme }),
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

export const StartEnhancerButtonContentContainer = styled<'div', SharedStyleProps>(
  'div',
  ({ $theme }) => {
    return {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexGrow: 1,
    };
  }
);

StartEnhancerButtonContentContainer.displayName = 'StartEnhancerButtonContentContainer';

export const LoadingSpinnerContainer = styled<'div', SharedStyleProps>(
  'div',
  ({ $theme, $size }) => {
    let margins = {};
    // Add a few pixels of margin to match the line-height for non-loading xSmall buttons.
    if ($size === SIZE.mini || $size === SIZE.xSmall) {
      margins = {
        marginBottom: $theme.sizing.scale0,
        marginTop: $theme.sizing.scale0,
      };
    }

    return {
      lineHeight: 0,
      position: 'static' as const,
      ...margins,
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

    let dimension: string;

    switch ($size) {
      case SIZE.mini:
      case SIZE.xSmall:
        dimension = $theme.sizing.scale500;
        break;
      case SIZE.compact:
      case SIZE.small:
        dimension = $theme.sizing.scale600;
        break;
      case SIZE.large:
        dimension = $theme.sizing.scale800;
        break;
      case SIZE.medium:
      case SIZE.default:
      default:
        dimension = $theme.sizing.scale700;
        break;
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
    case KIND.dangerPrimary: {
      return {
        foreground: $theme.colors.buttonDangerPrimarySpinnerForeground,
        background: $theme.colors.buttonDangerPrimarySpinnerBackground,
      };
    }
    case KIND.dangerSecondary: {
      return {
        foreground: $theme.colors.buttonDangerSecondarySpinnerForeground,
        background: $theme.colors.buttonDangerSecondarySpinnerBackground,
      };
    }
    case KIND.dangerTertiary: {
      return {
        foreground: $theme.colors.buttonDangerTertiarySpinnerForeground,
        background: $theme.colors.buttonDangerTertiarySpinnerBackground,
      };
    }
    case BUTTON_GROUP_EXCLUSIVE_KINDS.outline: {
      return {
        foreground: $theme.colors.buttonOutlineSpinnerForeground,
        background: $theme.colors.buttonOutlineSpinnerBackground,
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
function getBorderRadiusStyles({ $theme, $size, $shape }) {
  let value = $theme.borders.buttonBorderRadius;

  if ($shape === SHAPE.pill || $shape === SHAPE.rounded) {
    value = '999px';
  } else if ($shape === SHAPE.circle || $shape === SHAPE.round) {
    value = '50%';
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
      return $theme.typography.LabelXSmall;
    case SIZE.small:
    case SIZE.compact:
      return $theme.typography.LabelSmall;
    case SIZE.large:
      return $theme.typography.LabelLarge;
    default:
      return $theme.typography.LabelMedium;
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
    backgroundColor: $theme.colors.buttonDisabledFill,
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
    case SIZE.medium:
    case SIZE.default:
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
  position?: Properties['position'];
  '::after'?: Record<string, string | number>;
  '@media (hover: hover)'?: {
    ':hover'?: {
      boxShadow?: string;
      backgroundColor?: string;
    };
    ':hover::after'?: {
      boxShadow?: string;
      backgroundColor?: string;
    };
  };
  ':focus'?: {
    boxShadow?: string;
    backgroundColor?: string;
  };
  ':active'?: {
    boxShadow?: string;
    backgroundColor?: string;
  };
  ':active::after'?: {
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
  // @ts-ignore
  $backgroundSafe,
}): ColorStyles {
  if ($disabled) {
    return Object.freeze({});
  }

  const backgroundSafeBoxShadow = $backgroundSafe ? `, ${$theme.lighting.shallowBelow}` : '';

  if ($colors) {
    return {
      color: $colors.color,
      backgroundColor: $colors.backgroundColor,
      // Applies only on devices that support hovering, like desktop computers.
      '@media (hover: hover)': {
        ':hover': {
          boxShadow: `inset 999px 999px 0px rgba(0, 0, 0, 0.04) ${backgroundSafeBoxShadow}`,
        },
      },
      ':active': {
        boxShadow: `inset 999px 999px 0px rgba(0, 0, 0, 0.08) ${backgroundSafeBoxShadow}`,
      },
    };
  }

  switch ($kind) {
    case KIND.primary:
      if ($isSelected) {
        return {
          color: $theme.colors.buttonPrimarySelectedText || $theme.colors.buttonPrimaryText, // provide fallback values in case some projects customized the theme but do not provide the tokens.
          backgroundColor:
            $theme.colors.buttonPrimarySelectedFill || $theme.colors.buttonPrimaryFill,
        };
      }
      if ($isLoading) {
        return {
          backgroundColor:
            $theme.colors.buttonPrimaryLoadingFill || $theme.colors.buttonPrimaryFill,
        };
      }
      return {
        color: $theme.colors.buttonPrimaryText,
        backgroundColor: $theme.colors.buttonPrimaryFill,
        // Applies only on devices that support hovering, like desktop computers.
        '@media (hover: hover)': {
          ':hover': {
            boxShadow: `inset 999px 999px 0px ${$theme.colors.buttonPrimaryHoverOverlay} ${backgroundSafeBoxShadow}`,
          },
        },
        ':active': {
          boxShadow: `inset 999px 999px 0px ${$theme.colors.buttonPrimaryActiveOverlay} ${backgroundSafeBoxShadow}`,
        },
      };
    case KIND.secondary:
      if ($isSelected) {
        return {
          color: $theme.colors.buttonPrimaryText,
          backgroundColor: $theme.colors.buttonPrimaryFill,
        };
      }
      if ($isLoading) {
        return {
          backgroundColor:
            $theme.colors.buttonSecondaryLoadingFill || $theme.colors.buttonSecondaryFill,
        };
      }
      return {
        color: $theme.colors.buttonSecondaryText,
        backgroundColor: $theme.colors.buttonSecondaryFill,
        // Applies only on devices that support hovering, like desktop computers.
        '@media (hover: hover)': {
          ':hover': {
            boxShadow: `inset 999px 999px 0px ${$theme.colors.buttonSecondaryHoverOverlay} ${backgroundSafeBoxShadow}`,
          },
        },
        ':active': {
          boxShadow: `inset 999px 999px 0px ${$theme.colors.buttonSecondaryActiveOverlay} ${backgroundSafeBoxShadow}`,
        },
      };
    case KIND.tertiary:
      if ($isSelected) {
        return {
          color: $theme.colors.buttonTertiarySelectedText || $theme.colors.buttonTertiaryText,
          backgroundColor:
            $theme.colors.buttonTertiarySelectedFill || $theme.colors.buttonTertiaryFill,
        };
      }
      if ($isLoading) {
        return {
          backgroundColor:
            $theme.colors.buttonTertiaryLoadingFill || $theme.colors.buttonTertiaryFill,
        };
      }
      return {
        color: $theme.colors.buttonTertiaryText,
        backgroundColor: $theme.colors.buttonTertiaryFill,
        // Applies only on devices that support hovering, like desktop computers.
        '@media (hover: hover)': {
          ':hover': {
            boxShadow: `inset 999px 999px 0px ${$theme.colors.buttonTertiaryHoverOverlay} ${backgroundSafeBoxShadow}`,
          },
        },
        ':active': {
          boxShadow: `inset 999px 999px 0px ${$theme.colors.buttonTertiaryActiveOverlay} ${backgroundSafeBoxShadow}`,
        },
      };
    // Below are the danger button styles.(newly added, other customized themes system should provide the tokens)
    case KIND.dangerPrimary: {
      if ($isSelected) {
        return {
          color: $theme.colors.buttonDangerPrimarySelectedText,
          backgroundColor: $theme.colors.buttonDangerPrimarySelectedFill,
        };
      }
      if ($isLoading) {
        return {
          backgroundColor: $theme.colors.buttonDangerPrimaryLoadingFill,
        };
      }
      return {
        color: $theme.colors.buttonDangerPrimaryText,
        backgroundColor: $theme.colors.buttonDangerPrimaryFill,
        // Applies only on devices that support hovering, like desktop computers.
        '@media (hover: hover)': {
          ':hover': {
            boxShadow: `inset 999px 999px 0px ${$theme.colors.buttonDangerPrimaryHoverOverlay} ${backgroundSafeBoxShadow}`,
          },
        },
        ':active': {
          boxShadow: `inset 999px 999px 0px ${$theme.colors.buttonDangerPrimaryActiveOverlay} ${backgroundSafeBoxShadow}`,
        },
      };
    }
    case KIND.dangerSecondary: {
      if ($isSelected) {
        return {
          color: $theme.colors.buttonDangerSecondarySelectedText,
          backgroundColor: $theme.colors.buttonDangerSecondarySelectedFill,
        };
      }
      if ($isLoading) {
        return {
          backgroundColor: $theme.colors.buttonDangerSecondaryLoadingFill,
        };
      }
      return {
        color: $theme.colors.buttonDangerSecondaryText,
        backgroundColor: $theme.colors.buttonDangerSecondaryFill,
        // Applies only on devices that support hovering, like desktop computers.
        '@media (hover: hover)': {
          ':hover': {
            boxShadow: `inset 999px 999px 0px ${$theme.colors.buttonDangerSecondaryHoverOverlay} ${backgroundSafeBoxShadow}`,
          },
        },
        ':active': {
          boxShadow: `inset 999px 999px 0px ${$theme.colors.buttonDangerSecondaryActiveOverlay} ${backgroundSafeBoxShadow}`,
        },
      };
    }
    case KIND.dangerTertiary: {
      if ($isSelected) {
        return {
          color: $theme.colors.buttonDangerTertiarySelectedText,
          backgroundColor: $theme.colors.buttonDangerTertiarySelectedFill,
        };
      }
      if ($isLoading) {
        return {
          backgroundColor: $theme.colors.buttonDangerTertiaryLoadingFill,
        };
      }
      return {
        color: $theme.colors.buttonDangerTertiaryText,
        backgroundColor: $theme.colors.buttonDangerTertiaryFill,
        // Applies only on devices that support hovering, like desktop computers.
        '@media (hover: hover)': {
          ':hover': {
            boxShadow: `inset 999px 999px 0px ${$theme.colors.buttonDangerTertiaryHoverOverlay} ${backgroundSafeBoxShadow}`,
          },
        },
        ':active': {
          boxShadow: `inset 999px 999px 0px ${$theme.colors.buttonDangerTertiaryActiveOverlay} ${backgroundSafeBoxShadow}`,
        },
      };
    }
    case BUTTON_GROUP_EXCLUSIVE_KINDS.outline: {
      if ($isSelected) {
        return {
          color: $theme.colors.buttonOutlineSelectedText,
          backgroundColor: $theme.colors.buttonOutlineSelectedFill,
        };
      }
      if ($isLoading) {
        return {
          backgroundColor: $theme.colors.buttonOutlineLoadingFill,
        };
      }
      return {
        color: $theme.colors.buttonOutlineText,
        backgroundColor: $theme.colors.buttonOutlineFill,
        // adding overlay for hovered and pressed state (we previously used inset box shadow to simulate this, but cannot extend to border)
        // This is ideally moved to root level, but putting here is less risky since it's probably ::after element is used or overridden somewhere.
        position: 'relative' as const,
        '::after': {
          content: '""',
          position: 'absolute' as const,
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          borderTopLeftRadius: 'inherit',
          borderTopRightRadius: 'inherit',
          borderBottomRightRadius: 'inherit',
          borderBottomLeftRadius: 'inherit',
          backgroundColor: 'transparent',
          boxShadow: `0 0 0 ${$theme.sizing.scale0} transparent`,
          pointerEvents: 'none',
        },
        // end of overlay
        // Applies only on devices that support hovering, like desktop computers.
        '@media (hover: hover)': {
          ':hover::after': {
            backgroundColor: $theme.colors.buttonOutlineHoverOverlay,
            // this box shadow is used to extend the overlay to the border
            boxShadow: `0 0 0 ${$theme.sizing.scale0} ${$theme.colors.buttonOutlineHoverOverlay} ${backgroundSafeBoxShadow}`,
          },
        },
        ':active::after': {
          backgroundColor: $theme.colors.buttonOutlineActiveOverlay,
          // this box shadow is used to extend the overlay to the border
          boxShadow: `0 0 0 ${$theme.sizing.scale0} ${$theme.colors.buttonOutlineActiveOverlay} ${backgroundSafeBoxShadow}`,
        },
      };
    }
    default:
      return Object.freeze({});
  }
}

function getDoubleBorderStyles({
  // @ts-ignore
  $theme,
  // @ts-ignore
  $isLoading,
  // @ts-ignore
  $isSelected,
  // @ts-ignore
  $kind,
  // @ts-ignore
  $disabled,
  // @ts-ignore
  $backgroundSafe,
}) {
  if ($disabled) {
    return Object.freeze({});
  }

  const backgroundSafeBoxShadow = $backgroundSafe ? `, ${$theme.lighting.shallowBelow}` : '';

  switch ($kind) {
    case KIND.primary:
      return {
        ...($isSelected
          ? {
              boxShadow: `inset 0 0 0 ${$theme.sizing.scale0} ${$theme.colors.buttonInnerBorder}, 0 0 0 ${$theme.sizing.scale0} ${$theme.colors.buttonOuterBorder} ${backgroundSafeBoxShadow}`,
            }
          : {}),
        ':focus-visible': {
          boxShadow: `inset 0 0 0 ${$theme.sizing.scale0} ${$theme.colors.buttonInnerBorder}, 0 0 0 ${$theme.sizing.scale0} ${$theme.colors.buttonFocusOuterBorder} ${backgroundSafeBoxShadow}`,
        },
      };
    case KIND.secondary:
      return {
        ':focus-visible': {
          boxShadow: `inset 0 0 0 ${$theme.sizing.scale0} ${$theme.colors.buttonInnerBorder}, 0 0 0 ${$theme.sizing.scale0} ${$theme.colors.buttonFocusOuterBorder} ${backgroundSafeBoxShadow}`,
        },
      };
    case KIND.tertiary:
      return {
        ...($isSelected
          ? {
              boxShadow: `inset 0 0 0 ${$theme.sizing.scale0} ${$theme.colors.buttonInnerBorder}, 0 0 0 ${$theme.sizing.scale0} ${$theme.colors.buttonOuterBorder} ${backgroundSafeBoxShadow}`,
            }
          : {}),
        ':focus-visible': {
          boxShadow: `inset 0 0 0 ${$theme.sizing.scale0} ${$theme.colors.buttonInnerBorder}, 0 0 0 ${$theme.sizing.scale0} ${$theme.colors.buttonFocusOuterBorder} ${backgroundSafeBoxShadow}`,
        },
      };
    case KIND.dangerPrimary: {
      return {
        ...($isSelected
          ? {
              boxShadow: `inset 0 0 0 ${$theme.sizing.scale0} ${$theme.colors.buttonInnerBorder}, 0 0 0 ${$theme.sizing.scale0} ${$theme.colors.buttonOuterBorder} ${backgroundSafeBoxShadow}`,
            }
          : {}),
        ':focus-visible': {
          boxShadow: `inset 0 0 0 ${$theme.sizing.scale0} ${$theme.colors.buttonInnerBorder}, 0 0 0 ${$theme.sizing.scale0} ${$theme.colors.buttonFocusOuterBorder} ${backgroundSafeBoxShadow}`,
        },
      };
    }
    case KIND.dangerSecondary: {
      return {
        ':focus-visible': {
          boxShadow: `inset 0 0 0 ${$theme.sizing.scale0} ${$theme.colors.buttonInnerBorder}, 0 0 0 ${$theme.sizing.scale0} ${$theme.colors.buttonFocusOuterBorder} ${backgroundSafeBoxShadow}`,
        },
      };
    }
    case KIND.dangerTertiary: {
      return {
        ...($isSelected
          ? {
              boxShadow: `inset 0 0 0 ${$theme.sizing.scale0} ${$theme.colors.buttonTransparentBorder}, 0 0 0 ${$theme.sizing.scale0} ${$theme.colors.buttonDangerTertiaryOuterBorder} ${backgroundSafeBoxShadow}`,
            }
          : {}),
        ':focus-visible': {
          boxShadow: `inset 0 0 0 ${$theme.sizing.scale0} ${$theme.colors.buttonTransparentBorder},  0 0 0 ${$theme.sizing.scale0} ${$theme.colors.buttonFocusOuterBorder} ${backgroundSafeBoxShadow}`,
        },
      };
    }
    case BUTTON_GROUP_EXCLUSIVE_KINDS.outline: {
      return {
        ...($isSelected
          ? {
              boxShadow: `0 0 0 ${$theme.sizing.scale0} ${$theme.colors.buttonOuterBorder}`,
            }
          : {
              boxShadow: `0 0 0 ${$theme.sizing.scale0} ${$theme.colors.buttonOutlineOuterBorder}`,
            }),
        ':focus-visible': {
          boxShadow: `0 0 0 ${$theme.sizing.scale0} ${$theme.colors.buttonFocusOuterBorder}`,
        },
      };
    }
    default:
      return Object.freeze({});
  }
}

// @ts-ignore
function getShapeStyles({ $shape, $size, $theme }): {
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
        height = $theme.sizing.scale850;
        width = $theme.sizing.scale850;
        break;
      case SIZE.compact:
      case SIZE.small:
        height = $theme.sizing.scale950;
        width = $theme.sizing.scale950;
        break;
      case SIZE.large:
        height = $theme.sizing.scale1400;
        width = $theme.sizing.scale1400;
        break;
      case SIZE.default:
      case SIZE.medium:
      default:
        height = $theme.sizing.scale1200;
        width = $theme.sizing.scale1200;
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
function getMinHitAreaStyles({ $minHitArea, $theme }) {
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
      height: $theme.sizing.scale1200,
      minHeight: $theme.sizing.scale1200,
      transform: 'translateY(-50%)',
    },
    position: 'relative' as const,
  };
}

function getDimensionStyles({
  $theme,
  $size,
  $widthType,
}: {
  $theme: Theme;
  $size?: keyof typeof SIZE;
  $widthType?: keyof typeof WIDTH_TYPE;
}) {
  let minWidth, minHeight;

  switch ($size) {
    case SIZE.mini:
    case SIZE.xSmall:
      minHeight = $theme.sizing.scale850;
      minWidth = '52px'; //
      break;
    case SIZE.compact:
    case SIZE.small:
      minHeight = $theme.sizing.scale950;
      minWidth = '60px'; // min-width = min-height + 24px
      break;
    case SIZE.large:
      minHeight = $theme.sizing.scale1400;
      minWidth = '80px'; // min-width = min-height + 24px
      break;
    case SIZE.default:
    case SIZE.medium:
    default:
      minHeight = $theme.sizing.scale1200;
      minWidth = '72px'; // min-width = min-height + 24px
      break;
  }

  return {
    ...($widthType === WIDTH_TYPE.fill ? { minWidth, minHeight, width: '100%' } : {}), // min-width and min-height only apply to "fill" width type
  };
}
