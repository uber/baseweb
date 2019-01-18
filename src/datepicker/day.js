/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {StyledDay} from './styled-components.js';
import {getDay, getMonth, getDate, isSameDay} from './utils/index.js';
import {getOverrides} from '../helpers/overrides.js';
import type {DayPropsT, DayStateT} from './types.js';

export default class Day extends React.Component<DayPropsT, DayStateT> {
  static defaultProps = {
    disabled: false,
    date: new Date(),
    isHighlighted: false,
    month: new Date().getMonth(),
    onClick: () => {},
    onSelect: () => {},
    onMouseOver: () => {},
    onMouseLeave: () => {},
    overrides: {},
    peekNextMonth: true,
    selected: false,
    // pseudoSelected: false,
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

  onKeyDown = (event: KeyboardEvent) => {
    const {isHighlighted, date, disabled, onSelect} = this.props;
    if (event.key === 'Enter' && isHighlighted && !disabled) {
      event.preventDefault();
      onSelect({date});
    }
  };

  onClick = (event: Event) => {
    const {date, disabled} = this.props;
    if (!disabled) {
      this.props.onClick({event, date});
      this.props.onSelect({date});
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

  getSharedProps() {
    return {
      $disabled: this.props.disabled,
      $isHovered: this.state.isHovered,
      $isHighlighted: this.props.isHighlighted,
      // $pseudoSelected: this.props.pseudoSelected,
      $selected: this.props.selected,
      $today: isSameDay(this.props.date, new Date()),
      $weekend: this.isWeekend(),
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
        tabIndex={this.props.selected ? '0' : '-1'}
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
