/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {styled} from '../styles/index.js';
import type {SharedStylePropsT} from './types.js';

/**
 * Main component container element
 */
export const StyledRoot = styled<SharedStylePropsT>('div', props => {
  const {
    $theme: {typography, colors, borders},
  } = props;
  return {
    ...typography.font200,
    color: colors.calendarForeground,
    backgroundColor: colors.calendarBackground,
    textAlign: 'center',
    borderTopLeftRadius: borders.surfaceBorderRadius,
    borderTopRightRadius: borders.surfaceBorderRadius,
    borderBottomRightRadius: borders.surfaceBorderRadius,
    borderBottomLeftRadius: borders.surfaceBorderRadius,
    display: 'inline-block',
  };
});

export const StyledMonthContainer = styled('div', {display: 'flex'});

export const StyledCalendarContainer = styled<SharedStylePropsT>(
  'div',
  props => {
    const {
      $theme: {sizing},
    } = props;
    return {
      paddingTop: sizing.scale400,
      paddingBottom: sizing.scale500,
      paddingLeft: sizing.scale600,
      paddingRight: sizing.scale600,
    };
  },
);

export const StyledSelectorContainer = styled<SharedStylePropsT>(
  'div',
  ({$theme}) => {
    return {
      marginBottom: $theme.sizing.scale600,
      paddingLeft: $theme.sizing.scale600,
      paddingRight: $theme.sizing.scale600,
      textAlign: $theme.direction === 'rtl' ? 'right' : 'left',
    };
  },
);

export const StyledCalendarHeader = styled<SharedStylePropsT>('div', props => {
  const {
    $theme: {borders, colors, sizing},
  } = props;
  return {
    color: colors.calendarHeaderForeground,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: sizing.scale500,
    paddingBottom: sizing.scale500,
    paddingLeft: sizing.scale600,
    paddingRight: sizing.scale600,
    backgroundColor: colors.calendarHeaderBackground,
    borderTopLeftRadius: borders.surfaceBorderRadius,
    borderTopRightRadius: borders.surfaceBorderRadius,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  };
});

export const StyledMonthHeader = styled<SharedStylePropsT>('div', props => {
  return {
    color: props.$theme.colors.calendarHeaderForeground,
    backgroundColor: props.$theme.colors.calendarHeaderBackground,
    whiteSpace: 'nowrap',
  };
});

export const StyledMonthYearSelectButton = styled<{}>('button', props => {
  return {
    ...props.$theme.typography.font200,
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 0,
    color: props.$theme.colors.calendarHeaderForeground,
    cursor: 'pointer',
    display: 'flex',
    ':focus': {
      backgroundColor: props.$theme.colors.calendarHeaderBackgroundActive,
    },
  };
});

export const StyledMonthYearSelectIconContainer = styled<{}>('span', props => {
  return {
    alignItems: 'center',
    display: 'flex',
    [props.$theme.direction === 'rtl' ? 'marginRight' : 'marginLeft']: props
      .$theme.sizing.scale500,
  };
});

function getArrowBtnStyle({$theme, $disabled}) {
  return {
    boxSizing: 'border-box',
    color: $disabled
      ? $theme.colors.calendarHeaderForegroundDisabled
      : $theme.colors.calendarHeaderForeground,
    cursor: $disabled ? 'default' : 'pointer',
    backgroundColor: 'transparent',
    borderWidth: 0,
    paddingTop: '0',
    paddingBottom: '0',
    paddingLeft: '0',
    paddingRight: '0',
    marginLeft: '6px',
    marginRight: '6px',
    outline: 'none',
    ':focus': $disabled
      ? {}
      : {
          backgroundColor: $theme.colors.calendarHeaderBackgroundActive,
          borderTopLeftRadius: $theme.borders.surfaceBorderRadius,
          borderTopRightRadius: $theme.borders.surfaceBorderRadius,
          borderBottomRightRadius: $theme.borders.surfaceBorderRadius,
          borderBottomLeftRadius: $theme.borders.surfaceBorderRadius,
        },
  };
}

export const StyledPrevButton = styled<SharedStylePropsT>(
  'button',
  getArrowBtnStyle,
);

export const StyledNextButton = styled<SharedStylePropsT>(
  'button',
  getArrowBtnStyle,
);

export const StyledMonth = styled<SharedStylePropsT>(
  'div',
  (props: SharedStylePropsT) => {
    return {
      display: 'inline-block',
    };
  },
);

export const StyledWeek = styled<SharedStylePropsT>('div', props => {
  const {
    $theme: {sizing},
  } = props;
  return {
    whiteSpace: 'nowrap',
    display: 'flex',
    marginBottom: sizing.scale100,
  };
});

type BorderRadiusT = {
  borderTopLeftRadius: string | number,
  borderBottomLeftRadius: string | number,
  borderTopRightRadius: string | number,
  borderBottomRightRadius: string | number,
};

function getBorderRadius(left, right): BorderRadiusT {
  return {
    borderTopLeftRadius: left,
    borderBottomLeftRadius: left,
    borderTopRightRadius: right,
    borderBottomRightRadius: right,
  };
}

function calculateBorderRadius(props): ?BorderRadiusT {
  const {
    $isHighlighted,
    $pseudoHighlighted,
    $pseudoSelected,
    $selected,
    $startDate,
    $range,
    $hasRangeHighlighted,
    $hasRangeOnRight,
    $hasRangeSelected,
    $theme: {borders},
  } = props;
  if (borders.useRoundedCorners) {
    if ($selected) {
      if (!$range) {
        return getBorderRadius(borders.radius200, borders.radius200);
      } else {
        if ($hasRangeSelected) {
          return $startDate
            ? getBorderRadius(borders.radius200, 0)
            : getBorderRadius(0, borders.radius200);
        } else {
          if ($hasRangeHighlighted) {
            return $hasRangeOnRight
              ? getBorderRadius(borders.radius200, 0)
              : getBorderRadius(0, borders.radius200);
          } else {
            return getBorderRadius(borders.radius200, borders.radius200);
          }
        }
      }
    } else {
      if (!$isHighlighted && ($pseudoHighlighted || $pseudoSelected)) {
        return getBorderRadius(0, 0);
      } else {
        if ($isHighlighted) {
          if (!$range) {
            return getBorderRadius(borders.radius200, borders.radius200);
          } else if ($hasRangeHighlighted) {
            return $hasRangeOnRight
              ? getBorderRadius(0, borders.radius200)
              : getBorderRadius(borders.radius200, 0);
          } else {
            return $pseudoSelected
              ? getBorderRadius(0, 0)
              : getBorderRadius(borders.radius200, borders.radius200);
          }
        } else {
          return !$pseudoSelected
            ? getBorderRadius(borders.radius200, borders.radius200)
            : null;
        }
      }
    }
  } else {
    return getBorderRadius(0, 0);
  }
}

const getDayColors = (
  colors,
  {
    $disabled,
    $isHovered,
    $selected,
    $pseudoSelected,
    $pseudoHighlighted,
    $isHighlighted,
    $outsideMonth,
  },
) => {
  if ($selected) {
    return $isHighlighted
      ? {
          color: colors.calendarDayForegroundSelectedHighlighted,
          backgroundColor: colors.calendarDayBackgroundSelectedHighlighted,
        }
      : {
          color: colors.calendarDayForegroundSelected,
          backgroundColor: colors.calendarDayBackgroundSelected,
        };
  } else {
    if ($outsideMonth || $disabled) {
      return {
        color: colors.calendarForegroundDisabled,
        backgroundColor: 'transparent',
      };
    } else {
      if ($pseudoSelected) {
        return $isHighlighted
          ? {
              color: colors.calendarDayForegroundPseudoSelectedHighlighted,
              backgroundColor:
                colors.calendarDayBackgroundPseudoSelectedHighlighted,
            }
          : {
              color: colors.calendarDayForegroundPseudoSelected,
              backgroundColor: colors.calendarDayBackgroundPseudoSelected,
            };
      } else {
        return $isHovered || $isHighlighted || $pseudoHighlighted
          ? {
              color: colors.calendarDayForegroundPseudoSelected,
              backgroundColor: colors.calendarDayBackgroundPseudoSelected,
            }
          : {
              color: 'inherit',
              backgroundColor: 'transparent',
            };
      }
    }
  }
};

export const StyledDay = styled<SharedStylePropsT>('div', props => {
  const {
    $disabled,
    $isHeader,
    $isHovered,
    $isHighlighted,
    $outsideMonth,
    $pseudoHighlighted,
    $pseudoSelected,
    $selected,
    $theme: {colors, sizing, borders},
  } = props;
  return ({
    boxSizing: 'border-box',
    position: 'relative',
    cursor: $disabled || $isHeader ? 'default' : 'pointer',
    display: 'inline-block',
    width: sizing.scale1000,
    height: sizing.scale1000,
    lineHeight: sizing.scale800,
    textAlign: 'center',
    paddingTop: sizing.scale300,
    paddingBottom: sizing.scale300,
    paddingLeft: sizing.scale200,
    paddingRight: sizing.scale200,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    ...getDayColors(colors, {
      $disabled,
      $outsideMonth,
      $isHovered,
      $selected,
      $pseudoSelected,
      $pseudoHighlighted,
      $isHighlighted,
    }),
    ...calculateBorderRadius(props),
    ':first-child': {
      ...(borders.useRoundedCorners
        ? {
            borderTopLeftRadius: borders.radius200,
            borderBottomLeftRadius: borders.radius200,
          }
        : {}),
    },
    ':last-child': {
      ...(borders.useRoundedCorners
        ? {
            borderTopRightRadius: borders.radius200,
            borderBottomRightRadius: borders.radius200,
          }
        : {}),
    },
  }: {});
});
