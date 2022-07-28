/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { STATE_TYPE } from './constants';
import type { StatefulContainerProps, StateReducer, DefaultStatefulProps, State } from './types';

import type { ChangeEvent } from 'react';

const defaultStateReducer: StateReducer = (type, nextState) => nextState;

class StatefulRadioGroupContainer extends React.Component<StatefulContainerProps, State> {
  static defaultProps: DefaultStatefulProps = {
    initialState: {
      value: '',
    },
    stateReducer: defaultStateReducer,
    onChange: () => {},
  };

  constructor(props: StatefulContainerProps) {
    super(props);
    const { initialState } = this.props;
    this.state = {
      ...initialState,
    };
  }

  onChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.stateReducer(STATE_TYPE.change, e);
    const { onChange } = this.props;
    onChange && onChange(e);
  };

  stateReducer = (type: string, e: ChangeEvent<HTMLInputElement>) => {
    let nextState = {};
    const { stateReducer } = this.props;
    if (type === STATE_TYPE.change) {
      nextState = { value: e.target.value };
    }
    const newState = stateReducer(type, nextState, this.state, e);
    this.setState(newState);
  };

  render() {
    const {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      children = (childProps: {}) => null, // eslint-disable-line no-unused-vars
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      initialState, // eslint-disable-line no-unused-vars
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      stateReducer, // eslint-disable-line no-unused-vars
      ...restProps
    } = this.props;
    const { onChange } = this;
    return children({
      ...restProps,
      value: this.state.value,
      onChange,
    });
  }
}

export default StatefulRadioGroupContainer;
