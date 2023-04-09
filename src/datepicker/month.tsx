/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import Week from './week';
import { StyledMonth } from './styled-components';
import dateFnsAdapter from './utils/date-fns-adapter';
import DateHelpers from './utils/date-helpers';
import { getOverrides } from '../helpers/overrides';
import type { MonthProps } from './types';
import { DENSITY } from './constants';

const defaultProps = {
  // @ts-ignore
  dateLabel: null,
  density: DENSITY.high,
  // @ts-ignore
  excludeDates: null,
  // @ts-ignore
  filterDate: null,
  // @ts-ignore
  highlightDates: null,
  // @ts-ignore
  includeDates: null,
  // @ts-ignore
  locale: null,
  // @ts-ignore
  maxDate: null,
  // @ts-ignore
  minDate: null,
  // @ts-ignore
  month: null,
  adapter: dateFnsAdapter,
  onDayClick: () => {},
  onDayFocus: () => {},
  onDayBlur: () => {},
  onDayMouseOver: () => {},
  onDayMouseLeave: () => {},
  overrides: {},
  peekNextMonth: false,
  // @ts-ignore
  value: null,
};

const CALENDAR_MAX_ROWS = 6;

export default class CalendarMonth<T = Date> extends React.Component<MonthProps<T>> {
  static defaultProps = defaultProps;

  dateHelpers: DateHelpers<T>;

  constructor(props: MonthProps<T>) {
    super(props);
    this.dateHelpers = new DateHelpers(props.adapter);
  }

  getDateProp: () => T = () => {
    return this.props.date || this.dateHelpers.date();
  };

  isWeekInMonth: (a: T) => boolean = (startOfWeek) => {
    const date = this.getDateProp();
    const endOfWeek = this.dateHelpers.addDays(startOfWeek, 6);
    return (
      this.dateHelpers.isSameMonth(startOfWeek, date) ||
      this.dateHelpers.isSameMonth(endOfWeek, date)
    );
  };

  renderWeeks = () => {
    const weeks = [];
    let currentWeekStart = this.dateHelpers.getStartOfWeek(
      this.dateHelpers.getStartOfMonth(this.getDateProp()),
      this.props.locale
    );
    let i = 0;
    let isWithinMonth = true;

    while (
      isWithinMonth ||
      (this.props.fixedHeight && this.props.peekNextMonth && i < CALENDAR_MAX_ROWS)
    ) {
      weeks.push(
        // @ts-ignore
        <Week
          adapter={this.props.adapter}
          date={currentWeekStart}
          dateLabel={this.props.dateLabel}
          density={this.props.density}
          excludeDates={this.props.excludeDates}
          filterDate={this.props.filterDate}
          highlightedDate={this.props.highlightedDate}
          includeDates={this.props.includeDates}
          focusedCalendar={this.props.focusedCalendar}
          range={this.props.range}
          key={i}
          locale={this.props.locale}
          minDate={this.props.minDate}
          maxDate={this.props.maxDate}
          month={this.dateHelpers.getMonth(this.getDateProp())}
          onDayBlur={this.props.onDayBlur}
          onDayFocus={this.props.onDayFocus}
          onDayClick={this.props.onDayClick}
          onDayMouseOver={this.props.onDayMouseOver}
          onDayMouseLeave={this.props.onDayMouseLeave}
          onChange={this.props.onChange}
          overrides={this.props.overrides}
          peekNextMonth={this.props.peekNextMonth}
          value={this.props.value}
          hasLockedBehavior={this.props.hasLockedBehavior}
          selectedInput={this.props.selectedInput}
        />
      );
      i++;
      currentWeekStart = this.dateHelpers.addWeeks(currentWeekStart, 1);
      // It will break on the next week if the week is out of the month
      isWithinMonth = this.isWeekInMonth(currentWeekStart);
    }
    return weeks;
  };

  render() {
    const { overrides = {} } = this.props;
    const [Month, monthProps] = getOverrides(overrides.Month, StyledMonth);

    return <Month {...monthProps}>{this.renderWeeks()}</Month>;
  }
}
