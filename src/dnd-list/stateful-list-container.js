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
import {arrayMove, arrayRemove} from 'react-movable';

const defaultStateReducer: StateReducerT = (type, nextState) => nextState;

class StatefulListContainer extends React.Component<
  StatefulComponentContainerPropsT,
  StateT,
> {
  static defaultProps: $Shape<StatefulComponentContainerPropsT> = {
    initialState: {items: []},
    stateReducer: defaultStateReducer,
    onChange: () => {},
  };

  state = {
    items: [],
    ...this.props.initialState,
  };

  onChange = ({
    oldIndex,
    newIndex,
    targetRect,
  }: {
    oldIndex: number,
    newIndex: number,
    targetRect: ClientRect,
  }) => {
    const newItemsState =
      newIndex === -1
        ? arrayRemove(this.state.items, oldIndex)
        : arrayMove(this.state.items, oldIndex, newIndex);
    this.props.onChange({
      newState: newItemsState,
      oldIndex,
      newIndex,
      targetRect,
    });
    this.internalSetState('change', {items: newItemsState});
  };

  internalSetState(type: StateChangeTypeT, changes: StateT) {
    const {stateReducer} = this.props;
    this.setState(prevState => stateReducer(type, changes, prevState));
  }

  render() {
    const {children, initialState, stateReducer, ...restProps} = this.props;

    return this.props.children({
      ...restProps,
      items: this.state.items,
      onChange: this.onChange,
    });
  }
}

export default StatefulListContainer;
