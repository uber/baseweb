/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import { StyledDay, StyledDayLabel } from './styled-components.js';
import dateFnsAdapter from './utils/date-fns-adapter.js';
import DateHelpers from './utils/date-helpers.js';
import { getOverrides } from '../helpers/overrides.js';
import type { DayPropsT, DayStateT } from './types.js';
import { LocaleContext } from '../locale/index.js';
import type { LocaleT } from '../locale/types.js';
import { isFocusVisible } from '../utils/focusVisible.js';

export default class Day<T = Date> extends React.Component<DayPropsT<T>, DayStateT> {
  static defaultProps = {
    disabled: false,
    highlighted: false,
    range: false,
    adapter: dateFnsAdapter,
    onClick: () => {},
    onSelect: () => {},
    onFocus: () => {},
    onBlur: () => {},
    onMouseOver: () => {},
    onMouseLeave: () => {},
    overrides: {},
    peekNextMonth: true,
    value: null,
  };

  dayElm: React.ElementRef<typeof HTMLElement>;

  state = {
    isHovered: false,
    isFocusVisible: false,
  };

  dateHelpers: DateHelpers<T>;

  constructor(props: DayPropsT<T>) {
    super(props);
    this.dateHelpers = new DateHelpers(props.adapter);
  }

  componentDidMount() {
    if (this.dayElm && this.props.focusedCalendar) {
      if (this.props.highlighted || (!this.props.highlightedDate && this.isSelected())) {
        this.dayElm.focus();
      }
    }
  }

  componentDidUpdate(prevProps: DayPropsT<T>) {
    if (this.dayElm && this.props.focusedCalendar) {
      if (this.props.highlighted || (!this.props.highlightedDate && this.isSelected())) {
        this.dayElm.focus();
      }
    }
  }

  getDateProp: () => T = () => {
    return this.props.date === undefined ? this.dateHelpers.date() : this.props.date;
  };

  getMonthProp: () => number = () => {
    return this.props.month === undefined || this.props.month === null
      ? this.dateHelpers.getMonth(this.getDateProp())
      : this.props.month;
  };

  onSelect: (T) => void = (selectedDate) => {
    const { range, value } = this.props;
    let date;
    if (Array.isArray(value) && range) {
      const [start, end] = value;

      // Starting a new range
      if ((!start && !end) || (start && end)) {
        date = [selectedDate, null];

        // EndDate needs a StartDate, SelectedDate comes before EndDate
      } else if (!start && end && this.dateHelpers.isAfter(end, selectedDate)) {
        date = [selectedDate, end];

        // EndDate needs a StartDate, but SelectedDate comes after EndDate
      } else if (!start && end && this.dateHelpers.isAfter(selectedDate, end)) {
        date = [end, selectedDate];

        // StartDate needs an EndDate, SelectedDate comes after StartDate
      } else if (
        start &&
        !end &&
        this.dateHelpers.isAfter(selectedDate, start)
      ) {
        date = [start, selectedDate];
      } else {
        date = [selectedDate, start];
      }
    } else {
      date = selectedDate;
    }
    this.props.onSelect({ date });
  };

  onKeyDown = (event: KeyboardEvent) => {
    const date = this.getDateProp();
    const { highlighted, disabled } = this.props;
    if (event.key === 'Enter' && highlighted && !disabled) {
      event.preventDefault();
      this.onSelect(date);
    }
  };

  onClick = (event: Event) => {
    const date = this.getDateProp();
    const { disabled } = this.props;
    if (!disabled) {
      this.props.onClick({ event, date });
      this.onSelect(date);
    }
  };

  onFocus = (event: Event) => {
    if (isFocusVisible(event)) {
      this.setState({ isFocusVisible: true });
    }
    this.props.onFocus({ event, date: this.getDateProp() });
  };

  onBlur = (event: Event) => {
    if (this.state.isFocusVisible !== false) {
      this.setState({ isFocusVisible: false });
    }
    this.props.onBlur({ event, date: this.getDateProp() });
  };

  onMouseOver = (event: Event) => {
    this.setState({ isHovered: true });
    this.props.onMouseOver({ event, date: this.getDateProp() });
  };

  onMouseLeave = (event: Event) => {
    this.setState({ isHovered: false });
    this.props.onMouseLeave({ event, date: this.getDateProp() });
  };

  isOutsideMonth = () => {
    const month = this.getMonthProp();
    return month !== undefined && month !== this.dateHelpers.getMonth(this.getDateProp());
  };

  getOrderedDates: () => T[] = () => {
    const { highlightedDate, value } = this.props;
    if (!value || !Array.isArray(value) || !value[0] || (!value[1] && !highlightedDate)) {
      return [];
    }
    const firstValue = value[0];
    const secondValue = value.length > 1 && value[1] ? value[1] : highlightedDate;
    if (!firstValue || !secondValue) {
      return [];
    }
    const firstDate = this.clampToDayStart(firstValue);
    const secondDate = this.clampToDayStart(secondValue);
    return this.dateHelpers.isAfter(firstDate, secondDate)
      ? [secondDate, firstDate]
      : [firstDate, secondDate];
  };

  isOutsideOfMonthButWithinRange = () => {
    const date = this.clampToDayStart(this.getDateProp());
    const dates = this.getOrderedDates();
    if (dates.length < 2 || this.dateHelpers.isSameDay(dates[0], dates[1])) {
      return false;
    }
    const day = this.dateHelpers.getDate(date);
    /**
     * Empty days (no number label) at the beginning/end of the month should be included
     * within the range if the last day of a month and the first day of the next month are
     * within the range.
     */
    if (day > 15) {
      const firstDayOfNextMonth = this.clampToDayStart(
        this.dateHelpers.addDays(this.dateHelpers.getEndOfMonth(date), 1)
      );
      return (
        this.dateHelpers.isOnOrBeforeDay(dates[0], this.dateHelpers.getEndOfMonth(date)) &&
        this.dateHelpers.isOnOrAfterDay(dates[1], firstDayOfNextMonth)
      );
    } else {
      const lastDayOfPreviousMonth = this.clampToDayStart(
        this.dateHelpers.subDays(this.dateHelpers.getStartOfMonth(date), 1)
      );
      return (
        this.dateHelpers.isOnOrAfterDay(dates[1], this.dateHelpers.getStartOfMonth(date)) &&
        this.dateHelpers.isOnOrBeforeDay(dates[0], lastDayOfPreviousMonth)
      );
    }
  };

  isSelected() {
    const date = this.getDateProp();
    const { value } = this.props;
    if (Array.isArray(value)) {
      return (
        this.dateHelpers.isSameDay(date, value[0]) || this.dateHelpers.isSameDay(date, value[1])
      );
    } else {
      return this.dateHelpers.isSameDay(date, value);
    }
  }

  clampToDayStart: (T) => T = (dt) => {
    const { setSeconds, setMinutes, setHours } = this.dateHelpers;
    return setSeconds(setMinutes(setHours(dt, 0), 0), 0);
  };

  // calculated for range case only
  isPseudoSelected() {
    const date = this.getDateProp();
    const { value } = this.props;
    if (Array.isArray(value) && !value[0] && !value[1]) {
      return false;
    }
    // fix flow by passing a specific arg type and remove 'Array.isArray(value)'
    if (Array.isArray(value) && value.length > 1) {
      return this.dateHelpers.isDayInRange(
        this.clampToDayStart(date),
        this.clampToDayStart(value[0]),
        this.clampToDayStart(value[1])
      );
    }
  }

  // calculated for range case only
  isPseudoHighlighted() {
    const date = this.getDateProp();
    const { value, highlightedDate } = this.props;
    if (Array.isArray(value) && !value[0] && !value[1]) {
      return false;
    }

    // fix flow by passing a specific arg type and remove 'Array.isArray(value)'
    if (Array.isArray(value) && highlightedDate && value[0] && !value[1]) {
      if (this.dateHelpers.isAfter(highlightedDate, value[0])) {
        return this.dateHelpers.isDayInRange(
          this.clampToDayStart(date),
          this.clampToDayStart(value[0]),
          this.clampToDayStart(highlightedDate)
        );
      } else {
        return this.dateHelpers.isDayInRange(
          this.clampToDayStart(date),
          this.clampToDayStart(highlightedDate),
          this.clampToDayStart(value[0])
        );
      }
    }
  }

  getSharedProps() {
    const date = this.getDateProp();
    const { value, highlightedDate, range, highlighted } = this.props;
    const $isHighlighted = highlighted;
    const $selected = this.isSelected();
    const $hasRangeHighlighted = !!(
      Array.isArray(value) &&
      range &&
      highlightedDate &&
      ((value[0] &&
        !value[1] &&
        !this.dateHelpers.isSameDay(value[0], highlightedDate)) ||
        (!value[0] &&
          value[1] &&
          !this.dateHelpers.isSameDay(value[1], highlightedDate)))
    );
    const $outsideMonth = !peekNextMonth && this.isOutsideMonth();
    const $outsideMonthWithinRange = !!(
      Array.isArray(value) &&
      range &&
      $outsideMonth &&
      !peekNextMonth &&
      this.isOutsideOfMonthButWithinRange()
    );
    return {
      $date: date,
      $density: this.props.density,
      $disabled: this.props.disabled,
      $endDate:
        (Array.isArray(value) &&
          !!(value[0] && value[1]) &&
          range &&
          $selected &&
          this.dateHelpers.isSameDay(date, value[1])) ||
        false,
      $hasDateLabel: !!this.props.dateLabel,
      $hasRangeHighlighted,
      $hasRangeOnRight:
        Array.isArray(value) &&
        $hasRangeHighlighted &&
        highlightedDate &&
        ((value[0] && this.dateHelpers.isAfter(highlightedDate, value[0])) ||
          (value[1] && this.dateHelpers.isAfter(highlightedDate, value[1]))),
      $hasRangeSelected: Array.isArray(value)
        ? !!(value[0] && value[1])
        : false,
      $highlightedDate: highlightedDate,
      $isHighlighted,
      $isHovered: this.state.isHovered,
      $isFocusVisible: this.state.isFocusVisible,
      $startOfMonth: this.dateHelpers.isStartOfMonth(date),
      $endOfMonth: this.dateHelpers.isEndOfMonth(date),
      $month: this.getMonthProp(),
      $outsideMonth,
      $outsideMonthWithinRange,
      $peekNextMonth: peekNextMonth,
      $pseudoHighlighted:
        this.props.range && !$isHighlighted && !$selected ? this.isPseudoHighlighted() : false,
      $pseudoSelected: this.props.range && !$selected ? this.isPseudoSelected() : false,
      $range: this.props.range,
      $selected,
      $startDate:
        Array.isArray(value) && value[0] && value[1] && range && $selected
          ? this.dateHelpers.isSameDay(date, value[0])
          : false,
    };
  }

  getAriaLabel(
    sharedProps: {
      $disabled: boolean,
      $range: boolean,
      $selected: boolean,
      $startDate: boolean,
      $endDate: boolean,
    },
    localeContext: LocaleT
  ) {
    const date = this.getDateProp();
    return `${
      sharedProps.$selected
        ? sharedProps.$range
          ? sharedProps.$endDate
            ? localeContext.datepicker.selectedEndDateLabel
            : localeContext.datepicker.selectedStartDateLabel
          : localeContext.datepicker.selectedLabel
        : sharedProps.$disabled
        ? localeContext.datepicker.dateNotAvailableLabel
        : localeContext.datepicker.chooseLabel
    } ${this.dateHelpers.format(date, 'fullOrdinalWeek', this.props.locale)}. ${
      !sharedProps.$disabled ? localeContext.datepicker.dateAvailableLabel : ''
    }`;
  }

  render() {
    const date = this.getDateProp();
    const { peekNextMonth, overrides = {} } = this.props;
    const sharedProps = this.getSharedProps();
    const [Day, dayProps] = getOverrides(overrides.Day, StyledDay);
    const [DayLabel, dayLabelProps] = getOverrides(overrides.DayLabel, StyledDayLabel);
    const dateLabel = this.props.dateLabel && this.props.dateLabel(date);
    return !peekNextMonth && sharedProps.$outsideMonth ? (
      <Day
        role="gridcell"
        {...sharedProps}
        {...dayProps}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
      />
    ) : (
      // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
      <LocaleContext.Consumer>
        {(locale: LocaleT) => (
          <Day
            aria-label={this.getAriaLabel(sharedProps, locale)}
            ref={(dayElm) => {
              this.dayElm = dayElm;
            }}
            role="gridcell"
            aria-roledescription="button"
            tabIndex={
              this.props.highlighted || (!this.props.highlightedDate && this.isSelected()) ? 0 : -1
            }
            {...sharedProps}
            {...dayProps}
            // Adding event handlers after customers overrides in order to
            // make sure the components functions as expected
            // We can extract the handlers from props overrides
            // and call it along with internal handlers by creating an inline handler
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onClick={this.onClick}
            onKeyDown={this.onKeyDown}
            onMouseOver={this.onMouseOver}
            onMouseLeave={this.onMouseLeave}
          >
            <div>{this.dateHelpers.getDate(date)}</div>
            {dateLabel ? (
              <DayLabel {...sharedProps} {...dayLabelProps}>
                {dateLabel}
              </DayLabel>
            ) : null}
          </Day>
        )}
      </LocaleContext.Consumer>
    );
  }
}
