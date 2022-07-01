/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { STATE_TYPE } from './constants';
import type {
  StatefulContainerPropsT,
  StateReducerT,
  DefaultStatefulPropsT,
  StateT,
} from './types';

import type { ChangeEvent } from 'react';

const defaultStateReducer: StateReducerT = (type, nextState) => nextState;

class StatefulRadioGroupContainer extends React.Component<StatefulContainerPropsT, StateT> {
  static defaultProps: DefaultStatefulPropsT = {
    initialState: {
      value: '',
    },
    stateReducer: defaultStateReducer,
    onChange: () => {},
  };

  constructor(props: StatefulContainerPropsT) {
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
      children = (childProps: {}) => null, // eslint-disable-line no-unused-vars
      initialState, // eslint-disable-line no-unused-vars
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
