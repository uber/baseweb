/*
Copyright (c) 2018 Uber Technologies, Inc.

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
  const borderRadius = borders.useRoundedCorners ? borders.radius200 : '0px';
  return {
    ...typography.font400,
    color: props.$theme.colors.datepickerDayFont,
    backgroundColor: colors.datepickerBackground,
    textAlign: 'center',
    borderTopRightRadius: borderRadius,
    borderBottomRightRadius: borderRadius,
    borderTopLeftRadius: borderRadius,
    borderBottomLeftRadius: borderRadius,
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

export const StyledQuickSelectContainer = styled<SharedStylePropsT>(
  'div',
  props => ({
    maxWidth: '296px',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: props.$theme.sizing.scale600,
  }),
);

export const StyledQuickSelectLabel = styled<SharedStylePropsT>(
  'div',
  props => ({
    ...props.$theme.typography.font300,
    color: props.$theme.colors.colorPrimary,
    marginBottom: props.$theme.sizing.scale600,
    textAlign: 'left',
  }),
);

export const StyledQuickSelectButtons = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
});

export const StyledCalendarHeader = styled<SharedStylePropsT>('div', props => {
  const {
    $theme: {colors, sizing, borders},
  } = props;
  const borderRadius = borders.useRoundedCorners ? borders.radius200 : '0px';
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
    borderTopRightRadius: borderRadius,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: borderRadius,
    borderBottomLeftRadius: 0,
  };
});

export const StyledMonthHeader = styled<SharedStylePropsT>('div', props => {
  return {
    whiteSpace: 'nowrap',
  };
});

function getArrowBtnStyle({$theme}) {
  return {
    boxSizing: 'border-box',
    height: '22px',
    color: $theme.colors.white,
    backgroundColor: 'transparent',
    borderWidth: '0',
    paddingTop: '3px',
    paddingBottom: '3px',
    paddingLeft: '3px',
    paddingRight: '3px',
    outline: 'none',
    ':focus': {
      backgroundColor: $theme.colors.primary500,
      borderRadius: $theme.borders.useRoundedCorners
        ? $theme.sizing.scale100
        : 0,
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

export const StyledDay = styled<SharedStylePropsT>('div', props => {
  const {
    $disabled,
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
    cursor: $disabled ? 'default' : 'pointer',
    display: 'inline-block',
    width: sizing.scale1000,
    height: sizing.scale1000,
    lineHeight: sizing.scale800,
    textAlign: 'center',
    paddingTop: sizing.scale300,
    paddingBottom: sizing.scale300,
    paddingLeft: sizing.scale200,
    paddingRight: sizing.scale200,
    marginTop: '0',
    marginBottom: '0',
    marginLeft: '0',
    marginRight: '0',
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
