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
export const StyledRoot = styled('div', (props: SharedStylePropsT) => {
  const {
    $theme: {typography, colors, borders},
  } = props;
  return {
    ...typography.font400,
    color: colors.black,
    backgroundColor: colors.white,
    textAlign: 'center',
    borderRadius: borders.useRoundedCorners ? borders.radius200 : '0px',
    display: 'inline-block',
  };
});

export const StyledCalendarContainer = styled(
  'div',
  (props: SharedStylePropsT) => {
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

export const StyledHeader = styled('div', (props: SharedStylePropsT) => {
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
    borderRadius: `${borderRadius} ${borderRadius} 0 0`,
  };
});

export const StyledMonthHeader = styled('div', (props: SharedStylePropsT) => {
  return {
    whiteSpace: 'no-wrap',
  };
});

export const StyledMonth = styled('div', (props: SharedStylePropsT) => {
  return {
    display: 'inline-block',
  };
});

export const StyledWeek = styled('div', (props: SharedStylePropsT) => {
  const {
    $theme: {sizing},
  } = props;
  return {
    whiteSpace: 'no-wrap',
    display: 'flex',
    marginBottom: sizing.scale100,
  };
});

function getBorderRadius(left, right) {
  return {
    borderTopLeftRadius: left,
    borderBottomLeftRadius: left,
    borderTopRightRadius: right,
    borderBottomRightRadius: right,
  };
}

export const StyledDay = styled('div', (props: SharedStylePropsT) => {
  const {
    $disabled,
    $isHovered,
    $isHighlighted,
    $outsideMonth,
    $pseudoHighlighted,
    $pseudoSelected,
    $selected,
    $startDate,
    $isRange,
    $hasRangeHighlighted,
    $hasRangeOnRight,
    $hasRangeSelected,
    $theme: {colors, sizing, borders},
  } = props;
  return {
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
        ? colors.mono600
        : 'inherit',
    backgroundColor: $selected
      ? colors.primary
      : $isHovered || $isHighlighted || $pseudoHighlighted || $pseudoSelected
        ? colors.primary100
        : 'transparent',
    ...(borders.useRoundedCorners
      ? $selected
        ? !$isRange
          ? getBorderRadius(borders.radius200, borders.radius200)
          : $hasRangeSelected
            ? $startDate
              ? getBorderRadius(borders.radius200, 0)
              : getBorderRadius(0, borders.radius200)
            : $hasRangeHighlighted
              ? $hasRangeOnRight
                ? getBorderRadius(borders.radius200, 0)
                : getBorderRadius(0, borders.radius200)
              : getBorderRadius(borders.radius200, borders.radius200)
        : !$isHighlighted && ($pseudoHighlighted || $pseudoSelected)
          ? getBorderRadius(0, 0)
          : $isHighlighted
            ? !$isRange
              ? getBorderRadius(borders.radius200, borders.radius200)
              : $hasRangeHighlighted
                ? $hasRangeOnRight
                  ? getBorderRadius(0, borders.radius200)
                  : getBorderRadius(borders.radius200, 0)
                : $pseudoSelected
                  ? getBorderRadius(0, 0)
                  : getBorderRadius(borders.radius200, borders.radius200)
            : !$pseudoSelected &&
              getBorderRadius(borders.radius200, borders.radius200)
      : getBorderRadius(0, 0)),
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
  };
});
