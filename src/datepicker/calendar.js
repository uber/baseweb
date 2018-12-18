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

  getDateInView = (): Date => {
    const {highlightedDate, selected} = this.props;
    const minDate = getEffectiveMinDate(this.props);
    const maxDate = getEffectiveMaxDate(this.props);
    const current = new Date();
    const initialDate = selected || highlightedDate;
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

  handleDayClick = ({date, event}: {date: Date, event: Event}) => {
    this.props.onSelect({date});
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
    const {locale} = this.props;
    const startOfWeek = getStartOfWeek(date, locale);
    return (
      <StyledMonthHeader>
        {WEEKDAYS.map(offset => {
          const day = addDays(startOfWeek, offset);
          return (
            <StyledDay $disabled key={offset}>
              {getWeekdayMinInLocale(day, locale)}
            </StyledDay>
          );
        })}
      </StyledMonthHeader>
    );
  };

  renderMonths = () => {
    var monthList = [];
    for (var i = 0; i < this.props.monthsShown; ++i) {
      var monthDate = addMonths(this.state.date, i);
      var monthKey = `month-${i}`;
      monthList.push(this.renderCalendarHeader(monthDate, i));
      monthList.push(
        <StyledCalendarContainer key={monthKey}>
          {this.renderMonthHeader(monthDate, i)}
          <Month
            date={monthDate}
            excludeDates={this.props.excludeDates}
            filterDate={this.props.filterDate}
            highlightDates={this.props.highlightDates}
            highlightedDate={this.props.highlightedDate}
            includeDates={this.props.includeDates}
            locale={this.props.locale}
            maxDate={this.props.maxDate}
            minDate={this.props.minDate}
            month={getMonth(this.state.date)}
            onDayClick={this.props.onDayClick}
            onDayMouseOver={this.props.onDayMouseOver}
            onDayMouseLeave={this.props.onDayMouseLeave}
            onSelect={this.props.onSelect}
            selected={this.props.selected}
            peekNextMonth={this.props.peekNextMonth}
          />
        </StyledCalendarContainer>,
      );
    }
    return monthList;
  };

  render() {
    return <StyledRoot>{this.renderMonths()}</StyledRoot>;
  }
}
