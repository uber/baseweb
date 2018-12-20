/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* eslint-disable flowtype/generic-spacing */
import * as React from 'react';
import type {ThemeT} from '../styles/types.js';
import {STATE_CHANGE_TYPE} from './constants.js';

// eslint-disable-next-line flowtype/no-weak-types
type LocaleT = any; // see https://github.com/date-fns/date-fns/blob/master/src/locale/index.js.flow

export type DayPropsT = {
  disabled: boolean,
  date: Date,
  // highlightDates: Array<Date>,
  isHighlighted: boolean,
  maxDate: ?Date,
  minDate: ?Date,
  month: ?number,
  onSelect: ({date: Date}) => void,
  onClick: ({event: Event, date: Date}) => void,
  onMouseOver: ({event: Event, date: Date}) => void,
  onMouseLeave: ({event: Event, date: Date}) => void,
  peekNextMonth: boolean,
  selected: boolean,
};

export type DayStateT = {
  isHovered: boolean,
};

export type WeekPropsT = {
  date: Date,
  excludeDates: ?Array<Date>,
  filterDate: ?(day: Date) => boolean,
  highlightDates: ?Array<Date>,
  // highlighted while keyboard navigating or hovered
  highlightedDate: ?Date,
  includeDates: ?Array<Date>,
  locale: ?LocaleT,
  maxDate: ?Date,
  minDate: ?Date,
  month: ?number,
  onDayClick: ({date: Date, event: Event}) => void,
  onDayMouseOver: ({date: Date, event: Event}) => void,
  onDayMouseLeave: ({date: Date, event: Event}) => void,
  onSelect: ({date: Date}) => void,
  peekNextMonth: boolean,
  selected: ?Date,
};

export type MonthPropsT = WeekPropsT;

export type CalendarPropsT = {
  excludeDates: ?Array<Date>,
  filterDate: ?(day: Date) => boolean,
  highlightDates: ?Array<Date>,
  highlightedDate: ?Date,
  includeDates: ?Array<Date>,
  locale: ?LocaleT,
  maxDate: ?Date,
  minDate: ?Date,
  monthsShown: number,
  onDayClick: ({date: Date, event: Event}) => void,
  onDayMouseOver: ({date: Date, event: Event}) => void,
  onDayMouseLeave: ({date: Date, event: Event}) => void,
  onMonthChange: ({date: Date}) => void,
  onYearChange: ({date: Date}) => void,
  onSelect: ({date: Date}) => void,
  peekNextMonth: boolean,
  selected: ?Date,
  setActiveState: boolean => void,
};

export type HeaderPropsT = CalendarPropsT & {
  date: Date,
};

export type SharedStylePropsT = {
  $disabled: boolean,
  $isHighlighted: boolean,
  $isHovered: boolean,
  $outsideMonth: boolean,
  $selected: boolean,
  $theme: ThemeT,
};

export type StateChangeTypeT = ?$Values<typeof STATE_CHANGE_TYPE>;

export type CalendarStateT = {
  // indicates a highlighted date on hover and keyboard navigation
  highlightedDate?: ?Date,
  // used to disable keyboard navigation when a month or year select
  // dropdown is opened
  isActive?: boolean,
  // last remembered highlighted date to restore
  // when keyboard navigating after a mouse moved off the cal and reset
  // highlightedDate value
  lastHighlightedDate?: Date,
  value?: ?Date,
};

export type StateReducerT = (
  stateType: StateChangeTypeT,
  nextState: CalendarStateT,
  currentState: CalendarStateT,
) => CalendarStateT;

export type StatefulContainerPropsT = {
  children: CalendarPropsT => React.Node,
  initialState: CalendarStateT,
  stateReducer: StateReducerT,
  onDayMouseOver: (params: {date: Date, event: Event}) => void,
  onDayMouseLeave: (params: {date: Date, event: Event}) => void,
  onSelect: ({date: Date}) => void,
};

export type StatefulDatepickerPropsT = $Diff<
  StatefulContainerPropsT,
  {
    children: CalendarPropsT => React.Node,
  },
>;
