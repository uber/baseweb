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
    ...typography.font400,
    color: props.$theme.colors.datepickerDayFont,
    backgroundColor: colors.datepickerBackground,
    textAlign: 'center',
    borderTopLeftRadius: borders.calendarBorderRadius,
    borderTopRightRadius: borders.calendarBorderRadius,
    borderBottomRightRadius: borders.calendarBorderRadius,
    borderBottomLeftRadius: borders.calendarBorderRadius,
    display: 'inline-block',
  };
});

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
  props => {
    return {
      marginBottom: props.$theme.sizing.scale600,
      paddingLeft: props.$theme.sizing.scale600,
      paddingRight: props.$theme.sizing.scale600,
      textAlign: 'left',
    };
  },
);

export const StyledCalendarHeader = styled<SharedStylePropsT>('div', props => {
  const {
    $theme: {borders, colors, sizing},
  } = props;
  return {
    color: colors.white,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: sizing.scale500,
    paddingBottom: sizing.scale500,
    paddingLeft: sizing.scale600,
    paddingRight: sizing.scale600,
    backgroundColor: colors.primary,
    borderTopLeftRadius: borders.calendarBorderRadius,
    borderTopRightRadius: borders.calendarBorderRadius,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  };
});

export const StyledMonthHeader = styled<SharedStylePropsT>('div', props => {
  return {
    color: props.$theme.colors.white,
    backgroundColor: props.$theme.colors.primary,
    whiteSpace: 'nowrap',
  };
});

export const StyledMonthYearSelectButton = styled<{}>('button', props => {
  return {
    ...props.$theme.typography.font400,
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 0,
    color: props.$theme.colors.mono100,
    cursor: 'pointer',
    display: 'flex',
    ':focus': {
      backgroundColor: props.$theme.colors.primary500,
      borderTopLeftRadius: props.$theme.borders.calendarInteractionBorderRadius,
      borderTopRightRadius:
        props.$theme.borders.calendarInteractionBorderRadius,
      borderBottomRightRadius:
        props.$theme.borders.calendarInteractionBorderRadius,
      borderBottomLeftRadius:
        props.$theme.borders.calendarInteractionBorderRadius,
    },
  };
});

export const StyledMonthYearSelectIconContainer = styled<{}>('span', props => {
  return {
    alignItems: 'center',
    display: 'flex',
    marginLeft: props.$theme.sizing.scale500,
  };
});

function getArrowBtnStyle({$theme, $disabled}) {
  return {
    boxSizing: 'border-box',
    height: '22px',
    color: $disabled
      ? $theme.colors.datepickerDayFontDisabled
      : $theme.colors.white,
    cursor: $disabled ? 'default' : 'pointer',
    backgroundColor: 'transparent',
    borderWidth: 0,
    paddingTop: '3px',
    paddingBottom: '3px',
    paddingLeft: '3px',
    paddingRight: '3px',
    outline: 'none',
    ':focus': $disabled
      ? {}
      : {
          backgroundColor: $theme.colors.primary500,
          borderTopLeftRadius: $theme.borders.calendarInteractionBorderRadius,
          borderTopRightRadius: $theme.borders.calendarInteractionBorderRadius,
          borderBottomRightRadius:
            $theme.borders.calendarInteractionBorderRadius,
          borderBottomLeftRadius:
            $theme.borders.calendarInteractionBorderRadius,
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
  const radius = borders.calendarInteractionBorderRadius;

  if ($selected) {
    if (!$range) {
      return getBorderRadius(radius, radius);
    } else {
      if ($hasRangeSelected) {
        return $startDate
          ? getBorderRadius(radius, 0)
          : getBorderRadius(0, radius);
      } else {
        if ($hasRangeHighlighted) {
          return $hasRangeOnRight
            ? getBorderRadius(radius, 0)
            : getBorderRadius(0, radius);
        } else {
          return getBorderRadius(radius, radius);
        }
      }
    }
  } else {
    if (!$isHighlighted && ($pseudoHighlighted || $pseudoSelected)) {
      return getBorderRadius(0, 0);
    } else {
      if ($isHighlighted) {
        if (!$range) {
          return getBorderRadius(radius, radius);
        } else if ($hasRangeHighlighted) {
          return $hasRangeOnRight
            ? getBorderRadius(0, radius)
            : getBorderRadius(radius, 0);
        } else {
          return $pseudoSelected
            ? getBorderRadius(0, 0)
            : getBorderRadius(radius, radius);
        }
      } else {
        return !$pseudoSelected ? getBorderRadius(radius, radius) : null;
      }
    }
  }
}

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
    color: $selected
      ? colors.white
      : $outsideMonth || $disabled
        ? colors.datepickerDayFontDisabled
        : 'inherit',
    backgroundColor: $selected
      ? $isHighlighted
        ? colors.primary500
        : colors.primary
      : $pseudoSelected
        ? $isHighlighted
          ? colors.datepickerDayPseudoHighlighted
          : colors.datepickerDayPseudoSelected
        : $isHovered || $isHighlighted || $pseudoHighlighted
          ? colors.datepickerDayPseudoSelected
          : 'transparent',
    ...calculateBorderRadius(props),
    ':first-child': {
      borderTopLeftRadius: borders.calendarInteractionBorderRadius,
      borderBottomLeftRadius: borders.calendarInteractionBorderRadius,
    },
    ':last-child': {
      borderTopRightRadius: borders.calendarInteractionBorderRadius,
      borderBottomRightRadius: borders.calendarInteractionBorderRadius,
    },
  }: {});
});
