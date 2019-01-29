/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* eslint-disable flowtype/generic-spacing */
import * as React from 'react';
import type {ThemeT} from '../styles/types.js';
import type {OverrideT} from '../helpers/overrides.js';
import {STATE_CHANGE_TYPE} from './constants.js';

// eslint-disable-next-line flowtype/no-weak-types
type LocaleT = any; // see https://github.com/date-fns/date-fns/blob/master/src/locale/index.js.flow

export type DatepickerOverridesT<T> = {
  Root?: OverrideT<T>,
  QuickSelectContainer?: OverrideT<T>,
  QuickSelectLabel?: OverrideT<T>,
  QuickSelectButtons?: OverrideT<T>,
  CalendarContainer?: OverrideT<T>,
  CalendarHeader?: OverrideT<T>,
  PrevButton?: OverrideT<T>,
  NextButton?: OverrideT<T>,
  MonthSelect?: OverrideT<T>,
  YearSelect?: OverrideT<T>,
  MonthHeader?: OverrideT<T>,
  WeekdayHeader?: OverrideT<T>,
  Month?: OverrideT<T>,
  Week?: OverrideT<T>,
  Day?: OverrideT<T>,
};

export type DayPropsT = {
  disabled: boolean,
  date: Date,
  filterDate: ?(day: Date) => boolean,
  highlightedDate: ?Date,
  includeDates: ?Array<Date>,
  isHighlighted: boolean,
  isRange: boolean,
  maxDate: ?Date,
  minDate: ?Date,
  month: ?number,
  onSelect: ({date: Date | Array<Date>}) => mixed,
  onClick: ({event: Event, date: Date}) => mixed,
  onMouseOver: ({event: Event, date: Date}) => mixed,
  onMouseLeave: ({event: Event, date: Date}) => mixed,
  overrides?: DatepickerOverridesT<{}>,
  peekNextMonth: boolean,
  value: ?Date | Array<Date>,
};

export type DayStateT = {
  isHovered: boolean,
};

export type WeekPropsT = {
  date: Date,
  excludeDates: ?Array<Date>,
  filterDate: ?(day: Date) => boolean,
  // highlighted while keyboard navigating or hovered
  highlightedDate: ?Date,
  includeDates: ?Array<Date>,
  isRange: boolean,
  locale: ?LocaleT,
  maxDate: ?Date,
  minDate: ?Date,
  month: ?number,
  onDayClick: ({date: Date, event: Event}) => mixed,
  onDayMouseOver: ({date: Date, event: Event}) => mixed,
  onDayMouseLeave: ({date: Date, event: Event}) => mixed,
  onSelect: ({date: Date | Array<Date>}) => mixed,
  overrides?: DatepickerOverridesT<{}>,
  peekNextMonth: boolean,
  selected: ?Date | Array<Date>,
};

export type MonthPropsT = WeekPropsT;

export type CalendarPropsT = {
  /** A list of dates to disable. */
  excludeDates: ?Array<Date>,
  /** Display a set of buttons for quickly choosing date ranges. isRange must be true as well. */
  enableQuickSelect?: boolean,
  /** A filter function that is called to check the disabled state of a day. If `false` is returned the day is considered to be disabled. */
  filterDate: ?(day: Date) => boolean,
  /** Indicates a highlighted date on hover and keyboard navigation */
  highlightedDate: ?Date,
  /** A list of selectable dates. */
  includeDates: ?Array<Date>,
  /** Defines if a range of dates can be selected. */
  isRange: boolean,
  /** A locale object. See `date-fns` for more details https://github.com/date-fns/date-fns/tree/master/src/locale. */
  locale: ?LocaleT,
  /** A max date that is selectable. */
  maxDate: ?Date,
  /** A min date that is selectable. */
  minDate: ?Date,
  /** A number of months rendered in the calendar. */
  monthsShown: number,
  /** Day's `click` event handler. */
  onDayClick: ({date: Date, event: Event}) => mixed,
  /** Day's `mouseover` event handler. */
  onDayMouseOver: ({date: Date, event: Event}) => mixed,
  /** Day's `mouseleave` event handler. */
  onDayMouseLeave: ({date: Date, event: Event}) => mixed,
  /** Event handler that is called when the current rendered month is changed. */
  onMonthChange: ({date: Date}) => mixed,
  /** Event handler that is called when the current rendered month's year is changed. */
  onYearChange: ({date: Date}) => mixed,
  /** Event handler that is called when a new date is selected. */
  onSelect: ({date: Date | Array<Date>}) => mixed,
  overrides?: DatepickerOverridesT<{}>,
  /** Defines if dates outside of the range of the current month are displayed. */
  peekNextMonth: boolean,
  /** Currently selected date. */
  selected: ?Date | Array<Date>,
  /** A helper handler for disabling a keyboard navigation and keyboard selection through the calendar dates while navigation through the month or year select controls. */
  setActiveState: boolean => mixed,
};

export type HeaderPropsT = CalendarPropsT & {
  date: Date,
};

export type SharedStylePropsT = {
  $date: Date,
  $disabled: boolean,
  $isHighlighted: boolean,
  $isHovered: boolean,
  $outsideMonth: boolean,
  $pseudoHighlighted: boolean,
  $pseudoSelected: boolean,
  $selected: boolean,
  $startDate: boolean,
  $isRange: boolean,
  $hasRangeHighlighted: boolean,
  $hasRangeOnRight: boolean,
  $hasRangeSelected: boolean,
  $theme: ThemeT,
};

export type StateChangeTypeT = ?$Values<typeof STATE_CHANGE_TYPE>;

export type CalendarStateT = {
  /** Selected `Date`. If `isRange` is set, `value` is an array of 2 values. */
  value?: ?Date | Array<Date>,
};

export type NavigationContainerStateT = {
  // indicates a highlighted date on hover and keyboard navigation
  highlightedDate?: ?Date,
  // used to disable keyboard navigation when a month or year select
  // dropdown is opened
  isActive?: boolean,
  // last remembered highlighted date to restore
  // when keyboard navigating after a mouse moved off the cal and reset
  // highlightedDate value
  lastHighlightedDate?: Date,
};

export type StateReducerT = (
  stateType: StateChangeTypeT,
  nextState: CalendarStateT,
  currentState: CalendarStateT,
) => CalendarStateT;

export type NavigationContainerStateReducerT = (
  stateType: StateChangeTypeT,
  nextState: NavigationContainerStateT,
  currentState: NavigationContainerStateT,
) => NavigationContainerStateT;

export type StatefulContainerPropsT = {
  children: CalendarPropsT => React.Node,
  /** Initial state of an uncontrolled datepicker component. */
  initialState: CalendarStateT,
  /** A state change handler. */
  stateReducer: StateReducerT,
  /** Event handler that is called when a new date is selected. */
  onSelect: ({date: Date}) => mixed,
};

export type NavigationContainerPropsT = {
  children: CalendarPropsT => React.Node,
  isRange?: boolean,
  highlightedDate?: ?Date,
  /** Day's `mouseover` event handler. */
  onDayMouseOver: (params: {date: Date, event: Event}) => mixed,
  /** Day's `mouseleave` event handler. */
  onDayMouseLeave: (params: {date: Date, event: Event}) => mixed,
  onSelect: ({date: Date}) => mixed,
  selected?: ?Date,
  /** Event handler that is called when a new date is selected. */
  onSelect: ({date: Date | Array<Date>}) => mixed,
  /** Selected `Date`. If `isRange` is set, `value` is an array of 2 values. */
  selected?: ?Date | Array<Date>,
  stateReducer: NavigationContainerStateReducerT,
};

export type StatefulDatepickerPropsT = $Diff<
  StatefulContainerPropsT,
  {
    children: CalendarPropsT => React.Node,
  },
>;
