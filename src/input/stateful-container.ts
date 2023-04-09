/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { STATE_CHANGE_TYPE } from './constants';
import type { StatefulContainerProps, State, StateReducer, StateType } from './types';

import type { ChangeEvent } from 'react';

const defaultStateReducer: StateReducer = (type, nextState) => nextState;

class StatefulContainer<T extends HTMLInputElement | HTMLTextAreaElement> extends React.Component<
  StatefulContainerProps<T>,
  State
> {
  static defaultProps = {
    initialState: {},
    stateReducer: defaultStateReducer,
    onChange: () => {},
    onClear: () => {},
  };

  state: State = {
    value: '',
    ...this.props.initialState,
  };

  onChange = (e: ChangeEvent<T>) => {
    const nextState = { value: e.target.value };
    this.internalSetState(STATE_CHANGE_TYPE.change, nextState);
    // @ts-ignore
    this.props.onChange(e);
  };

  internalSetState = (type: StateType, nextState: State) => {
    // @ts-ignore
    const newState = this.props.stateReducer(type, nextState, this.state);
    this.setState(newState);
  };

  render() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { children, initialState, stateReducer, ...restProps } = this.props;
    const { onChange } = this;
    return children({
      ...restProps,
      ...this.state,
      // @ts-ignore
      onChange,
    });
  }
}

export default StatefulContainer;
