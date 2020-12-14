/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import type {
  StateT,
  StatefulComponentContainerPropsT,
  StateChangeTypeT,
  StateReducerT,
} from './types.js';

const defaultStateReducer: StateReducerT = (type, nextState) => nextState;

class StatefulContainer extends React.Component<
  StatefulComponentContainerPropsT,
  StateT,
> {
  static defaultProps: $Shape<StatefulComponentContainerPropsT> = {
    initialState: {prop: true},
    stateReducer: defaultStateReducer,
  };

  state = {
    prop: true,
    ...this.props.initialState,
  };

  onClick = (...args: []) => {
    if (typeof this.props.onClick === 'function') {
      this.props.onClick(...args);
    }
    this.internalSetState('click', {prop: !this.state.prop});
  };

  internalSetState(type: StateChangeTypeT, changes: StateT) {
    const {stateReducer} = this.props;
    if (typeof stateReducer !== 'function') {
      this.setState(changes);
      return;
    }
    this.setState(prevState => stateReducer(type, changes, prevState));
  }

  render() {
    const {children, initialState, stateReducer, ...restProps} = this.props;

    return this.props.children({
      ...restProps,
      ...this.state,
      onClick: this.onClick,
    });
  }
}

export default StatefulContainer;
