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
  CalendarStateT,
  StatefulContainerPropsT,
  StateChangeTypeT,
  StateReducerT,
} from './types.js';

const defaultStateReducer: StateReducerT = (type, nextState) => nextState;

class StatefulContainer extends React.Component<
  StatefulContainerPropsT,
  CalendarStateT,
> {
  static defaultProps = {
    initialState: {value: null},
    stateReducer: defaultStateReducer,
    onDayMouseOver: () => {},
    onDayMouseLeave: () => {},
    onSelect: () => {},
  };

  state = {
    ...{
      highlightedDate: this.props.initialState.value || new Date(),
      isActive: true,
      lastHighlightedDate: this.props.initialState.value || new Date(),
      value: null,
    },
    ...this.props.initialState,
  };

  componentDidMount() {
    if (__BROWSER__) {
      if (this.state.isActive) {
        document.addEventListener('keydown', this.onKeyDown);
      }
    }
  }

  componentWillUnmount() {
    if (__BROWSER__) {
      if (this.state.isActive) {
        document.removeEventListener('keydown', this.onKeyDown);
      }
    }
  }

  setActiveState = (isActive: boolean) => {
    if (__BROWSER__) {
      const method = isActive ? 'addEventListener' : 'removeEventListener';
      // $FlowFixMe
      document[method]('keydown', this.onKeyDown);
      this.internalSetState(null, {isActive});
    }
  };

  onSelect = (data: {date: Date}) => {
    const {date} = data;
    if (this.state.isActive) {
      this.internalSetState(STATE_CHANGE_TYPE.change, {value: date});
      this.props.onSelect(data);
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
    const {stateReducer} = this.props;
    const {value: selected} = this.state;
    const inSameMonth = isSameMonth(selected, date);
    const inSameYear = isSameYear(selected, date);
    let nextState;
    if (selected && inSameMonth && inSameYear) {
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
    this.props.onDayMouseLeave(data);
  };

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

  internalSetState(type: StateChangeTypeT, changes: CalendarStateT) {
    const {stateReducer} = this.props;
    this.setState(prevState => stateReducer(type, changes, prevState));
  }

  render() {
    const {children, initialState, stateReducer, ...rest} = this.props;
    // $FlowFixMe
    return this.props.children({
      ...rest,
      highlightedDate: this.state.highlightedDate,
      selected: this.state.value,
      onDayMouseOver: this.onDayMouseOver,
      onDayMouseLeave: this.onDayMouseLeave,
      onSelect: this.onSelect,
      setActiveState: this.setActiveState,
    });
  }
}

export default StatefulContainer;
