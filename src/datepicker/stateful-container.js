/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {STATE_CHANGE_TYPE} from './constants.js';
import {addDays, subDays, addWeeks, subWeeks} from './utils/index.js';
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
  static defaultProps: $Shape<StatefulContainerPropsT> = {
    stateReducer: defaultStateReducer,
    onDayMouseOver: () => {},
    onDayMouseLeave: () => {},
  };

  state = {
    highlightedDate: this.props.selected || new Date(),
    ...this.props.initialState,
  };

  componentDidMount() {
    if (__BROWSER__) {
      document.addEventListener('keydown', this.onKeyDown);
    }
  }

  componentWillUnmount() {
    if (__BROWSER__) {
      document.removeEventListener('keydown', this.onKeyDown);
    }
  }

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
    // const {stateReducer, selected} = this.props;
    // this.setState(prevState =>
    //   stateReducer(
    //     STATE_CHANGE_TYPE.mouseLeave,
    //     {highlightedDate: selected || null},
    //     prevState,
    //   ),
    // );
    this.props.onDayMouseLeave(data);
  };

  handleArrowKey(key: string) {
    const {highlightedDate: oldDate} = this.state;
    let highlightedDate = oldDate ? new Date(oldDate) : new Date();
    let stateChangeType = null;
    switch (key) {
      case 'ArrowLeft':
        highlightedDate = subDays(highlightedDate, 1);
        stateChangeType = STATE_CHANGE_TYPE.moveLeft;
        break;
      case 'ArrowRight':
        highlightedDate = addDays(highlightedDate, 1);
        stateChangeType = STATE_CHANGE_TYPE.moveRight;
        break;
      case 'ArrowUp':
        highlightedDate = subWeeks(highlightedDate, 1);
        stateChangeType = STATE_CHANGE_TYPE.moveUp;
        break;
      case 'ArrowDown':
        highlightedDate = addWeeks(highlightedDate, 1);
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
      ...this.state,
      onDayMouseOver: this.onDayMouseOver,
      onDayMouseLeave: this.onDayMouseLeave,
    });
  }
}

export default StatefulContainer;
