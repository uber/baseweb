/*
Copyright (c) 2018 Uber Technologies, Inc.

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
import {arrayMove} from 'react-movable';

const defaultStateReducer: StateReducerT = (type, nextState) => nextState;

class StatefulListContainer extends React.Component<
  StatefulComponentContainerPropsT,
  StateT,
> {
  static defaultProps: $Shape<StatefulComponentContainerPropsT> = {
    initialState: {items: []},
    stateReducer: defaultStateReducer,
  };

  state = {
    items: [],
    ...this.props.initialState,
  };

  onChange = ({oldIndex, newIndex}: {oldIndex: number, newIndex: number}) => {
    const newItemsState = arrayMove(this.state.items, oldIndex, newIndex);
    if (typeof this.props.onChange === 'function') {
      this.props.onChange({newState: newItemsState, oldIndex, newIndex});
    }
    this.internalSetState('change', {items: newItemsState});
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
    const {children, initialState, stateReducer, ...rest} = this.props;

    return this.props.children({
      ...rest,
      ...this.state,
      onChange: this.onChange,
    });
  }
}

export default StatefulListContainer;
