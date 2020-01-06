/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import type {SharedStylePropsT} from '../types.js';

/**
  r == range - date range can be selected
  d == disabled - disabled date
  h == highlighted - currently highlighed date, the highlight is triggered on hover or focus
  mO == hovered (mouse-over) - currently hovered date
  s == selected - selected date, in a range both start and end date are marked as `selected`
  rS == range-selected - when start and end dates of a range are set
  sD == start-date - selected start date of the range
  eD == end-date - selected end date of the range
  pS == pseudo-selected - any date between two selected dates in a range
  rH == range-highlighed - when only a single date of a range selected and the second date is highlighted but not yet selected
  pH == pseudo-highlighted -  any date between a selected date in a range and the currently highlighted date (case when only one date selected in a range case)
  rR == range-on-right - the range-highlighed case with the highlighed date is after the selected one
  rL == range-on-left - the range-highlighed case with the highlighed date is before the selected one
  sM == start-of-month - the first day of the month
  eM == end-of-month - the last day of the month
  oM == outside-month - date outside of currently disaplayed month (when peekNextMonth is set to true)
 */

//  r  d  h  s  rS sD eD pS rH pH rR rL sM eM oM
//  1  1  1  1  1  1  1  1  1  1  1  1  1  1  1

export default function getDayStateCode(props: SharedStylePropsT) {
  const {
    $range = false,
    $disabled = false,
    $isHighlighted = false,
    $isHovered = false,
    $selected = false,
    $hasRangeSelected = false,
    $startDate = false,
    $endDate = false,
    $pseudoSelected = false,
    $hasRangeHighlighted = false,
    $pseudoHighlighted = false,
    $hasRangeOnRight = false,
    $startOfMonth = false,
    $endOfMonth = false,
    $outsideMonth = false,
  } = props;
  return `${+$range}${+$disabled}${+(
    $isHighlighted || $isHovered
  )}${+$selected}${+$hasRangeSelected}${+$startDate}${+$endDate}${+$pseudoSelected}${+$hasRangeHighlighted}${+$pseudoHighlighted}${+(
    $hasRangeHighlighted &&
    !$pseudoHighlighted &&
    $hasRangeOnRight
  )}${+(
    $hasRangeHighlighted &&
    !$pseudoHighlighted &&
    !$hasRangeOnRight
  )}${+$startOfMonth}${+$endOfMonth}${+$outsideMonth}`;
}
