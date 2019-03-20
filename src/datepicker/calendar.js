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
  addDays,
  addMonths,
  getMonth,
  addWeeks,
  getWeekdayMinInLocale,
  getEffectiveMinDate,
  getEffectiveMaxDate,
  getStartOfWeek,
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
  isSameYear,
  subDays,
  subWeeks,
  subMonths,
  subYears,
} from './utils/index.js';
import {WEEKDAYS} from './constants.js';
import {getOverrides} from '../helpers/overrides.js';
import type {CalendarPropsT, CalendarInternalState} from './types.js';

export default class Calendar extends React.Component<
  CalendarPropsT,
  CalendarInternalState,
> {
  static defaultProps = {
    autoFocusCalendar: false,
    excludeDates: null,
    filterDate: null,
    highlightedDate: null,
    includeDates: null,
    range: false,
    locale: null,
    maxDate: null,
    minDate: null,
    monthsShown: 1,
    onDayClick: () => {},
    onDayMouseOver: () => {},
    onDayMouseLeave: () => {},
    onMonthChange: () => {},
    onYearChange: () => {},
    onChange: () => {},
    overrides: {},
    peekNextMonth: false,
    value: null,
    trapTabbing: false,
  };

  root: ?HTMLElement;
  calendar: ?HTMLElement;

  constructor(props: CalendarPropsT) {
    super(props);
    this.state = {
      highlightedDate:
        this.props.highlightedDate ||
        this.getSingleDate(this.props.value) ||
        new Date(),
      focused: false,
      date: this.getDateInView(),
    };
  }

  componentDidMount() {
    if (this.props.autoFocusCalendar) {
      this.focusCalendar();
    }
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
    if (
      this.props.autoFocusCalendar &&
      this.props.autoFocusCalendar !== prevProps.autoFocusCalendar
    ) {
      this.focusCalendar();
    }
  }

  getSingleDate(value: ?Date | Array<Date>): ?Date {
    // need to check this.props.range but flow would complain
    // at the return value in the else clause
    if (Array.isArray(value)) {
      return value[0] || null;
    }
    return value;
  }

  getDateInView = (): Date => {
    const {highlightedDate, value} = this.props;
    const minDate = getEffectiveMinDate(this.props);
    const maxDate = getEffectiveMaxDate(this.props);
    const current = new Date();
    const initialDate = this.getSingleDate(value) || highlightedDate;
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
    this.setHighlightedDate(date);
    if (this.props.onMonthChange) {
      this.props.onMonthChange({date});
    }
  };

  handleYearChange = (date: Date) => {
    this.setHighlightedDate(date);
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
      <MonthHeader role="presentation" {...monthHeaderProps}>
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

  onKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowDown':
      case 'ArrowLeft':
      case 'ArrowRight':
        this.handleArrowKey(event.key);
        event.preventDefault();
        event.stopPropagation();
        break;
    }
  };

  handleArrowKey = (key: string) => {
    const {highlightedDate: oldDate} = this.state;
    let highlightedDate = oldDate;
    switch (key) {
      case 'ArrowLeft':
        // adding `new Date()` as the last option to satisfy Flow
        highlightedDate = subDays(
          highlightedDate ? highlightedDate : new Date(),
          1,
        );
        break;
      case 'ArrowRight':
        highlightedDate = addDays(
          // adding `new Date()` as the last option to satisfy Flow
          highlightedDate ? highlightedDate : new Date(),
          1,
        );
        break;
      case 'ArrowUp':
        highlightedDate = subWeeks(
          // adding `new Date()` as the last option to satisfy Flow
          highlightedDate ? highlightedDate : new Date(),
          1,
        );
        break;
      case 'ArrowDown':
        highlightedDate = addWeeks(
          // adding `new Date()` as the last option to satisfy Flow
          highlightedDate ? highlightedDate : new Date(),
          1,
        );
        break;
    }
    this.setState({highlightedDate, date: highlightedDate});
  };

  focusCalendar = () => {
    if (!this.state.focused) {
      this.setState({focused: true});
    }
  };

  blurCalendar = () => {
    if (__BROWSER__) {
      const activeElm = document.activeElement;
      if (this.calendar && !this.calendar.contains(activeElm)) {
        this.setState({focused: false});
      }
    }
  };

  handleTabbing = (event: KeyboardEvent) => {
    if (__BROWSER__) {
      if (event.keyCode === 9) {
        const activeElm = document.activeElement;
        // need to look for any tabindex >= 0 and ideally for not disabled
        // focusable by default elements like input, button, etc.
        const focusable = this.root
          ? this.root.querySelectorAll('[tabindex="0"]')
          : null;
        const length = focusable ? focusable.length : 0;
        if (event.shiftKey) {
          if (focusable && activeElm === focusable[0]) {
            event.preventDefault();
            focusable[length - 1].focus();
          }
        } else {
          if (focusable && activeElm === focusable[length - 1]) {
            event.preventDefault();
            focusable[0].focus();
          }
        }
      }
    }
  };

  onDayMouseOver = (data: {event: Event, date: Date}) => {
    const {date} = data;
    this.setState({highlightedDate: date});
    this.props.onDayMouseOver(data);
  };

  onDayMouseLeave = (data: {event: Event, date: Date}) => {
    const {date} = data;
    this.setHighlightedDate(date);
    this.props.onDayMouseLeave(data);
  };

  setHighlightedDate(date: Date) {
    const {value} = this.props;
    const selected = this.getSingleDate(value);
    let nextState;
    if (selected && isSameMonth(selected, date) && isSameYear(selected, date)) {
      nextState = {highlightedDate: selected};
    } else {
      nextState = {
        highlightedDate: date,
      };
    }
    this.setState(nextState);
  }

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
        <CalendarContainer
          key={monthKey}
          $ref={calendar => {
            this.calendar = calendar;
          }}
          onKeyDown={this.onKeyDown}
          {...calendarContainerProps}
        >
          {this.renderMonthHeader(monthDate, i)}
          <Month
            date={monthDate}
            excludeDates={this.props.excludeDates}
            filterDate={this.props.filterDate}
            highlightedDate={this.state.highlightedDate}
            includeDates={this.props.includeDates}
            focusedCalendar={this.state.focused}
            range={this.props.range}
            locale={this.props.locale}
            maxDate={this.props.maxDate}
            minDate={this.props.minDate}
            month={getMonth(this.state.date)}
            onDayBlur={this.blurCalendar}
            onDayFocus={this.focusCalendar}
            onDayClick={this.props.onDayClick}
            onDayMouseOver={this.onDayMouseOver}
            onDayMouseLeave={this.onDayMouseLeave}
            onChange={this.props.onChange}
            overrides={overrides}
            value={this.props.value}
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

    if (!this.props.range || !this.props.quickSelect) {
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
              tabIndex={0}
              kind={KIND.tertiary}
              onClick={() => {
                this.props.onChange({date: [beginDate, NOW]});
              }}
              overrides={{
                BaseButton: {
                  style: {
                    flexBasis: 0,
                    flexGrow: 1,
                    marginBottom: '8px',
                    paddingLeft: 0,
                    paddingRight: 0,
                    marginLeft: 0,
                    marginRight: 0,
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
      <Root
        data-baseweb="calendar"
        $ref={root => {
          this.root = root;
        }}
        role="application"
        aria-label="calendar"
        onKeyDown={this.props.trapTabbing ? this.handleTabbing : null}
        {...rootProps}
      >
        {this.renderMonths()}
        {this.renderQuickSelect()}
      </Root>
    );
  }
}
