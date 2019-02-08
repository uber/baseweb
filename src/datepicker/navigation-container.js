/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {STATE_CHANGE_TYPE} from './constants.js';
import {
  addDays,
  isSameMonth,
  isSameYear,
  subDays,
  addWeeks,
  subWeeks,
} from './utils/index.js';
import type {
  NavigationContainerStateT,
  NavigationContainerPropsT,
  StateChangeTypeT,
  NavigationContainerStateReducerT,
} from './types.js';

const defaultStateReducer: NavigationContainerStateReducerT = (
  type,
  nextState,
) => nextState;

class NavigationContainer extends React.Component<
  NavigationContainerPropsT,
  NavigationContainerStateT,
> {
  static defaultProps = {
    stateReducer: defaultStateReducer,
    onDayMouseOver: () => {},
    onDayMouseLeave: () => {},
    onChange: () => {},
    trapTabbing: false,
  };

  root: ?HTMLElement;

  state = {
    highlightedDate:
      this.props.highlightedDate ||
      this.getSingleDate(this.props.value) ||
      new Date(),
    isActive: false,
    lastHighlightedDate:
      this.props.highlightedDate ||
      this.getSingleDate(this.props.value) ||
      new Date(),
  };

  componentDidMount() {
    if (__BROWSER__) {
      if (this.props.trapTabbing) {
        document.addEventListener('keydown', this.handleTabbing);
      }
    }
  }

  componentWillUnmount() {
    if (__BROWSER__) {
      if (this.props.trapTabbing) {
        document.removeEventListener('keydown', this.handleTabbing);
      }
    }
  }

  setActiveState = (isActive: boolean, {root}: {root: ?HTMLElement}) => {
    if (__BROWSER__) {
      this.root = root;
      const method = isActive ? 'addEventListener' : 'removeEventListener';
      // $FlowFixMe
      document[method]('keydown', this.onKeyDown);
      this.internalSetState(null, {isActive});
    }
  };

  getSingleDate(value: ?Date | Array<Date>): ?Date {
    if (Array.isArray(value)) {
      return value[0] || null;
    } else {
      return value;
    }
  }

  onChange = (data: {date: ?Date | Array<Date>}) => {
    this.props.onChange(data);
  };

  onMonthChange = (data: {date: Date}) => {
    const {date} = data;
    this.setHighlightedDate(date);
    if (this.props.onMonthChange) {
      this.props.onMonthChange(data);
    }
  };

  onYearChange = (data: {date: Date}) => {
    const {date} = data;
    this.setHighlightedDate(date);
    if (this.props.onYearChange) {
      this.props.onYearChange(data);
    }
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
    const {stateReducer} = this.props;
    this.setState(prevState =>
      stateReducer(
        STATE_CHANGE_TYPE.mouseOver,
        {highlightedDate: date},
        prevState,
      ),
    );
    this.props.onDayMouseOver(data);
  };

  onDayMouseLeave = (data: {event: Event, date: Date}) => {
    const {date} = data;
    this.setHighlightedDate(date);
    this.props.onDayMouseLeave(data);
  };

  setHighlightedDate(date: Date) {
    const {stateReducer, value} = this.props;
    const selected = this.getSingleDate(value);
    let nextState;
    if (selected && isSameMonth(selected, date) && isSameYear(selected, date)) {
      nextState = {highlightedDate: selected};
    } else {
      nextState = {
        lastHighlightedDate: date,
        highlightedDate: null,
      };
    }
    this.setState(prevState =>
      stateReducer(STATE_CHANGE_TYPE.mouseLeave, nextState, prevState),
    );
  }

  handleArrowKey(key: string) {
    const {highlightedDate: oldDate, lastHighlightedDate} = this.state;
    let highlightedDate = oldDate ? oldDate : null;
    let stateChangeType = null;
    switch (key) {
      case 'ArrowLeft':
        // adding `new Date()` as the last option to satisfy Fow
        highlightedDate = subDays(
          highlightedDate ? highlightedDate : lastHighlightedDate || new Date(),
          1,
        );
        stateChangeType = STATE_CHANGE_TYPE.moveLeft;
        break;
      case 'ArrowRight':
        highlightedDate = addDays(
          // adding `new Date()` as the last option to satisfy Fow
          highlightedDate ? highlightedDate : lastHighlightedDate || new Date(),
          1,
        );
        stateChangeType = STATE_CHANGE_TYPE.moveRight;
        break;
      case 'ArrowUp':
        highlightedDate = subWeeks(
          // adding `new Date()` as the last option to satisfy Fow
          highlightedDate ? highlightedDate : lastHighlightedDate || new Date(),
          1,
        );
        stateChangeType = STATE_CHANGE_TYPE.moveUp;
        break;
      case 'ArrowDown':
        highlightedDate = addWeeks(
          // adding `new Date()` as the last option to satisfy Fow
          highlightedDate ? highlightedDate : lastHighlightedDate || new Date(),
          1,
        );
        stateChangeType = STATE_CHANGE_TYPE.moveDown;
        break;
    }
    this.internalSetState(stateChangeType, {highlightedDate});
  }

  internalSetState(type: StateChangeTypeT, changes: NavigationContainerStateT) {
    const {stateReducer} = this.props;
    this.setState(prevState => stateReducer(type, changes, prevState));
  }

  render() {
    const {children, stateReducer, ...rest} = this.props;
    // $FlowFixMe
    return this.props.children({
      ...rest,
      highlightedDate: this.state.highlightedDate,
      onDayMouseOver: this.onDayMouseOver,
      onDayMouseLeave: this.onDayMouseLeave,
      onChange: this.onChange,
      onMonthChange: this.onMonthChange,
      onYearChange: this.onYearChange,
      setActiveState: this.setActiveState,
    });
  }
}

export default NavigationContainer;
