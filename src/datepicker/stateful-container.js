/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {STATE_CHANGE_TYPE} from './constants.js';
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
    onSelect: () => {},
  };

  state = {
    ...{
      value: null,
    },
    ...this.props.initialState,
  };

  onSelect = (data: {date: Date}) => {
    const {date} = data;
    this.internalSetState(STATE_CHANGE_TYPE.change, {value: date});
    this.props.onSelect(data);
  };

  internalSetState(type: StateChangeTypeT, changes: CalendarStateT) {
    const {stateReducer} = this.props;
    this.setState(prevState => stateReducer(type, changes, prevState));
  }

  render() {
    const {children, initialState, stateReducer, ...rest} = this.props;
    // $FlowFixMe
    return this.props.children({
      ...rest,
      selected: this.state.value,
      onSelect: this.onSelect,
    });
  }
}

export default StatefulContainer;
