/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {StyledDay} from './styled-components.js';
import {
  formatDate,
  getDay,
  getMonth,
  getDate,
  isAfter,
  isDayInRange,
  isSameDay,
  isStartOfMonth,
  isEndOfMonth,
} from './utils/index.js';
import getDayStateCode from './utils/day-state.js';
import {getOverrides} from '../helpers/overrides.js';
import type {DayPropsT, DayStateT} from './types.js';
import {LocaleContext} from '../locale/index.js';
import type {LocaleT} from '../locale/types.js';

export default class Day extends React.Component<DayPropsT, DayStateT> {
  static defaultProps = {
    disabled: false,
    date: new Date(),
    highlighted: false,
    range: false,
    month: new Date().getMonth(),
    onClick: () => {},
    onSelect: () => {},
    onMouseOver: () => {},
    onMouseLeave: () => {},
    overrides: {},
    peekNextMonth: true,
    value: null,
  };

  dayElm: React.ElementRef<*>;

  state = {
    isHovered: false,
  };

  componentDidMount() {
    if (this.dayElm && this.props.focusedCalendar) {
      if (
        this.props.highlighted ||
        (!this.props.highlightedDate && this.isSelected())
      ) {
        this.dayElm.focus();
      }
    }
  }

  componentDidUpdate(prevProps: DayPropsT) {
    if (this.dayElm && this.props.focusedCalendar) {
      if (
        this.props.highlighted ||
        (!this.props.highlightedDate && this.isSelected())
      ) {
        this.dayElm.focus();
      }
    }
  }

  onSelect(selectedDate: Date) {
    const {range, value} = this.props;
    let date;
    if (Array.isArray(value) && range) {
      if (!value.length || value.length > 1) {
        date = [selectedDate];
      } else if (isAfter(selectedDate, value[0])) {
        date = [value[0], selectedDate];
      } else {
        date = [selectedDate, value[0]];
      }
    } else {
      date = selectedDate;
    }
    this.props.onSelect({date});
  }

  onKeyDown = (event: KeyboardEvent) => {
    const {highlighted, date, disabled} = this.props;
    if (event.key === 'Enter' && highlighted && !disabled) {
      event.preventDefault();
      this.onSelect(date);
    }
  };

  onClick = (event: Event) => {
    const {date, disabled} = this.props;
    if (!disabled) {
      this.props.onClick({event, date});
      this.onSelect(date);
    }
  };

  onMouseOver = (event: Event) => {
    this.setState({isHovered: true});
    this.props.onMouseOver({event, date: this.props.date});
  };

  onMouseLeave = (event: Event) => {
    this.setState({isHovered: false});
    this.props.onMouseLeave({event, date: this.props.date});
  };

  isWeekend = () => {
    const weekday = getDay(this.props.date);
    return weekday === 0 || weekday === 6;
  };

  isOutsideMonth = () => {
    return (
      this.props.month !== undefined &&
      this.props.month !== getMonth(this.props.date)
    );
  };

  isSelected() {
    const {value, date} = this.props;
    if (Array.isArray(value)) {
      return isSameDay(date, value[0]) || isSameDay(date, value[1]);
    } else {
      return isSameDay(date, value);
    }
  }

  // calculated for range case only
  isPseudoSelected() {
    const {date, value} = this.props;
    if (Array.isArray(value) && !value[0] && !value[1]) {
      return false;
    }
    // fix flow by passing a specific arg type and remove 'Array.isArray(value)'
    if (Array.isArray(value) && value.length > 1) {
      return isDayInRange(date, value[0], value[1]);
    }
  }

  // calculated for range case only
  isPseudoHighlighted() {
    const {date, value, highlightedDate} = this.props;
    if (Array.isArray(value) && !value[0] && !value[1]) {
      return false;
    }
    // fix flow by passing a specific arg type and remove 'Array.isArray(value)'
    if (Array.isArray(value) && highlightedDate && value[0] && !value[1]) {
      if (isAfter(highlightedDate, value[0])) {
        return isDayInRange(date, value[0], highlightedDate);
      } else {
        return isDayInRange(date, highlightedDate, value[0]);
      }
    }
  }

  getSharedProps() {
    const {date, value, highlightedDate, range, highlighted} = this.props;
    const $isHighlighted = highlighted;
    const $selected = this.isSelected();
    const $hasRangeHighlighted = !!(
      Array.isArray(value) &&
      range &&
      value.length === 1 &&
      highlightedDate &&
      !isSameDay(value[0], highlightedDate)
    );
    return {
      $date: date,
      $disabled: this.props.disabled,
      $endDate:
        (Array.isArray(value) &&
          this.props.range &&
          $selected &&
          isSameDay(date, value[1])) ||
        false,
      $hasRangeHighlighted,
      $hasRangeOnRight:
        Array.isArray(value) &&
        $hasRangeHighlighted &&
        (highlightedDate && value[0]) &&
        isAfter(highlightedDate, value[0]),
      $hasRangeSelected: Array.isArray(value) ? value.length === 2 : false,
      $highlightedDate: highlightedDate,
      $isHighlighted,
      $isHovered: this.state.isHovered,
      $startOfMonth: isStartOfMonth(date),
      $endOfMonth: isEndOfMonth(date),
      $outsideMonth: this.isOutsideMonth(),
      $peekNextMonth: this.props.peekNextMonth,
      $pseudoHighlighted:
        this.props.range && !$isHighlighted && !$selected
          ? this.isPseudoHighlighted()
          : false,
      $pseudoSelected:
        this.props.range && !$selected ? this.isPseudoSelected() : false,
      $range: this.props.range,
      $selected,
      $startDate:
        Array.isArray(this.props.value) &&
        this.props.value.length > 1 &&
        this.props.range &&
        $selected
          ? isSameDay(date, this.props.value[0])
          : false,
    };
  }

  getAriaLabel(
    sharedProps: {
      $disabled: boolean,
      $range: boolean,
      $selected: boolean,
      $startDate: boolean,
    },
    localeContext: LocaleT,
  ) {
    const {date, locale} = this.props;
    return `${
      sharedProps.$selected
        ? sharedProps.$range
          ? sharedProps.$startDate
            ? localeContext.datepicker.selectedStartDateLabel
            : localeContext.datepicker.selectedEndDateLabel
          : localeContext.datepicker.selectedLabel
        : sharedProps.$disabled
        ? localeContext.datepicker.dateNotAvailableLabel
        : localeContext.datepicker.chooseLabel
    } ${formatDate(date, 'EEEE, MMMM do yyyy', locale)}. ${
      !sharedProps.$disabled ? localeContext.datepicker.dateAvailableLabel : ''
    }`;
  }

  render() {
    const {date, peekNextMonth, overrides = {}} = this.props;
    const sharedProps = this.getSharedProps();
    const [Day, dayProps] = getOverrides(overrides.Day, StyledDay);
    return !peekNextMonth && sharedProps.$outsideMonth ? (
      <Day data-state-code={getDayStateCode(sharedProps)} />
    ) : (
      // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events

      <LocaleContext.Consumer>
        {(locale: LocaleT) => (
          <Day
            data-state-code={getDayStateCode(sharedProps)}
            aria-label={this.getAriaLabel(sharedProps, locale)}
            ref={dayElm => {
              this.dayElm = dayElm;
            }}
            role="cell"
            tabIndex={
              this.props.highlighted ||
              (!this.props.highlightedDate && this.isSelected())
                ? 0
                : -1
            }
            {...sharedProps}
            {...dayProps}
            // Adding event handlers after customers overrides in order to
            // make sure the components functions as expected
            // We can extract the handlers from props overrides
            // and call it along with internal handlers by creating an inline handler
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}
            onClick={this.onClick}
            onKeyDown={this.onKeyDown}
            onMouseOver={this.onMouseOver}
            onMouseLeave={this.onMouseLeave}
          >
            {getDate(date)}
          </Day>
        )}
      </LocaleContext.Consumer>
    );
  }
}
