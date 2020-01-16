/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {FormControl} from '../form-control/index.js';
import {LocaleContext} from '../locale/index.js';
import {Select} from '../select/index.js';
import CalendarHeader from './calendar-header.js';
import Month from './month.js';
import TimePicker from '../timepicker/timepicker.js';
import {
  StyledCalendarContainer,
  StyledMonthContainer,
  StyledRoot,
  StyledSelectorContainer,
} from './styled-components.js';
import {
  addDays,
  addMonths,
  getMonth,
  addWeeks,
  getEffectiveMinDate,
  getEffectiveMaxDate,
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
  isSameYear,
  subDays,
  subWeeks,
  subMonths,
  subYears,
  setHours,
  setMinutes,
  setSeconds,
  getHours,
  getMinutes,
  getStartOfWeek,
  getEndOfWeek,
} from './utils/index.js';
import {getOverrides, mergeOverrides} from '../helpers/overrides.js';
import type {CalendarPropsT, CalendarInternalState} from './types.js';
import {ORIENTATION} from './constants.js';

function applyTime(prev: ?Date, next: Date) {
  if (!prev) return next;
  const hours = setHours(next, getHours(prev));
  const minutes = setMinutes(hours, getMinutes(prev));
  const seconds = setSeconds(minutes, 0);
  return seconds;
}

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
    onDayClick: () => {},
    onDayMouseOver: () => {},
    onDayMouseLeave: () => {},
    onMonthChange: () => {},
    onYearChange: () => {},
    onChange: () => {},
    orientation: ORIENTATION.vertical,
    overrides: {},
    peekNextMonth: false,
    value: null,
    trapTabbing: false,
  };

  calendar: React.ElementRef<*>;

  constructor(props: CalendarPropsT) {
    super(props);
    this.state = {
      highlightedDate:
        this.props.highlightedDate ||
        this.getSingleDate(this.props.value) ||
        new Date(),
      focused: false,
      date: this.getDateInView(),
      quickSelectId: null,
      rootElement: null,
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

    if (prevProps.value !== this.props.value) {
      this.setState({
        date: this.getDateInView(),
      });
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
        popoverMountNode={this.state.rootElement}
      />
    );
  };

  onKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowDown':
      case 'ArrowLeft':
      case 'ArrowRight':
      case 'Home':
      case 'End':
      case 'PageUp':
      case 'PageDown':
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
      case 'Home':
        highlightedDate = getStartOfWeek(
          // adding `new Date()` as the last option to satisfy Flow
          highlightedDate ? highlightedDate : new Date(),
        );
        break;
      case 'End':
        highlightedDate = getEndOfWeek(
          // adding `new Date()` as the last option to satisfy Flow
          highlightedDate ? highlightedDate : new Date(),
        );
        break;
      case 'PageUp':
        highlightedDate = subMonths(
          // adding `new Date()` as the last option to satisfy Flow
          highlightedDate ? highlightedDate : new Date(),
          1,
        );
        break;
      case 'PageDown':
        highlightedDate = addMonths(
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
        const focusable = this.state.rootElement
          ? this.state.rootElement.querySelectorAll('[tabindex="0"]')
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
    this.props.onDayMouseOver && this.props.onDayMouseOver(data);
  };

  onDayMouseLeave = (data: {event: Event, date: Date}) => {
    const {date} = data;
    this.setHighlightedDate(date);
    this.props.onDayMouseLeave && this.props.onDayMouseLeave(data);
  };

  handleDateChange = (data: {date: ?Date | Array<Date>}) => {
    const {onChange = params => {}} = this.props;
    if (Array.isArray(data.date)) {
      const dates = data.date.map((date, index) => {
        const values = [].concat(this.props.value);
        return applyTime(values[index], date);
      });
      onChange({date: dates});
    } else if (!Array.isArray(this.props.value) && data.date) {
      const nextDate = applyTime(this.props.value, data.date);
      onChange({date: nextDate});
    } else {
      onChange({date: data.date});
    }
  };

  handleTimeChange = (time: Date, index: number) => {
    const {onChange = params => {}} = this.props;
    if (Array.isArray(this.props.value)) {
      const dates = this.props.value.map((date, i) => {
        if (index === i) {
          return applyTime(date, time);
        }
        return date;
      });
      onChange({date: dates});
    } else {
      const date = applyTime(this.props.value, time);
      onChange({date});
    }
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
    const [MonthContainer, monthContainerProps] = getOverrides(
      overrides.MonthContainer,
      StyledMonthContainer,
    );

    for (let i = 0; i < (this.props.monthsShown || 1); ++i) {
      const monthSubComponents = [];
      const monthDate = addMonths(this.state.date, i);
      const monthKey = `month-${i}`;
      monthSubComponents.push(this.renderCalendarHeader(monthDate, i));
      monthSubComponents.push(
        <CalendarContainer
          key={monthKey}
          ref={calendar => {
            this.calendar = calendar;
          }}
          role="grid"
          aria-multiselectable={this.props.range || null}
          onKeyDown={this.onKeyDown}
          {...calendarContainerProps}
        >
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
            onChange={this.handleDateChange}
            overrides={overrides}
            value={this.props.value}
            peekNextMonth={this.props.peekNextMonth}
          />
        </CalendarContainer>,
      );
      monthList.push(
        <div key={`month-component-${i}`}>{monthSubComponents}</div>,
      );
    }
    return (
      <MonthContainer {...monthContainerProps}>{monthList}</MonthContainer>
    );
  };

  // eslint-disable-next-line flowtype/no-weak-types
  renderTimeSelect = (value: ?Date, onChange: Function, label: string) => {
    const {overrides = {}} = this.props;
    const [TimeSelectContainer, timeSelectContainerProps] = getOverrides(
      overrides.TimeSelectContainer,
      StyledSelectorContainer,
    );
    const [TimeSelectFormControl, timeSelectFormControlProps] = getOverrides(
      overrides.TimeSelectFormControl,
      FormControl,
    );
    const [TimeSelect, timeSelectProps] = getOverrides(
      overrides.TimeSelect,
      TimePicker,
    );

    return (
      <TimeSelectContainer {...timeSelectContainerProps}>
        <TimeSelectFormControl label={label} {...timeSelectFormControlProps}>
          <TimeSelect value={value} onChange={onChange} {...timeSelectProps} />
        </TimeSelectFormControl>
      </TimeSelectContainer>
    );
  };

  renderQuickSelect = () => {
    const {overrides = {}} = this.props;
    const [QuickSelectContainer, quickSelectContainerProps] = getOverrides(
      overrides.QuickSelectContainer,
      StyledSelectorContainer,
    );
    const [QuickSelectFormControl, quickSelectFormControlProps] = getOverrides(
      overrides.QuickSelectFormControl,
      FormControl,
    );
    const [
      QuickSelect,
      // $FlowFixMe
      {overrides: quickSelectOverrides, ...restQuickSelectProps},
    ] = getOverrides(
      //
      overrides.QuickSelect,
      Select,
    );

    if (!this.props.quickSelect) {
      return null;
    }

    const NOW = new Date();
    NOW.setHours(12, 0, 0);

    return (
      <LocaleContext.Consumer>
        {locale => (
          <QuickSelectContainer {...quickSelectContainerProps}>
            <QuickSelectFormControl
              label={locale.datepicker.quickSelectLabel}
              {...quickSelectFormControlProps}
            >
              <QuickSelect
                mountNode={this.state.rootElement}
                aria-label={locale.datepicker.quickSelectAriaLabel}
                labelKey="id"
                onChange={params => {
                  if (!params.option) {
                    this.setState({quickSelectId: null});
                    this.props.onChange && this.props.onChange({date: []});
                  } else {
                    this.setState({quickSelectId: params.option.id});
                    if (this.props.onChange) {
                      if (this.props.range) {
                        this.props.onChange({
                          date: [
                            params.option.beginDate,
                            params.option.endDate || NOW,
                          ],
                        });
                      } else {
                        this.props.onChange({date: params.option.beginDate});
                      }
                    }
                  }
                }}
                options={
                  this.props.quickSelectOptions || [
                    {
                      id: locale.datepicker.pastWeek,
                      beginDate: subWeeks(NOW, 1),
                    },
                    {
                      id: locale.datepicker.pastMonth,
                      beginDate: subMonths(NOW, 1),
                    },
                    {
                      id: locale.datepicker.pastThreeMonths,
                      beginDate: subMonths(NOW, 3),
                    },
                    {
                      id: locale.datepicker.pastSixMonths,
                      beginDate: subMonths(NOW, 6),
                    },
                    {
                      id: locale.datepicker.pastYear,
                      beginDate: subYears(NOW, 1),
                    },
                    {
                      id: locale.datepicker.pastTwoYears,
                      beginDate: subYears(NOW, 2),
                    },
                  ]
                }
                placeholder={locale.datepicker.quickSelectPlaceholder}
                value={
                  this.state.quickSelectId && [{id: this.state.quickSelectId}]
                }
                overrides={mergeOverrides(
                  {
                    Dropdown: {
                      style: {
                        textAlign: 'start',
                      },
                    },
                  },
                  quickSelectOverrides,
                )}
                {...restQuickSelectProps}
              />
            </QuickSelectFormControl>
          </QuickSelectContainer>
        )}
      </LocaleContext.Consumer>
    );
  };

  render() {
    const {overrides = {}} = this.props;
    const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);
    const [startDate, endDate] = [].concat(this.props.value);

    return (
      <LocaleContext.Consumer>
        {locale => (
          <Root
            data-baseweb="calendar"
            ref={root => {
              if (
                root &&
                root instanceof HTMLElement &&
                !this.state.rootElement
              ) {
                this.setState({rootElement: (root: HTMLElement)});
              }
            }}
            aria-label="calendar"
            onKeyDown={this.props.trapTabbing ? this.handleTabbing : null}
            {...rootProps}
          >
            {this.renderMonths()}
            {this.props.timeSelectStart &&
              this.renderTimeSelect(
                startDate,
                time => this.handleTimeChange(time, 0),
                locale.datepicker.timeSelectStartLabel,
              )}
            {this.props.timeSelectEnd &&
              this.props.range &&
              this.renderTimeSelect(
                endDate,
                time => this.handleTimeChange(time, 1),
                locale.datepicker.timeSelectEndLabel,
              )}
            {this.renderQuickSelect()}
          </Root>
        )}
      </LocaleContext.Consumer>
    );
  }
}
