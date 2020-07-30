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

function getFontColor(params) {
  const {props, isHovered = false, isActionText = false} = params;
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

function getActionBackgroundColor(params) {
  const {props, isHovered = false} = params;
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
          return props.$theme.colors.tagNeutralOutlinedHover;
        case KIND.accent:
          return props.$theme.colors.tagAccentOutlinedHover;
        case KIND.positive:
          return props.$theme.colors.tagPositiveOutlinedHover;
        case KIND.warning:
          return props.$theme.colors.tagWarningOutlinedHover;
        case KIND.negative:
          return props.$theme.colors.tagNegativeOutlinedHover;
        case KIND.custom:
          return customOnRamp(
            props.$color,
            props.$theme.colors.tagOutlinedHoverRampUnit,
          );
        case KIND.primary:
        default:
          return props.$theme.colors.tagPrimaryOutlinedHover;
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

// $FlowFixMe https://github.com/facebook/flow/issues/7745
export const Action = styled<SharedPropsArgT>('span', props => {
  const bottomRadiusDir: string =
    props.$theme.direction === 'rtl'
      ? 'borderBottomLeftRadius'
      : 'borderBottomRightRadius';
  const topRadiusDir: string =
    props.$theme.direction === 'rtl'
      ? 'borderTopLeftRadius'
      : 'borderTopRightRadius';
  const marginDir: string =
    props.$theme.direction === 'rtl' ? 'marginRight' : 'marginLeft';
  return ({
    alignItems: 'center',
    [bottomRadiusDir]: props.$theme.borders.useRoundedCorners
      ? props.$theme.borders.radius400
      : 0,
    [topRadiusDir]: props.$theme.borders.useRoundedCorners
      ? props.$theme.borders.radius400
      : 0,
    cursor: props.$disabled ? 'not-allowed' : 'pointer',
    display: 'flex',
    [marginDir]: '8px',
    outline: 'none',
    paddingTop: props.$variant === VARIANT.outlined ? '5px' : '7px',
    paddingBottom: props.$variant === VARIANT.outlined ? '5px' : '7px',
    paddingLeft: '8px',
    paddingRight: '8px',
    transitionProperty: 'all',
    transitionDuration: 'background-color',
    transitionTimingFunction: props.$theme.animation.easeOutCurve,
    ':hover': {
      backgroundColor: getActionBackgroundColor({props, isHovered: true}),
      color: getFontColor({props, isHovered: true, isActionText: true}),
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

function getRootBackgroundColor(params) {
  const {props, isHovered = false} = params;
  const isPrimitiveKind = [
    'black',
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'purple',
    'brown',
  ].includes(props.$kind);
  if (isPrimitiveKind) {
    // TODO: IMPLEMENT
    return 'transparent';
  } else {
    // Older semantic kind variations... to be removed in a future major.
    if (props.$variant === VARIANT.outlined) {
      return 'transparent';
    }
    switch (props.$variant) {
      case VARIANT.solid:
        switch (props.$kind) {
          case KIND.neutral:
            if (props.$disabled) {
              return props.$theme.colors.tagNeutralSolidDisabled;
            }
            if (isHovered) {
              return props.$theme.colors.tagNeutralSolidHover;
            }
            return props.$theme.colors.tagNeutralSolidBackground;
          case KIND.accent:
            if (props.$disabled) {
              return props.$theme.colors.tagAccentSolidDisabled;
            }
            if (isHovered) {
              return props.$theme.colors.tagAccentSolidHover;
            }
            return props.$theme.colors.tagAccentSolidBackground;
          case KIND.positive:
            if (props.$disabled) {
              return props.$theme.colors.tagPositiveSolidDisabled;
            }
            if (isHovered) {
              return props.$theme.colors.tagPositiveSolidHover;
            }
            return props.$theme.colors.tagPositiveSolidBackground;
          case KIND.warning:
            if (props.$disabled) {
              return props.$theme.colors.tagWarningSolidDisabled;
            }
            if (isHovered) {
              return props.$theme.colors.tagWarningSolidHover;
            }
            return props.$theme.colors.tagWarningSolidBackground;
          case KIND.negative:
            if (props.$disabled) {
              return props.$theme.colors.tagNegativeSolidDisabled;
            }
            if (isHovered) {
              return props.$theme.colors.tagNegativeSolidHover;
            }
            return props.$theme.colors.tagNegativeSolidBackground;
          case KIND.custom:
            if (props.$disabled) {
              return customOnRamp(
                props.$color,
                props.$theme.colors.tagSolidDisabledRampUnit,
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
            if (props.$disabled) {
              return props.$theme.colors.tagPrimarySolidDisabled;
            }
            if (isHovered) {
              return props.$theme.colors.tagPrimarySolidHover;
            }
            return props.$theme.colors.tagPrimarySolidBackground;
        }
      case VARIANT.light:
      default:
        switch (props.$kind) {
          case KIND.neutral:
            if (props.$disabled) {
              return props.$theme.colors.tagNeutralLightDisabled;
            }
            if (isHovered) {
              return props.$theme.colors.tagNeutralLightHover;
            }
            return props.$theme.colors.tagNeutralLightBackground;
          case KIND.accent:
            if (props.$disabled) {
              return props.$theme.colors.tagAccentLightDisabled;
            }
            if (isHovered) {
              return props.$theme.colors.tagAccentLightHover;
            }
            return props.$theme.colors.tagAccentLightBackground;
          case KIND.positive:
            if (props.$disabled) {
              return props.$theme.colors.tagPositiveLightDisabled;
            }
            if (isHovered) {
              return props.$theme.colors.tagPositiveLightHover;
            }
            return props.$theme.colors.tagPositiveLightBackground;
          case KIND.warning:
            if (props.$disabled) {
              return props.$theme.colors.tagWarningLightDisabled;
            }
            if (isHovered) {
              return props.$theme.colors.tagWarningLightHover;
            }
            return props.$theme.colors.tagWarningLightBackground;
          case KIND.negative:
            if (props.$disabled) {
              return props.$theme.colors.tagNegativeLightDisabled;
            }
            if (isHovered) {
              return props.$theme.colors.tagNegativeLightHover;
            }
            return props.$theme.colors.tagNegativeLightBackground;
          case KIND.custom:
            if (props.$disabled) {
              return customOnRamp(
                props.$color,
                props.$theme.colors.tagLightRampUnit,
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
            if (props.$disabled) {
              return props.$theme.colors.tagPrimaryLightDisabled;
            }
            if (isHovered) {
              return props.$theme.colors.tagPrimaryLightHover;
            }
            return props.$theme.colors.tagPrimaryLightBackground;
        }
    }
  }
}

function getRootBorderColor(params) {
  const {props, isHovered = false} = params;
  if (props.$variant !== VARIANT.outlined) {
    return null;
  }
  switch (props.$kind) {
    case KIND.neutral:
      if (props.$disabled) {
        return props.$theme.colors.tagNeutralOutlinedDisabled;
      }
      if (isHovered) {
        return props.$theme.colors.tagNeutralOutlinedHover;
      }
      return props.$theme.colors.tagNeutralOutlinedBackground;
    case KIND.accent:
      if (props.$disabled) {
        return props.$theme.colors.tagAccentOutlinedDisabled;
      }
      if (isHovered) {
        return props.$theme.colors.tagAccentOutlinedHover;
      }
      return props.$theme.colors.tagAccentOutlinedBackground;
    case KIND.positive:
      if (props.$disabled) {
        return props.$theme.colors.tagPositiveOutlinedDisabled;
      }
      if (isHovered) {
        return props.$theme.colors.tagPositiveOutlinedHover;
      }
      return props.$theme.colors.tagPositiveOutlinedBackground;
    case KIND.warning:
      if (props.$disabled) {
        return props.$theme.colors.tagWarningOutlinedDisabled;
      }
      if (isHovered) {
        return props.$theme.colors.tagWarningOutlinedHover;
      }
      return props.$theme.colors.tagWarningOutlinedBackground;
    case KIND.negative:
      if (props.$disabled) {
        return props.$theme.colors.tagNegativeOutlinedDisabled;
      }
      if (isHovered) {
        return props.$theme.colors.tagNegativeOutlinedHover;
      }
      return props.$theme.colors.tagNegativeOutlinedBackground;
    case KIND.custom:
      if (props.$disabled) {
        return customOnRamp(
          props.$color,
          props.$theme.colors.tagOutlinedRampUnit,
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
      if (props.$disabled) {
        return props.$theme.colors.tagPrimaryOutlinedDisabled;
      }
      if (isHovered) {
        return props.$theme.colors.tagPrimaryOutlinedHover;
      }
      return props.$theme.colors.tagPrimaryOutlinedBackground;
  }
}

// $FlowFixMe https://github.com/facebook/flow/issues/7745
export const Root = styled<SharedPropsArgT>('span', props => {
  const borderRadius = props.$theme.borders.useRoundedCorners
    ? props.$theme.borders.radius400
    : 0;
  const paddingStartDir: string =
    props.$theme.direction === 'rtl' ? 'paddingRight' : 'paddingLeft';
  const paddingEndDir: string =
    props.$theme.direction === 'rtl' ? 'paddingLeft' : 'paddingRight';
  const borderWidth = props.$variant === VARIANT.outlined ? '2px' : 0;
  const borderColor = getRootBorderColor({props});
  const borderColorHover = getRootBorderColor({props, isHovered: true});
  return ({
    ...props.$theme.typography.font150,
    alignItems: 'center',
    backgroundColor: getRootBackgroundColor({props}),
    borderLeftColor: borderColor,
    borderRightColor: borderColor,
    borderTopColor: borderColor,
    borderBottomColor: borderColor,
    borderLeftStyle: 'solid',
    borderRightStyle: 'solid',
    borderTopStyle: 'solid',
    borderBottomStyle: 'solid',
    borderLeftWidth: borderWidth,
    borderRightWidth: borderWidth,
    borderTopWidth: borderWidth,
    borderBottomWidth: borderWidth,
    borderTopLeftRadius: borderRadius,
    borderTopRightRadius: borderRadius,
    borderBottomRightRadius: borderRadius,
    borderBottomLeftRadius: borderRadius,
    boxSizing: 'border-box',
    color: getFontColor({props}),
    cursor: props.$disabled
      ? 'not-allowed'
      : props.$clickable
      ? 'pointer'
      : 'default',
    display: 'inline-flex',
    height: props.$theme.sizing.scale800,
    justifyContent: 'space-between',
    marginTop: '5px',
    marginBottom: '5px',
    marginLeft: '5px',
    marginRight: '5px',
    paddingTop: props.$theme.sizing.scale0,
    paddingBottom: props.$theme.sizing.scale0,
    [paddingStartDir]: props.$theme.sizing.scale500,
    [paddingEndDir]: props.$closeable ? null : props.$theme.sizing.scale500,
    outline: 'none',
    ':hover':
      props.$disabled || !props.$clickable
        ? {}
        : {
            backgroundColor: getRootBackgroundColor({props, isHovered: true}),
            borderLeftColor: borderColorHover,
            borderRightColor: borderColorHover,
            borderTopColor: borderColorHover,
            borderBottomColor: borderColorHover,
            color: getFontColor({props, isHovered: true}),
          },
    ':focus':
      props.$disabled || (!props.$clickable && !props.$closeable)
        ? {}
        : {
            boxShadow: props.$isFocusVisible
              ? `0 0 0 3px ${
                  props.$kind === KIND.accent
                    ? props.$theme.colors.primaryA
                    : props.$theme.colors.accent
                }`
              : 'none',
          },
  }: {});
});
