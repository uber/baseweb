/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {StyledDay} from './styled-components.js';
import {
  getDay,
  getMonth,
  getDate,
  isSameDay,
  isDayInRange,
  isAfter,
} from './utils/index.js';
import {getOverrides} from '../helpers/overrides.js';
import type {DayPropsT, DayStateT} from './types.js';

export default class Day extends React.Component<DayPropsT, DayStateT> {
  static defaultProps = {
    disabled: false,
    date: new Date(),
    isHighlighted: false,
    isRange: false,
    month: new Date().getMonth(),
    onClick: () => {},
    onSelect: () => {},
    onMouseOver: () => {},
    onMouseLeave: () => {},
    overrides: {},
    peekNextMonth: true,
    value: null,
  };

  state = {
    isHovered: false,
  };

  componentDidMount() {
    if (this.props.isHighlighted) {
      if (__BROWSER__) {
        document.addEventListener('keydown', this.onKeyDown);
      }
    }
  }

  componentDidUpdate(prevProps: DayPropsT) {
    if (
      this.props.isHighlighted &&
      this.props.isHighlighted !== prevProps.isHighlighted
    ) {
      if (__BROWSER__) {
        document.addEventListener('keydown', this.onKeyDown);
      }
    } else if (
      !this.props.isHighlighted &&
      this.props.isHighlighted !== prevProps.isHighlighted
    ) {
      if (__BROWSER__) {
        document.removeEventListener('keydown', this.onKeyDown);
      }
    }
  }

  componentWillUnmount() {
    if (__BROWSER__) {
      document.removeEventListener('keydown', this.onKeyDown);
    }
  }

  onSelect(selectedDate) {
    const {isRange, value} = this.props;
    let date;
    if (isRange) {
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
    const {isHighlighted, date, disabled} = this.props;
    if (event.key === 'Enter' && isHighlighted && !disabled) {
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
    if (this.props.isRange) {
      return (
        isSameDay(this.props.date, this.props.value[0]) ||
        isSameDay(this.props.date, this.props.value[1])
      );
    } else {
      return isSameDay(this.props.date, this.props.value);
    }
  }

  // calculated for range case only
  isPseudoSelected() {
    const {date, value} = this.props;
    if (value.length > 1) {
      return isDayInRange(date, value[0], value[1]);
    }
  }

  // calculated for range case only
  isPseudoHighlighted() {
    const {date, value, highlightedDate} = this.props;
    if (highlightedDate && value[0] && !value[1]) {
      if (isAfter(highlightedDate, value[0])) {
        return isDayInRange(date, value[0], highlightedDate);
      } else {
        return isDayInRange(date, highlightedDate, value[0]);
      }
    }
  }

  getSharedProps() {
    const {date} = this.props;
    const $isHighlighted = isSameDay(date, this.props.highlightedDate);
    const $selected = this.isSelected(date);
    const $hasRangeHighlighted =
      this.props.isRange &&
      this.props.value.length === 1 &&
      this.props.highlightedDate &&
      !isSameDay(this.props.value[0], this.props.highlightedDate)
        ? true
        : false;
    return {
      $date: date,
      $disabled: this.props.disabled,
      $endDate:
        (this.props.isRange &&
          $selected &&
          isSameDay(date, this.props.value[1])) ||
        false,
      $isHovered: this.state.isHovered,
      $isHighlighted,
      $isRange: this.props.isRange,
      $hasRangeHighlighted,
      $hasRangeOnRight:
        $hasRangeHighlighted &&
        isAfter(this.props.highlightedDate, this.props.value[0]),
      $hasRangeSelected: this.props.value.length === 2,
      $highlightedDate: this.props.highlightedDate,
      $peekNextMonth: this.props.peekNextMonth,
      $pseudoHighlighted:
        this.props.isRange && !$isHighlighted && !$selected
          ? this.isPseudoHighlighted()
          : false,
      $pseudoSelected:
        this.props.isRange && !$selected ? this.isPseudoSelected() : false,
      $selected,
      $startDate:
        this.props.isRange && $selected
          ? isSameDay(date, this.props.value[0])
          : false,
      $outsideMonth: this.isOutsideMonth(),
    };
  }

  render() {
    const {date, peekNextMonth, overrides = {}} = this.props;
    const sharedProps = this.getSharedProps();
    const [Day, dayProps] = getOverrides(overrides.Day, StyledDay);
    return !peekNextMonth && sharedProps.$outsideMonth ? (
      <Day />
    ) : (
      // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
      <Day
        aria-label={`day-${getDate(date)}`}
        role="option"
        tabIndex={sharedProps.$selected ? '0' : '-1'}
        {...sharedProps}
        {...dayProps}
        // Adding event handlers after customers overrides in order to
        // make sure the components functions as expected
        // We can extract the handlers from props overrides
        // and call it along with internal handlers by creating an inline handler
        onClick={this.onClick}
        onMouseOver={this.onMouseOver}
        onMouseLeave={this.onMouseLeave}
      >
        {getDate(date)}
      </Day>
    );
  }
}
