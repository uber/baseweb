/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import darken from 'polished/lib/color/darken.js';
import lighten from 'polished/lib/color/lighten.js';

import {styled} from '../styles/index.js';
import {KIND, VARIANT} from './constants.js';
import type {SharedPropsArgT} from './types.js';

export function customOnRamp(color?: string, unit?: string) {
  switch (unit) {
    case '50':
      return lighten(0.4, color);
    case '100':
      return lighten(0.32, color);
    case '200':
      return lighten(0.2, color);
    case '300':
      return lighten(0.12, color);
    case '500':
      return darken(0.24, color);
    case '600':
      return darken(0.3, color);
    case '700':
      return darken(0.4, color);
    case '400':
    default:
      return color;
  }
}

function fontColor(props, isHovered?: boolean, isActionText?: boolean) {
  if (props.$disabled) {
    switch (props.$kind) {
      case KIND.neutral:
        return props.$theme.colors.tagNeutralFontDisabled;
      case KIND.accent:
        return props.$theme.colors.tagAccentFontDisabled;
      case KIND.positive:
        return props.$theme.colors.tagPositiveFontDisabled;
      case KIND.warning:
        return props.$theme.colors.tagWarningFontDisabled;
      case KIND.negative:
        return props.$theme.colors.tagNegativeFontDisabled;
      case KIND.custom:
        return customOnRamp(
          props.$color,
          props.$theme.colors.tagFontDisabledRampUnit,
        );
      case KIND.primary:
      default:
        return props.$theme.colors.tagPrimaryFontDisabled;
    }
  }

  switch (props.$variant) {
    case VARIANT.solid:
      switch (props.$kind) {
        case KIND.neutral:
          if (!isHovered) return props.$theme.colors.tagNeutralSolidFont;
          return props.$theme.colors.tagNeutralSolidFontHover;
        case KIND.accent:
          if (!isHovered) return props.$theme.colors.tagAccentSolidFont;
          return props.$theme.colors.tagAccentSolidFontHover;
        case KIND.positive:
          if (!isHovered) return props.$theme.colors.tagPositiveSolidFont;
          return props.$theme.colors.tagPositiveSolidFontHover;
        case KIND.warning:
          if (!isHovered) return props.$theme.colors.tagWarningSolidFont;
          return props.$theme.colors.tagWarningSolidFontHover;
        case KIND.negative:
          if (!isHovered) return props.$theme.colors.tagNegativeSolidFont;
          return props.$theme.colors.tagNegativeSolidFontHover;
        case KIND.custom:
          if (!isHovered)
            return customOnRamp(
              props.$color,
              props.$theme.colors.tagSolidFontRampUnit,
            );
          return customOnRamp(
            props.$color,
            props.$theme.colors.tagSolidFontHoverRampUnit,
          );
        case KIND.primary:
        default:
          if (!isHovered) return props.$theme.colors.tagPrimarySolidFont;
          return props.$theme.colors.tagPrimarySolidFontHover;
      }
    case VARIANT.outlined:
      switch (props.$kind) {
        case KIND.neutral:
          if (!isHovered || !isActionText) {
            return props.$theme.colors.tagNeutralOutlinedFont;
          }
          return props.$theme.colors.tagNeutralOutlinedFontHover;
        case KIND.accent:
          if (!isHovered || !isActionText) {
            return props.$theme.colors.tagAccentOutlinedFont;
          }
          return props.$theme.colors.tagAccentOutlinedFontHover;
        case KIND.positive:
          if (!isHovered || !isActionText) {
            return props.$theme.colors.tagPositiveOutlinedFont;
          }
          return props.$theme.colors.tagPositiveOutlinedFontHover;
        case KIND.warning:
          if (!isHovered || !isActionText) {
            return props.$theme.colors.tagWarningOutlinedFont;
          }
          return props.$theme.colors.tagWarningOutlinedFontHover;
        case KIND.negative:
          if (!isHovered || !isActionText) {
            return props.$theme.colors.tagNegativeOutlinedFont;
          }
          return props.$theme.colors.tagNegativeOutlinedFontHover;
        case KIND.custom:
          if (!isHovered || !isActionText) {
            return customOnRamp(
              props.$color,
              props.$theme.colors.tagOutlinedFontRampUnit,
            );
          }
          return customOnRamp(
            props.$color,
            props.$theme.colors.tagOutlinedFontHoverRampUnit,
          );
        case KIND.primary:
        default:
          if (!isHovered || !isActionText) {
            return props.$theme.colors.tagPrimaryOutlinedFont;
          }
          return props.$theme.colors.tagPrimaryOutlinedFontHover;
      }
    case VARIANT.light:
    default:
      switch (props.$kind) {
        case KIND.neutral:
          if (!isHovered) return props.$theme.colors.tagNeutralLightFont;
          return props.$theme.colors.tagNeutralLightFontHover;
        case KIND.accent:
          if (!isHovered) return props.$theme.colors.tagAccentLightFont;
          return props.$theme.colors.tagAccentLightFontHover;
        case KIND.positive:
          if (!isHovered) return props.$theme.colors.tagPositiveLightFont;
          return props.$theme.colors.tagPositiveLightFontHover;
        case KIND.warning:
          if (!isHovered) return props.$theme.colors.tagWarningLightFont;
          return props.$theme.colors.tagWarningLightFontHover;
        case KIND.negative:
          if (!isHovered) return props.$theme.colors.tagNegativeLightFont;
          return props.$theme.colors.tagNegativeLightFontHover;
        case KIND.custom:
          if (!isHovered)
            return customOnRamp(
              props.$color,
              props.$theme.colors.tagLightFontRampUnit,
            );
          return customOnRamp(
            props.$color,
            props.$theme.colors.tagLightFontHoverRampUnit,
          );
        case KIND.primary:
        default:
          if (!isHovered) return props.$theme.colors.tagPrimaryLightFont;
          return props.$theme.colors.tagPrimaryLightFontHover;
      }
  }
}

// $FlowFixMe https://github.com/facebook/flow/issues/7745
export const Action = styled<SharedPropsArgT>('span', props => {
  const {$disabled, $variant, $theme} = props;

  function backgroundColor(isHovered?: boolean, isActive?: boolean) {
    if (props.$disabled || !isHovered) return 'transparent';
    switch (props.$variant) {
      case VARIANT.solid:
        switch (props.$kind) {
          case KIND.neutral:
            return props.$theme.colors.tagNeutralSolidActive;
          case KIND.accent:
            return props.$theme.colors.tagAccentSolidActive;
          case KIND.positive:
            return props.$theme.colors.tagPositiveSolidActive;
          case KIND.warning:
            return props.$theme.colors.tagWarningSolidActive;
          case KIND.negative:
            return props.$theme.colors.tagNegativeSolidActive;
          case KIND.custom:
            return customOnRamp(
              props.$color,
              props.$theme.colors.tagSolidActiveRampUnit,
            );
          case KIND.primary:
          default:
            return props.$theme.colors.tagPrimarySolidActive;
        }
      case VARIANT.outlined:
        switch (props.$kind) {
          case KIND.neutral:
            if (!isActive) return props.$theme.colors.tagNeutralOutlinedHover;
            return props.$theme.colors.tagNeutralOutlinedActive;
          case KIND.accent:
            if (!isActive) return props.$theme.colors.tagAccentOutlinedHover;
            return props.$theme.colors.tagAccentOutlinedActive;
          case KIND.positive:
            if (!isActive) return props.$theme.colors.tagPositiveOutlinedHover;
            return props.$theme.colors.tagPositiveOutlinedActive;
          case KIND.warning:
            if (!isActive) return props.$theme.colors.tagWarningOutlinedHover;
            return props.$theme.colors.tagWarningOutlinedActive;
          case KIND.negative:
            if (!isActive) return props.$theme.colors.tagNegativeOutlinedHover;
            return props.$theme.colors.tagNegativeOutlinedActive;
          case KIND.custom:
            if (!isActive)
              return customOnRamp(
                props.$color,
                props.$theme.colors.tagOutlinedHoverRampUnit,
              );
            return customOnRamp(
              props.$color,
              props.$theme.colors.tagOutlinedActiveRampUnit,
            );
          case KIND.primary:
          default:
            if (!isActive) return props.$theme.colors.tagPrimaryOutlinedHover;
            return props.$theme.colors.tagPrimaryOutlinedActive;
        }
      case VARIANT.light:
      default:
        switch (props.$kind) {
          case KIND.neutral:
            return props.$theme.colors.tagNeutralLightActive;
          case KIND.accent:
            return props.$theme.colors.tagAccentLightActive;
          case KIND.positive:
            return props.$theme.colors.tagPositiveLightActive;
          case KIND.warning:
            return props.$theme.colors.tagWarningLightActive;
          case KIND.negative:
            return props.$theme.colors.tagNegativeLightActive;
          case KIND.custom:
            return customOnRamp(
              props.$color,
              props.$theme.colors.tagLightActiveRampUnit,
            );
          case KIND.primary:
          default:
            return props.$theme.colors.tagPrimaryLightActive;
        }
    }
  }

  return ({
    alignItems: 'center',
    [$theme.direction === 'rtl'
      ? 'borderBottomLeftRadius'
      : 'borderBottomRightRadius']: $theme.borders.useRoundedCorners
      ? $theme.borders.radius400
      : 0,
    [$theme.direction === 'rtl'
      ? 'borderTopLeftRadius'
      : 'borderTopRightRadius']: $theme.borders.useRoundedCorners
      ? $theme.borders.radius400
      : 0,
    cursor: $disabled ? 'not-allowed' : 'pointer',
    display: 'flex',
    [$theme.direction === 'rtl' ? 'marginRight' : 'marginLeft']: '8px',
    outline: 'none',
    paddingTop: $variant === VARIANT.outlined ? '5px' : '7px',
    paddingBottom: $variant === VARIANT.outlined ? '5px' : '7px',
    paddingLeft: '8px',
    paddingRight: '8px',
    transitionProperty: 'all',
    transitionDuration: $theme.animation.timing100,
    transitionTimingFunction: $theme.animation.easeOutCurve,
    ':hover': {
      backgroundColor: backgroundColor(true, false),
      color: fontColor(props, true, true),
    },
    ':focus': {
      backgroundColor: backgroundColor(true, false),
      color: fontColor(props, true, true),
    },
  }: {});
});

export const ActionIcon = styled('svg', {});

// $FlowFixMe https://github.com/facebook/flow/issues/7745
export const Text = styled<SharedPropsArgT>('span', props => {
  return {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    maxWidth: props.$theme.sizing.scale3200,
  };
});

// $FlowFixMe https://github.com/facebook/flow/issues/7745
export const Root = styled<SharedPropsArgT>('span', props => {
  const {$disabled, $theme, $closeable, $clickable, $kind, $variant} = props;
  const {
    sizing: {scale0, scale800, scale500},
    typography: {font150},
  } = $theme;

  function backgroundColor(isHovered?: boolean, isActive?: boolean) {
    if (props.$variant === VARIANT.outlined) {
      return 'transparent';
    }

    switch ($variant) {
      case VARIANT.solid:
        switch ($kind) {
          case KIND.neutral:
            if ($disabled) {
              return props.$theme.colors.tagNeutralSolidDisabled;
            }
            if (isActive) {
              return props.$theme.colors.tagNeutralSolidActive;
            }
            if (isHovered) {
              return props.$theme.colors.tagNeutralSolidHover;
            }
            return props.$theme.colors.tagNeutralSolidBackground;
          case KIND.accent:
            if ($disabled) {
              return props.$theme.colors.tagAccentSolidDisabled;
            }
            if (isActive) {
              return props.$theme.colors.tagAccentSolidActive;
            }
            if (isHovered) {
              return props.$theme.colors.tagAccentSolidHover;
            }
            return props.$theme.colors.tagAccentSolidBackground;
          case KIND.positive:
            if ($disabled) {
              return props.$theme.colors.tagPositiveSolidDisabled;
            }
            if (isActive) {
              return props.$theme.colors.tagPositiveSolidActive;
            }
            if (isHovered) {
              return props.$theme.colors.tagPositiveSolidHover;
            }
            return props.$theme.colors.tagPositiveSolidBackground;
          case KIND.warning:
            if ($disabled) {
              return props.$theme.colors.tagWarningSolidDisabled;
            }
            if (isActive) {
              return props.$theme.colors.tagWarningSolidActive;
            }
            if (isHovered) {
              return props.$theme.colors.tagWarningSolidHover;
            }
            return props.$theme.colors.tagWarningSolidBackground;
          case KIND.negative:
            if ($disabled) {
              return props.$theme.colors.tagNegativeSolidDisabled;
            }
            if (isActive) {
              return props.$theme.colors.tagNegativeSolidActive;
            }
            if (isHovered) {
              return props.$theme.colors.tagNegativeSolidHover;
            }
            return props.$theme.colors.tagNegativeSolidBackground;
          case KIND.custom:
            if ($disabled) {
              return customOnRamp(
                props.$color,
                props.$theme.colors.tagSolidDisabledRampUnit,
              );
            }
            if (isActive) {
              return customOnRamp(
                props.$color,
                props.$theme.colors.tagSolidActiveRampUnit,
              );
            }
            if (isHovered) {
              return customOnRamp(
                props.$color,
                props.$theme.colors.tagSolidHoverRampUnit,
              );
            }
            return customOnRamp(
              props.$color,
              props.$theme.colors.tagSolidRampUnit,
            );

          case KIND.primary:
          default:
            if ($disabled) {
              return props.$theme.colors.tagPrimarySolidDisabled;
            }
            if (isActive) {
              return props.$theme.colors.tagPrimarySolidActive;
            }
            if (isHovered) {
              return props.$theme.colors.tagPrimarySolidHover;
            }
            return props.$theme.colors.tagPrimarySolidBackground;
        }
      case VARIANT.light:
      default:
        switch ($kind) {
          case KIND.neutral:
            if ($disabled) {
              return props.$theme.colors.tagNeutralLightDisabled;
            }
            if (isActive) {
              return props.$theme.colors.tagNeutralLightActive;
            }
            if (isHovered) {
              return props.$theme.colors.tagNeutralLightHover;
            }
            return props.$theme.colors.tagNeutralLightBackground;
          case KIND.accent:
            if ($disabled) {
              return props.$theme.colors.tagAccentLightDisabled;
            }
            if (isActive) {
              return props.$theme.colors.tagAccentLightActive;
            }
            if (isHovered) {
              return props.$theme.colors.tagAccentLightHover;
            }
            return props.$theme.colors.tagAccentLightBackground;
          case KIND.positive:
            if ($disabled) {
              return props.$theme.colors.tagPositiveLightDisabled;
            }
            if (isActive) {
              return props.$theme.colors.tagPositiveLightActive;
            }
            if (isHovered) {
              return props.$theme.colors.tagPositiveLightHover;
            }
            return props.$theme.colors.tagPositiveLightBackground;
          case KIND.warning:
            if ($disabled) {
              return props.$theme.colors.tagWarningLightDisabled;
            }
            if (isActive) {
              return props.$theme.colors.tagWarningLightActive;
            }
            if (isHovered) {
              return props.$theme.colors.tagWarningLightHover;
            }
            return props.$theme.colors.tagWarningLightBackground;
          case KIND.negative:
            if ($disabled) {
              return props.$theme.colors.tagNegativeLightDisabled;
            }
            if (isActive) {
              return props.$theme.colors.tagNegativeLightActive;
            }
            if (isHovered) {
              return props.$theme.colors.tagNegativeLightHover;
            }
            return props.$theme.colors.tagNegativeLightBackground;
          case KIND.custom:
            if ($disabled) {
              return customOnRamp(
                props.$color,
                props.$theme.colors.tagLightRampUnit,
              );
            }
            if (isActive) {
              return customOnRamp(
                props.$color,
                props.$theme.colors.tagLightActiveRampUnit,
              );
            }
            if (isHovered) {
              return customOnRamp(
                props.$color,
                props.$theme.colors.tagLightHoverRampUnit,
              );
            }
            return customOnRamp(
              props.$color,
              props.$theme.colors.tagLightRampUnit,
            );
          case KIND.primary:
          default:
            if ($disabled) {
              return props.$theme.colors.tagPrimaryLightDisabled;
            }
            if (isActive) {
              return props.$theme.colors.tagPrimaryLightActive;
            }
            if (isHovered) {
              return props.$theme.colors.tagPrimaryLightHover;
            }
            return props.$theme.colors.tagPrimaryLightBackground;
        }
    }
  }

  function borderColor(isHovered?: boolean, isActive?: boolean) {
    if (props.$variant !== VARIANT.outlined) {
      return null;
    }

    switch (props.$kind) {
      case KIND.neutral:
        if ($disabled) {
          return props.$theme.colors.tagNeutralOutlinedDisabled;
        }
        if (isActive) {
          return props.$theme.colors.tagNeutralOutlinedActive;
        }
        if (isHovered) {
          return props.$theme.colors.tagNeutralOutlinedHover;
        }
        return props.$theme.colors.tagNeutralOutlinedBackground;
      case KIND.accent:
        if ($disabled) {
          return props.$theme.colors.tagAccentOutlinedDisabled;
        }
        if (isActive) {
          return props.$theme.colors.tagAccentOutlinedActive;
        }
        if (isHovered) {
          return props.$theme.colors.tagAccentOutlinedHover;
        }
        return props.$theme.colors.tagAccentOutlinedBackground;
      case KIND.positive:
        if ($disabled) {
          return props.$theme.colors.tagPositiveOutlinedDisabled;
        }
        if (isActive) {
          return props.$theme.colors.tagPositiveOutlinedActive;
        }
        if (isHovered) {
          return props.$theme.colors.tagPositiveOutlinedHover;
        }
        return props.$theme.colors.tagPositiveOutlinedBackground;
      case KIND.warning:
        if ($disabled) {
          return props.$theme.colors.tagWarningOutlinedDisabled;
        }
        if (isActive) {
          return props.$theme.colors.tagWarningOutlinedActive;
        }
        if (isHovered) {
          return props.$theme.colors.tagWarningOutlinedHover;
        }
        return props.$theme.colors.tagWarningOutlinedBackground;
      case KIND.negative:
        if ($disabled) {
          return props.$theme.colors.tagNegativeOutlinedDisabled;
        }
        if (isActive) {
          return props.$theme.colors.tagNegativeOutlinedActive;
        }
        if (isHovered) {
          return props.$theme.colors.tagNegativeOutlinedHover;
        }
        return props.$theme.colors.tagNegativeOutlinedBackground;
      case KIND.custom:
        if ($disabled) {
          return customOnRamp(
            props.$color,
            props.$theme.colors.tagOutlinedRampUnit,
          );
        }
        if (isActive) {
          return customOnRamp(
            props.$color,
            props.$theme.colors.tagOutlinedActiveRampUnit,
          );
        }
        if (isHovered) {
          return customOnRamp(
            props.$color,
            props.$theme.colors.tagOutlinedHoverRampUnit,
          );
        }
        return customOnRamp(
          props.$color,
          props.$theme.colors.tagOutlinedRampUnit,
        );

      case KIND.primary:
      default:
        if ($disabled) {
          return props.$theme.colors.tagPrimaryOutlinedDisabled;
        }
        if (isActive) {
          return props.$theme.colors.tagPrimaryOutlinedActive;
        }
        if (isHovered) {
          return props.$theme.colors.tagPrimaryOutlinedHover;
        }
        return props.$theme.colors.tagPrimaryOutlinedBackground;
    }
  }

  const borderRadius = $theme.borders.useRoundedCorners
    ? $theme.borders.radius400
    : 0;

  return ({
    ...font150,
    alignItems: 'center',
    backgroundColor: backgroundColor(false, false),
    borderColor: borderColor(false, false),
    borderStyle: 'solid',
    borderWidth: $variant === VARIANT.outlined ? '2px' : 0,
    borderTopLeftRadius: borderRadius,
    borderTopRightRadius: borderRadius,
    borderBottomRightRadius: borderRadius,
    borderBottomLeftRadius: borderRadius,
    boxSizing: 'border-box',
    color: fontColor(props, false, false),
    cursor: $disabled ? 'not-allowed' : $clickable ? 'pointer' : 'default',
    display: 'inline-flex',
    height: scale800,
    justifyContent: 'space-between',
    marginTop: '5px',
    marginBottom: '5px',
    marginLeft: '5px',
    marginRight: '5px',
    paddingTop: scale0,
    paddingBottom: scale0,
    [$theme.direction === 'rtl' ? 'paddingRight' : 'paddingLeft']: scale500,
    [$theme.direction === 'rtl' ? 'paddingLeft' : 'paddingRight']: $closeable
      ? null
      : scale500,
    outline: 'none',
    ':hover':
      $disabled || !$clickable
        ? {}
        : {
            backgroundColor: backgroundColor(true, false),
            borderColor: borderColor(true, false),
            color: fontColor(props, true, false),
          },
    ':focus':
      $disabled || !$clickable
        ? {}
        : {
            backgroundColor: backgroundColor(true, true),
            borderColor: borderColor(true, true),
            color: fontColor(props, true, false),
          },
  }: {});
});
