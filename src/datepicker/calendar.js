/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import React from 'react';
import {Button, KIND} from '../button/index.js';
import CalendarHeader from './calendar-header.js';
import Month from './month.js';
import {
  StyledRoot,
  StyledCalendarContainer,
  StyledQuickSelectContainer,
  StyledQuickSelectButtons,
  StyledQuickSelectLabel,
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
  subWeeks,
  subMonths,
  subYears,
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

  getSingleDate(value: ?Date | Array<Date>): ?Date {
    // need to check this.props.isRange but flow would complain
    // at the return value in the else clause
    if (Array.isArray(value)) {
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

  renderQuickSelect = () => {
    const {overrides = {}} = this.props;
    const [QuickSelectContainer, quickSelectContainerProps] = getOverrides(
      overrides.QuickSelectContainer,
      StyledQuickSelectContainer,
    );
    const [QuickSelectLabel, quickSelectLabelProps] = getOverrides(
      overrides.QuickSelectLabel,
      StyledQuickSelectLabel,
    );
    const [QuickSelectButtons, quickSelectButtonsProps] = getOverrides(
      overrides.QuickSelectButtons,
      StyledQuickSelectButtons,
    );

    if (!this.props.isRange || !this.props.enableQuickSelect) {
      return null;
    }

    const NOW = new Date();
    const QUICK_SELECT_ACTIONS = [
      {
        label: 'Past Week',
        beginDate: subWeeks(NOW, 1),
      },
      {
        label: 'Past Month',
        beginDate: subMonths(NOW, 1),
      },
      {
        label: 'Past 3 Months',
        beginDate: subMonths(NOW, 3),
      },
      {
        label: 'Past 6 Months',
        beginDate: subMonths(NOW, 6),
      },
      {
        label: 'Past Year',
        beginDate: subYears(NOW, 1),
      },
      {
        label: 'Past 2 Years',
        beginDate: subYears(NOW, 2),
      },
    ];

    return (
      <QuickSelectContainer {...quickSelectContainerProps}>
        <QuickSelectLabel {...quickSelectLabelProps}>
          Quick Select
        </QuickSelectLabel>
        <QuickSelectButtons {...quickSelectButtonsProps}>
          {QUICK_SELECT_ACTIONS.map(({label, beginDate}) => (
            <Button
              key={label}
              kind={KIND.tertiary}
              onClick={() => {
                this.props.onSelect({date: [beginDate, NOW]});
              }}
              overrides={{
                BaseButton: {
                  style: {
                    flexBasis: 0,
                    flexGrow: 1,
                    marginBottom: '8px',
                    minWidth: '142px',
                    ':nth-of-type(odd)': {
                      marginRight: '8px',
                    },
                  },
                },
              }}
            >
              {label}
            </Button>
          ))}
        </QuickSelectButtons>
      </QuickSelectContainer>
    );
  };

  render() {
    const {overrides = {}} = this.props;
    const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);

    return (
      <Root {...rootProps}>
        {this.renderMonths()}
        {this.renderQuickSelect()}
      </Root>
    );
  }
}
