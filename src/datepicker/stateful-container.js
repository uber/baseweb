/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {STATE_CHANGE_TYPE} from './constants.js';
import type {
  CalendarPropsT,
  ContainerStateT,
  DatepickerPropsT,
  StatefulContainerPropsT,
  StateChangeTypeT,
  StateReducerT,
} from './types.js';

const defaultStateReducer: StateReducerT = (type, nextState) => nextState;

type PropsT = StatefulContainerPropsT<CalendarPropsT | DatepickerPropsT>;
class StatefulContainer extends React.Component<PropsT, ContainerStateT> {
  static defaultProps = {
    initialState: {},
    stateReducer: defaultStateReducer,
    onChange: () => {},
  };

  constructor(props: PropsT) {
    super(props);
    const value = props.range ? [] : (null: ?Date);
    this.state = {value, ...props.initialState};
  }

  onChange = (data: {date: ?Date | Array<Date>}) => {
    const {date} = data;
    this.internalSetState(STATE_CHANGE_TYPE.change, {value: date});
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(data);
    }
  };

  internalSetState(type: StateChangeTypeT, changes: ContainerStateT) {
    const {stateReducer} = this.props;
    this.setState(prevState => stateReducer(type, changes, prevState));
  }

  render() {
    const {children, initialState, stateReducer, ...restProps} = this.props;
    return this.props.children({
      ...restProps,
      value: this.state.value,
      onChange: this.onChange,
    });
  }
}

export default StatefulContainer;
