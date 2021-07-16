/*
Copyright (c) Uber Technologies, Inc.

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
import type {DateIOAdapter} from './utils/types.js';
import {
  StyledCalendarContainer,
  StyledMonthContainer,
  StyledRoot,
  StyledSelectorContainer,
} from './styled-components.js';
import dateFnsAdapter from './utils/date-fns-adapter.js';
import DateHelpers from './utils/date-helpers.js';
import {
  getOverrides,
  withOverrides,
  mergeOverrides,
} from '../helpers/overrides.js';
import type {
  CalendarPropsT,
  CalendarInternalState,
  CalendarPropsDefaultT,
} from './types.js';
import {ORIENTATION} from './constants.js';

class Calendar<T = Date> extends React.Component<
  CalendarPropsT<T>,
  CalendarInternalState<T>,
> {
  static defaultProps: {adapter: DateIOAdapter<Date>} = {
    autoFocusCalendar: false,
    dateLabel: null,
    excludeDates: null,
    filterDate: null,
    highlightedDate: null,
    includeDates: null,
    range: false,
    locale: null,
    maxDate: null,
    minDate: null,
    onDayClick: () => {},
    onDayFocus: () => {},
    onDayMouseOver: () => {},
    onDayMouseLeave: () => {},
    onMonthChange: () => {},
    onYearChange: () => {},
    onChange: () => {},
    orientation: ORIENTATION.horizontal,
    overrides: {},
    peekNextMonth: false,
    adapter: dateFnsAdapter,
    value: null,
    trapTabbing: false,
  };

  dateHelpers: DateHelpers<T>;

  calendar: React.ElementRef<*>;

  constructor(props: CalendarPropsT<T>) {
    super(props);

    const {highlightedDate, value, adapter} = this.props;
    this.dateHelpers = new DateHelpers(adapter);
    const dateInView = this.getDateInView();
    let time = [];
    if (Array.isArray(value)) {
      time = [...value];
    } else if (value) {
      time = [value];
    }
    this.state = {
      highlightedDate:
        this.getSingleDate(value) ||
        (highlightedDate &&
        this.dateHelpers.isSameMonth(dateInView, highlightedDate)
          ? highlightedDate
          : this.dateHelpers.date()),
      focused: false,
      date: dateInView,
      quickSelectId: null,
      rootElement: null,
      time,
    };
  }

  componentDidMount() {
    if (this.props.autoFocusCalendar) {
      this.focusCalendar();
    }
  }

  componentDidUpdate(prevProps: CalendarPropsT<T>) {
    if (
      this.props.highlightedDate &&
      !this.dateHelpers.isSameDay(
        this.props.highlightedDate,
        prevProps.highlightedDate,
      )
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
      const nextDate = this.getDateInView();
      if (!this.isInView(nextDate)) {
        this.setState({
          date: nextDate,
        });
      }
    }
  }

  isInView(date: T): boolean {
    // we calculate the month delta between the date arg and the date in the state.
    const currentDate = this.state.date;

    // First we get the year delta
    const yearDelta =
      this.dateHelpers.getYear(date) - this.dateHelpers.getYear(currentDate);

    // then we convert it to months. Then we simply add the date-without-year month delta back in.
    const monthDelta =
      yearDelta * 12 +
      this.dateHelpers.getMonth(date) -
      this.dateHelpers.getMonth(currentDate);

    // we just check that the delta is between the range given by "this month" (i.e. 0) and "the last month" (i.e. monthsShown)
    return monthDelta >= 0 && monthDelta < (this.props.monthsShown || 1);
  }

  getSingleDate(value: ?T | Array<T>): ?T {
    // need to check this.props.range but flow would complain
    // at the return value in the else clause
    if (Array.isArray(value)) {
      return value[0] || null;
    }
    return value;
  }

  getDateInView: () => T = () => {
    const {highlightedDate, value} = this.props;
    const minDate = this.dateHelpers.getEffectiveMinDate(this.props);
    const maxDate = this.dateHelpers.getEffectiveMaxDate(this.props);
    const current = this.dateHelpers.date();
    const initialDate = this.getSingleDate(value) || highlightedDate;
    if (initialDate) {
      return initialDate;
    } else {
      if (minDate && this.dateHelpers.isBefore(current, minDate)) {
        return minDate;
      } else if (maxDate && this.dateHelpers.isAfter(current, maxDate)) {
        return maxDate;
      }
    }
    return current;
  };

  handleMonthChange: T => void = date => {
    this.setHighlightedDate(this.dateHelpers.getStartOfMonth(date));
    if (this.props.onMonthChange) {
      this.props.onMonthChange({date});
    }
  };

  handleYearChange: T => void = date => {
    this.setHighlightedDate(date);
    if (this.props.onYearChange) {
      this.props.onYearChange({date});
    }
  };

  changeMonth: ({date: T}) => mixed = ({date}) => {
    this.setState({date: date}, () => this.handleMonthChange(this.state.date));
  };

  changeYear: ({date: T}) => mixed = ({date}) => {
    this.setState({date: date}, () => this.handleYearChange(this.state.date));
  };

  renderCalendarHeader: (T, number) => React.Node = (
    date = this.state.date,
    order,
  ) => {
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
    const currentDate = this.dateHelpers.date();
    switch (key) {
      case 'ArrowLeft':
        // adding `new Date()` as the last option to satisfy Flow
        highlightedDate = this.dateHelpers.subDays(
          highlightedDate ? highlightedDate : currentDate,
          1,
        );
        break;
      case 'ArrowRight':
        highlightedDate = this.dateHelpers.addDays(
          // adding `new Date()` as the last option to satisfy Flow
          highlightedDate ? highlightedDate : currentDate,
          1,
        );
        break;
      case 'ArrowUp':
        highlightedDate = this.dateHelpers.subWeeks(
          // adding `new Date()` as the last option to satisfy Flow
          highlightedDate ? highlightedDate : currentDate,
          1,
        );
        break;
      case 'ArrowDown':
        highlightedDate = this.dateHelpers.addWeeks(
          // adding `new Date()` as the last option to satisfy Flow
          highlightedDate ? highlightedDate : currentDate,
          1,
        );
        break;
      case 'Home':
        highlightedDate = this.dateHelpers.getStartOfWeek(
          // adding `new Date()` as the last option to satisfy Flow
          highlightedDate ? highlightedDate : currentDate,
        );
        break;
      case 'End':
        highlightedDate = this.dateHelpers.getEndOfWeek(
          // adding `new Date()` as the last option to satisfy Flow
          highlightedDate ? highlightedDate : currentDate,
        );
        break;
      case 'PageUp':
        highlightedDate = this.dateHelpers.subMonths(
          // adding `new Date()` as the last option to satisfy Flow
          highlightedDate ? highlightedDate : currentDate,
          1,
        );
        break;
      case 'PageDown':
        highlightedDate = this.dateHelpers.addMonths(
          // adding `new Date()` as the last option to satisfy Flow
          highlightedDate ? highlightedDate : currentDate,
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

  onDayFocus: ({event: Event, date: T}) => mixed = data => {
    const {date} = data;
    this.setState({highlightedDate: date});
    this.focusCalendar();
    this.props.onDayFocus && this.props.onDayFocus(data);
  };

  onDayMouseOver: ({event: Event, date: T}) => mixed = data => {
    const {date} = data;
    this.setState({highlightedDate: date});
    this.props.onDayMouseOver && this.props.onDayMouseOver(data);
  };

  onDayMouseLeave: ({event: Event, date: T}) => mixed = data => {
    const {date} = data;
    const {value} = this.props;
    const selected = this.getSingleDate(value);
    this.setState({highlightedDate: selected || date});
    this.props.onDayMouseLeave && this.props.onDayMouseLeave(data);
  };

  handleDateChange: ({date: ?T | Array<T>}) => void = data => {
    const {onChange = params => {}} = this.props;
    let updatedDate = data.date;
    // We'll need to update the date in time values of internal state
    const newTimeState = [...this.state.time];
    // Apply the currently selected time values (saved in state) to the updated date
    if (Array.isArray(data.date)) {
      updatedDate = data.date.map((date, index) => {
        newTimeState[index] = this.dateHelpers.applyDateToTime(
          newTimeState[index],
          date,
        );
        return newTimeState[index];
      });
    } else if (!Array.isArray(this.props.value) && data.date) {
      newTimeState[0] = this.dateHelpers.applyDateToTime(
        newTimeState[0],
        data.date,
      );
      updatedDate = newTimeState[0];
    }
    // Update the date in time values of internal state
    this.setState({time: newTimeState});
    onChange({date: updatedDate});
  };

  handleTimeChange = (time: T, index: number) => {
    const {onChange = params => {}} = this.props;
    // Save/update the time value in internal state
    const newTimeState = [...this.state.time];
    newTimeState[index] = this.dateHelpers.applyTimeToDate(
      newTimeState[index],
      time,
    );
    this.setState({time: newTimeState});
    // Time change calls calendar's onChange handler
    // with the date value set to the date with updated time
    if (Array.isArray(this.props.value)) {
      const dates = this.props.value.map((date, i) => {
        if (index === i) {
          return this.dateHelpers.applyTimeToDate(date, time);
        }
        return date;
      });
      onChange({date: dates});
    } else {
      const date = this.dateHelpers.applyTimeToDate(this.props.value, time);
      onChange({date});
    }
  };

  setHighlightedDate(date: T) {
    const {value} = this.props;
    const selected = this.getSingleDate(value);
    let nextState;
    if (
      selected &&
      this.dateHelpers.isSameMonth(selected, date) &&
      this.dateHelpers.isSameYear(selected, date)
    ) {
      nextState = {highlightedDate: selected};
    } else {
      nextState = {
        highlightedDate: date,
      };
    }
    this.setState(nextState);
  }

  renderMonths = (translations: {ariaRoleDescCalMonth: string}) => {
    const {overrides = {}, orientation} = this.props;
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
      const monthDate = this.dateHelpers.addMonths(this.state.date, i);
      const monthKey = `month-${i}`;
      monthSubComponents.push(this.renderCalendarHeader(monthDate, i));
      monthSubComponents.push(
        <CalendarContainer
          key={monthKey}
          ref={calendar => {
            this.calendar = calendar;
          }}
          role="grid"
          aria-roledescription={translations.ariaRoleDescCalMonth}
          aria-multiselectable={this.props.range || null}
          onKeyDown={this.onKeyDown}
          {...calendarContainerProps}
        >
          <Month
            adapter={this.props.adapter}
            date={monthDate}
            dateLabel={this.props.dateLabel}
            excludeDates={this.props.excludeDates}
            filterDate={this.props.filterDate}
            highlightedDate={this.state.highlightedDate}
            includeDates={this.props.includeDates}
            focusedCalendar={this.state.focused}
            range={this.props.range}
            locale={this.props.locale}
            maxDate={this.props.maxDate}
            minDate={this.props.minDate}
            month={this.dateHelpers.getMonth(this.state.date)}
            onDayBlur={this.blurCalendar}
            onDayFocus={this.onDayFocus}
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
      <MonthContainer $orientation={orientation} {...monthContainerProps}>
        {monthList}
      </MonthContainer>
    );
  };

  // eslint-disable-next-line flowtype/no-weak-types
  renderTimeSelect: (?T, Function, string) => React.Node = (
    value,
    onChange,
    label,
  ) => {
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
          <TimeSelect
            value={value ? this.dateHelpers.date(value) : value}
            onChange={onChange}
            nullable
            {...timeSelectProps}
          />
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

    const NOW = this.dateHelpers.set(this.dateHelpers.date(), {
      hours: 12,
      minutes: 0,
      seconds: 0,
    });

    return (
      <LocaleContext.Consumer>
        {locale => (
          <QuickSelectContainer {...quickSelectContainerProps}>
            <QuickSelectFormControl
              label={locale.datepicker.quickSelectLabel}
              {...quickSelectFormControlProps}
            >
              <QuickSelect
                aria-label={locale.datepicker.quickSelectAriaLabel}
                labelKey="id"
                onChange={params => {
                  if (!params.option) {
                    this.setState({quickSelectId: null});
                    this.props.onChange && this.props.onChange({date: []});
                  } else {
                    this.setState({
                      quickSelectId: params.option.id,
                    });
                    if (this.props.onChange) {
                      if (this.props.range) {
                        this.props.onChange({
                          date: [
                            params.option.beginDate,
                            params.option.endDate || NOW,
                          ],
                        });
                      } else {
                        this.props.onChange({
                          date: params.option.beginDate,
                        });
                      }
                    }
                  }
                }}
                options={
                  this.props.quickSelectOptions || [
                    {
                      id: locale.datepicker.pastWeek,
                      beginDate: this.dateHelpers.subWeeks(NOW, 1),
                    },
                    {
                      id: locale.datepicker.pastMonth,
                      beginDate: this.dateHelpers.subMonths(NOW, 1),
                    },
                    {
                      id: locale.datepicker.pastThreeMonths,
                      beginDate: this.dateHelpers.subMonths(NOW, 3),
                    },
                    {
                      id: locale.datepicker.pastSixMonths,
                      beginDate: this.dateHelpers.subMonths(NOW, 6),
                    },
                    {
                      id: locale.datepicker.pastYear,
                      beginDate: this.dateHelpers.subYears(NOW, 1),
                    },
                    {
                      id: locale.datepicker.pastTwoYears,
                      beginDate: this.dateHelpers.subYears(NOW, 2),
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
            role="application"
            aria-roledescription="datepicker"
            ref={root => {
              if (
                root &&
                root instanceof HTMLElement &&
                !this.state.rootElement
              ) {
                this.setState({
                  rootElement: (root: HTMLElement),
                });
              }
            }}
            aria-label={locale.datepicker.ariaLabelCalendar}
            onKeyDown={this.props.trapTabbing ? this.handleTabbing : null}
            {...rootProps}
          >
            {this.renderMonths({
              ariaRoleDescCalMonth:
                locale.datepicker.ariaRoleDescriptionCalendarMonth,
            })}
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

export default withOverrides<
  // eslint-disable-next-line flowtype/no-weak-types
  React.Config<CalendarPropsT<any>, CalendarPropsDefaultT<any>>,
  mixed,
>(Calendar, 'Calendar');
