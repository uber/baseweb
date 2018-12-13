/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {StyledDay} from './styled-components.js';
import {getDay, getMonth, getDate, isSameDay} from './utils/index.js';
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
      this.props.onSelect({date});
      this.props.onClick({event, date});
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
    const {date, peekNextMonth} = this.props;
    const sharedProps = this.getSharedProps();
    return !peekNextMonth && sharedProps.$outsideMonth ? (
      <StyledDay />
    ) : (
      // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
      <StyledDay
        onClick={this.onClick}
        onMouseOver={this.onMouseOver}
        onMouseLeave={this.onMouseLeave}
        aria-label={`day-${getDate(date)}`}
        role="option"
        tabIndex={this.props.selected ? '0' : '-1'}
        {...sharedProps}
      >
        {getDate(date)}
      </StyledDay>
    );
  }
}
