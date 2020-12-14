/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {STATE_CHANGE_TYPE} from './constants.js';
import type {
  PanelStateT,
  StatefulPanelContainerPropsT,
  PanelStateReducerT,
  StateChangeTypeT,
  OnChangeHandlerT,
} from './types.js';

const defaultStateReducer: PanelStateReducerT = (type, nextState) => nextState;

class StatefulPanelContainer extends React.Component<
  StatefulPanelContainerPropsT,
  PanelStateT,
> {
  static defaultProps = {
    initialState: {expanded: false},
    stateReducer: defaultStateReducer,
    onChange: () => {},
  };

  state = {
    expanded: false,
    ...this.props.initialState,
  };

  onChange: OnChangeHandlerT = () => {
    if (typeof this.props.onChange === 'function') {
      this.props.onChange({expanded: !this.state.expanded});
    }
    this.internalSetState(STATE_CHANGE_TYPE.expand, {
      expanded: !this.state.expanded,
    });
  };

  internalSetState(type: StateChangeTypeT, changes: PanelStateT) {
    const {stateReducer} = this.props;
    this.setState(prevState =>
      stateReducer ? stateReducer(type, changes, prevState) : changes,
    );
  }

  render() {
    const {children, initialState, stateReducer, ...restProps} = this.props;

    return this.props.children({
      ...restProps,
      ...this.state,
      onChange: this.onChange,
    });
  }
}

export default StatefulPanelContainer;
