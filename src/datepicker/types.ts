/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type * as React from 'react';
import type { Override } from '../helpers/overrides';
import type { Size } from '../input';
import type {
  INPUT_ROLE,
  ORIENTATION,
  RANGED_CALENDAR_BEHAVIOR,
  STATE_CHANGE_TYPE,
  DENSITY,
} from './constants';
import type { DateIOAdapter } from './utils/types';
import type {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  TimePickerProps as TimePickerPropsTBase,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  TimePickerState as TimePickerStateTBase,
} from '../timepicker/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Locale = any; // see https://github.com/date-fns/date-fns/blob/master/src/locale/index.js.flow

export type Density = keyof typeof DENSITY;

export type DatepickerOverrides = {
  Root?: Override;
  /** Override for reused Select component. QuickSelect is **not a styled  element** but a react component that can be replaced */
  QuickSelect?: Override;
  QuickSelectContainer?: Override;
  /** Override for reused Select component. QuickSelectFormControl is **not a styled  element** but a react component that can be replaced */
  QuickSelectFormControl?: Override;
  /** Override for reused TimePicker component. TimeSelect is **not a styled  element** but a react component that can be replaced */
  TimeSelect?: Override;
  TimeSelectContainer?: Override;
  /** Override for reused Select component. TimeSelectFormControl is **not a styled  element** but a react component that can be replaced */
  TimeSelectFormControl?: Override;
  CalendarContainer?: Override;
  CalendarHeader?: Override;
  PrevButton?: Override;
  PrevButtonIcon?: Override;
  NextButton?: Override;
  NextButtonIcon?: Override;
  MonthContainer?: Override;
  MonthHeader?: Override;
  MonthYearSelectButton?: Override;
  MonthYearSelectIconContainer?: Override;
  MonthYearSelectPopover?: Override;
  MonthYearSelectStatefulMenu?: Override;
  WeekdayHeader?: Override;
  Month?: Override;
  Week?: Override;
  Day?: Override;
  DayLabel?: Override;
  /** Override for reused Input component. Input is **not a styled  element** but a react component that can be replaced */
  Input?: Override;
  InputWrapper?: Override;
  /** Override for reused Popover component. Popover is **not a styled  element** but a react component that can be replaced */
  Popover?: Override;
  StartDate?: Override;
  EndDate?: Override;
  InputLabel?: Override;
};

export type DayProps<T = Date> = {
  disabled: boolean;
  date: T;
  dateLabel: ((day: T) => React.ReactNode) | undefined | null;
  density: Density;
  filterDate: ((day: T) => boolean) | undefined | null;
  highlightedDate: T | undefined | null;
  includeDates: Array<T> | undefined | null;
  highlighted: boolean;
  range: boolean;
  hasLockedBehavior: boolean;
  selectedInput: InputRole;
  focusedCalendar: boolean;
  locale: Locale | undefined | null;
  maxDate: T | undefined | null;
  adapter: DateIOAdapter<T>;
  minDate: T | undefined | null;
  month: number | undefined | null;
  onBlur: (a: { event: Event; date: T }) => unknown;
  onFocus: (a: { event: Event; date: T }) => unknown;
  onSelect: (a: { date: T | Array<T | undefined | null> }) => unknown;
  onClick: (a: { event: Event; date: T }) => unknown;
  onMouseOver: (a: { event: Event; date: T }) => unknown;
  onMouseLeave: (a: { event: Event; date: T }) => unknown;
  overrides?: DatepickerOverrides;
  peekNextMonth: boolean;
  value: T | undefined | null | Array<T | undefined | null>;
};

export type DayState = {
  isHovered: boolean;
  isFocusVisible: boolean;
};

export type WeekProps<T = Date> = {
  date: T;
  dateLabel: ((date: T) => React.ReactNode) | undefined | null;
  density: Density;
  excludeDates: Array<T> | undefined | null;
  filterDate: ((day: T) => boolean) | undefined | null;
  // highlighted while keyboard navigating or hovered
  highlightedDate: T | undefined | null;
  includeDates: Array<T> | undefined | null;
  focusedCalendar: boolean;
  range?: boolean;
  locale: Locale | undefined | null;
  maxDate: T | undefined | null;
  minDate: T | undefined | null;
  adapter: DateIOAdapter<T>;
  month: number | undefined | null;
  onDayBlur: (a: { date: T; event: Event }) => unknown;
  onDayClick: (a: { date: T; event: Event }) => unknown;
  onDayFocus: (a: { date: T; event: Event }) => unknown;
  onDayMouseOver: (a: { date: T; event: Event }) => unknown;
  onDayMouseLeave: (a: { date: T; event: Event }) => unknown;
  onChange?: (a: { readonly date: T | undefined | null | Array<T | undefined | null> }) => unknown;
  overrides?: DatepickerOverrides;
  peekNextMonth: boolean;
  value: T | undefined | null | Array<T | undefined | null>;
  hasLockedBehavior: boolean;
  selectedInput?: InputRole;
};

export type MonthProps<T = Date> = {
  fixedHeight?: boolean;
} & WeekProps<T>;

export type CalendarInternalState<T = Date> = {
  highlightedDate: T;
  focused: boolean;
  date: T;
  quickSelectId: string | undefined | null;
  rootElement: HTMLElement | undefined | null;
  time: Array<T | undefined | null>;
};

export type CalendarProps<T = Date> = {
  /** Defines if the calendar is set to be focused on an initial render. */
  autoFocusCalendar?: boolean;
  /** Determines the density of the calendar */
  density?: Density;
  /** A list of dates to disable. */
  excludeDates?: Array<T> | null;
  /** Display select for quickly choosing date ranges. `range` must be true as well. */
  quickSelect?: boolean;
  /** Array of custom options displayed in the quick select. Overrides default options if provided. */
  quickSelectOptions?: Array<QuickSelectOption<T>>;
  /** A filter function that is called to check the disabled state of a day. If `false` is returned the day is considered to be disabled. */
  filterDate?: ((day: T) => boolean) | null;
  /** A function that is called with the current date to render the label text under that day on the calendar. */
  dateLabel?: ((day: T) => React.ReactNode) | null;
  /** Indicates a highlighted date on hover and keyboard navigation */
  highlightedDate?: T | null;
  /** A list of selectable dates. */
  includeDates?: Array<T> | null;
  /** Defines if a range of dates can be selected. */
  range?: boolean;
  /** Determines whether startDate and endDate should be updated independently of eachother */
  hasLockedBehavior?: boolean;
  /** A locale object. See `date-fns` for more details https://github.com/date-fns/date-fns/tree/master/src/locale. */
  locale?: Locale | null;
  /** A max date that is selectable. */
  maxDate?: T | null;
  /** A min date that is selectable. */
  minDate?: T | null;
  adapter?: DateIOAdapter<T>;
  /** A number of months rendered in the calendar. */
  monthsShown?: number;
  /** Day's `click` event handler. */
  onDayClick?: (a: { date: T; event: Event }) => unknown;
  /** Day's `focus` event handler. */
  onDayFocus?: (a: { date: T; event: Event }) => unknown;
  /** Day's `mouseover` event handler. */
  onDayMouseOver?: (a: { date: T; event: Event }) => unknown;
  /** Day's `mouseleave` event handler. */
  onDayMouseLeave?: (a: { date: T; event: Event }) => unknown;
  /** Event handler that is called when the current rendered month is changed. */
  onMonthChange?: (a: { date: T }) => unknown;
  /** Event handler that is called when the current rendered month's year is changed. */
  onYearChange?: (a: { date: T }) => unknown;
  /** Event handler that is called when a new date is selected. */
  onChange?: (a: { readonly date: T | undefined | null | Array<T | undefined | null> }) => unknown;
  /** Event handler that is called when a selection is made using the quick select menu. */
  onQuickSelectChange?: (option?: QuickSelectOption<T>) => unknown;
  /** Sets the orientation of the calendar when multiple months are displayed */
  orientation?: typeof ORIENTATION[keyof typeof ORIENTATION];
  overrides?: DatepickerOverrides;
  /** Defines if dates outside of the range of the current month are displayed. */
  peekNextMonth?: boolean;
  /** Determines if `TimePicker` component will be enabled for start time */
  timeSelectStart?: boolean;
  /** Determines if `TimePicker` component will be enabled for end time */
  timeSelectEnd?: boolean;
  /** Defines if tabbing inside the calendar is circled within it. */
  trapTabbing?: boolean;
  /** Currently selected date. */
  value?: T | undefined | null | Array<T | undefined | null>;
  fixedHeight?: boolean;
  /** Determines whether user clicked startDate or endDate input to trigger calendar open */
  selectedInput?: InputRole;
};

export type HeaderProps<T = Date> = CalendarProps<T> & {
  date: T;
  order: number;
};

export type QuickSelectOption<T> = {
  id: string;
  beginDate: T;
  endDate?: T;
};

export type DatepickerProps<T = Date> = {
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string | null;
  disabled?: boolean;
  size?: Size;
  /** Renders UI in 'error' state. */
  error?: boolean;
  positive?: boolean;
  placeholder?: string;
  required?: boolean;
  clearable?: boolean;
  displayValueAtRangeIndex?: number;
  formatDisplayValue?: (
    date: T | undefined | null | Array<T | undefined | null>,
    formatString: string
  ) => string;
  formatString?: string;
  /** Where to mount the popover */
  mountNode?: HTMLElement;
  /** When single picker, fn is always called. When range picker, fn is called when start and end date are selected. */
  onChange?: (a: { date: T | undefined | null | Array<T> }) => unknown;
  /** Called when calendar is closed */
  onClose?: () => unknown;
  /** Called when calendar is opened */
  onOpen?: () => unknown;
  /** When single picker, fn is always called. When range picker, fn is called when either start or end date changes. */
  onRangeChange?: (a: {
    readonly date: T | undefined | null | Array<T | undefined | null>;
  }) => unknown;
  mask?: string | null;
  /** Determines whether startDate and endDate should be updated independently of eachother */
  rangedCalendarBehavior?: RangedCalendarBehavior;
  /** Determines if startDate and endDate should be separated into two input fields. Ignored if `range` is not true. */
  separateRangeInputs?: boolean;
  startDateLabel?: string;
  endDateLabel?: string;
  value?: T | undefined | null | Array<T | undefined | null>;
} & CalendarProps<T>;

export type SharedStyleProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  $date: any;
  $disabled: boolean | undefined | null;
  $density: Density;
  $endDate: boolean | undefined | null;
  $endOfMonth: boolean | undefined | null;
  $isHighlighted: boolean | undefined | null;
  $isHovered: boolean | undefined | null;
  $isFocusVisible: boolean | undefined | null;
  $month: number | undefined | null;
  $outsideMonth: boolean | undefined | null;
  $outsideMonthWithinRange: boolean | undefined | null;
  $peekNextMonth: boolean | undefined | null;
  $pseudoHighlighted: boolean | undefined | null;
  $pseudoSelected: boolean | undefined | null;
  $selected: boolean | undefined | null;
  $startDate: boolean | undefined | null;
  $startOfMonth: boolean | undefined | null;
  $range: boolean | undefined | null;
  $hasRangeHighlighted: boolean | undefined | null;
  $hasRangeOnRight: boolean | undefined | null;
  $hasRangeSelected: boolean | undefined | null;
  $hasLockedBehavior: boolean;
  $selectedInput: InputRole;
  $value: Date | Array<Date>;
  $order: number | undefined | null;
  $hasDateLabel: boolean | undefined | null;
};

export type StateChangeType =
  | typeof STATE_CHANGE_TYPE[keyof typeof STATE_CHANGE_TYPE]
  | undefined
  | null;

export type ContainerState<T = Date> = {
  /** Selected `Date`. If `range` is set, `value` is an array of 2 values. */
  value?: T | undefined | null | Array<T | undefined | null>;
  highlightedDate?: T | null;
};

export type NavigationContainerState<T = Date> = {
  // indicates a highlighted date on hover and keyboard navigation
  highlightedDate?: T | null;
  // used to disable keyboard navigation when a month or year select
  // dropdown is opened
  isActive?: boolean;
  // last remembered highlighted date to restore
  // when keyboard navigating after a mouse moved off the cal and reset
  // highlightedDate value
  lastHighlightedDate?: T;
};

export type StateReducer<T = Date> = (
  stateType: StateChangeType,
  nextState: ContainerState<T>,
  currentState: ContainerState<T>
) => ContainerState<T>;

export type StatefulContainerProps<Props, T = Date> = {
  children: (a: Props) => React.ReactNode;
  /** Initial state of an uncontrolled datepicker component. */
  initialState?: ContainerState<T>;
  /** A state change handler. */
  stateReducer?: StateReducer<T>;
  /** When single picker, fn is called when date/time is selected. When range picker, fn is called when both start and end are selected. */
  onChange?: (a: { date: T | undefined | null | Array<T> }) => unknown;
  /** When single picker, fn is called when date/time is selected. When range picker, fn is called when either start or end date changes. */
  onRangeChange?: (a: {
    readonly date: T | undefined | null | Array<T | undefined | null>;
  }) => unknown;
  adapter?: DateIOAdapter<T>;
  /** Should the date value be stored as an array or single value. */
  range?: boolean;
};

export type StatefulDatepickerProps<Props, T = Date> = Omit<
  StatefulContainerProps<Props, T>,
  'children'
>;

export type InputRole = typeof INPUT_ROLE[keyof typeof INPUT_ROLE] | undefined | null;

export type RangedCalendarBehavior =
  | typeof RANGED_CALENDAR_BEHAVIOR[keyof typeof RANGED_CALENDAR_BEHAVIOR]
  | undefined
  | null;
