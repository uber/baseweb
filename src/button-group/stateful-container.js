/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {MODE, STATE_CHANGE_TYPE} from './constants.js';

import type {StatefulContainerPropsT, StateT} from './types.js';

// handles the case where selected = 0
function isSelectedDefined(selected) {
  return Array.isArray(selected) || typeof selected === 'number';
}

function defaultStateReducer(
  type: $Values<typeof STATE_CHANGE_TYPE>,
  nextState: StateT,
  currentState: StateT,
) {
  return nextState;
}

export default class StatefulContainer extends React.Component<
  StatefulContainerPropsT,
  StateT,
> {
  static defaultProps = {
    initialState: {selected: []},
    stateReducer: defaultStateReducer,
  };

  constructor(props: StatefulContainerPropsT) {
    super(props);

    const {initialState = {}} = props;
    const {selected = []} = initialState;

    this.state = {
      selected: isSelectedDefined(selected) ? [].concat(selected) : [],
    };
  }

  changeState = (nextState: StateT) => {
    if (this.props.stateReducer) {
      this.setState(
        this.props.stateReducer(
          STATE_CHANGE_TYPE.change,
          nextState,
          this.state,
        ),
      );
    } else {
      this.setState(nextState);
    }
  };

  onClick = (event: SyntheticEvent<HTMLButtonElement>, index: number) => {
    if (this.props.mode === MODE.radio) {
      if (
        this.state.selected.length === 0 ||
        this.state.selected[0] !== index
      ) {
        this.changeState({selected: [index]});
      } else {
        this.changeState({selected: []});
      }
    }

    if (this.props.mode === MODE.checkbox) {
      if (!this.state.selected.includes(index)) {
        this.changeState({selected: [...this.state.selected, index]});
      } else {
        this.changeState({
          selected: this.state.selected.filter(value => value !== index),
        });
      }
    }

    if (this.props.onClick) {
      this.props.onClick(event, index);
    }
  };

  render() {
    const {initialState, stateReducer, ...props} = this.props;
    return this.props.children({
      ...props,
      onClick: this.onClick,
      selected: this.state.selected,
    });
  }
}
