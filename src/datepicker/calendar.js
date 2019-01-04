/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import React from 'react';
import CalendarHeader from './calendar-header.js';
import Month from './month.js';
import {
  StyledRoot,
  StyledCalendarContainer,
  StyledMonthHeader,
  StyledDay,
} from './styled-components.js';
import {
  getMonth,
  addMonths,
  getStartOfWeek,
  addDays,
  isBefore,
  isAfter,
  getWeekdayMinInLocale,
  isSameDay,
  getEffectiveMinDate,
  getEffectiveMaxDate,
} from './utils/index.js';
import {WEEKDAYS} from './constants.js';
import {getOverrides} from '../helpers/overrides.js';
import type {CalendarPropsT} from './types.js';

export default class Calendar extends React.Component<
  CalendarPropsT,
  {date: Date},
> {
  static defaultProps = {
    excludeDates: null,
    filterDate: null,
    highlightDates: null,
    highlightedDate: null,
    includeDates: null,
    isRange: false,
    locale: null,
    maxDate: null,
    minDate: null,
    monthsShown: 1,
    onDayClick: () => {},
    onDayMouseOver: () => {},
    onDayMouseLeave: () => {},
    onMonthChange: () => {},
    onYearChange: () => {},
    onSelect: () => {},
    overrides: {},
    peekNextMonth: false,
    selected: null,
    setActiveState: () => {},
  };

  constructor(props: CalendarPropsT) {
    super(props);
    this.state = {
      date: this.getDateInView(),
    };
  }

  componentDidUpdate(prevProps: CalendarPropsT) {
    if (
      this.props.highlightedDate &&
      !isSameDay(this.props.highlightedDate, prevProps.highlightedDate)
    ) {
      this.setState({
        date: this.props.highlightedDate,
      });
    }
  }

  getSingleDate(value) {
    if (this.props.isRange) {
      return value[0] || null;
    }
    return value;
  }

  getDateInView = (): Date => {
    const {highlightedDate, selected} = this.props;
    const minDate = getEffectiveMinDate(this.props);
    const maxDate = getEffectiveMaxDate(this.props);
    const current = new Date();
    const initialDate = this.getSingleDate(selected) || highlightedDate;
    if (initialDate) {
      return initialDate;
    } else {
      if (minDate && isBefore(current, minDate)) {
        return minDate;
      } else if (maxDate && isAfter(current, maxDate)) {
        return maxDate;
      }
    }
    return current;
  };

  handleMonthChange = (date: Date) => {
    if (this.props.onMonthChange) {
      this.props.onMonthChange({date});
    }
  };

  handleYearChange = (date: Date) => {
    if (this.props.onYearChange) {
      this.props.onYearChange({date});
    }
  };

  changeMonth = ({date}: {date: Date}) => {
    this.setState({date: date}, () => this.handleMonthChange(this.state.date));
  };

  changeYear = ({date}: {date: Date}) => {
    this.setState({date: date}, () => this.handleYearChange(this.state.date));
  };

  renderCalendarHeader = (date: Date = this.state.date, order: number) => {
    return (
      <CalendarHeader
        {...this.props}
        key={`month-header-${order}`}
        date={date}
        order={order}
        onMonthChange={this.changeMonth}
        onYearChange={this.changeYear}
      />
    );
  };

  renderMonthHeader = (date: Date = this.state.date, order: number) => {
    const {locale, overrides = {}} = this.props;
    const startOfWeek = getStartOfWeek(date, locale);
    const [MonthHeader, monthHeaderProps] = getOverrides(
      overrides.MonthHeader,
      StyledMonthHeader,
    );
    const [WeekdayHeader, weekdayHeaderProps] = getOverrides(
      overrides.WeekdayHeader,
      StyledDay,
    );
    return (
      <MonthHeader {...monthHeaderProps}>
        {WEEKDAYS.map(offset => {
          const day = addDays(startOfWeek, offset);
          return (
            <WeekdayHeader $disabled key={offset} {...weekdayHeaderProps}>
              {getWeekdayMinInLocale(day, locale)}
            </WeekdayHeader>
          );
        })}
      </MonthHeader>
    );
  };

  renderMonths = () => {
    const {overrides = {}} = this.props;
    const monthList = [];
    const [CalendarContainer, calendarContainerProps] = getOverrides(
      overrides.CalendarContainer,
      StyledCalendarContainer,
    );
    for (let i = 0; i < this.props.monthsShown; ++i) {
      const monthDate = addMonths(this.state.date, i);
      const monthKey = `month-${i}`;
      monthList.push(this.renderCalendarHeader(monthDate, i));
      monthList.push(
        <CalendarContainer key={monthKey} {...calendarContainerProps}>
          {this.renderMonthHeader(monthDate, i)}
          <Month
            date={monthDate}
            excludeDates={this.props.excludeDates}
            filterDate={this.props.filterDate}
            highlightDates={this.props.highlightDates}
            highlightedDate={this.props.highlightedDate}
            includeDates={this.props.includeDates}
            isRange={this.props.isRange}
            locale={this.props.locale}
            maxDate={this.props.maxDate}
            minDate={this.props.minDate}
            month={getMonth(this.state.date)}
            onDayClick={this.props.onDayClick}
            onDayMouseOver={this.props.onDayMouseOver}
            onDayMouseLeave={this.props.onDayMouseLeave}
            onSelect={this.props.onSelect}
            overrides={overrides}
            selected={this.props.selected}
            peekNextMonth={this.props.peekNextMonth}
          />
        </CalendarContainer>,
      );
    }
    return monthList;
  };

  render() {
    const {overrides = {}} = this.props;
    const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);
    return <Root {...rootProps}>{this.renderMonths()}</Root>;
  }
}
