/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { MODE, STATE_CHANGE_TYPE } from './constants';

import type { StatefulContainerProps, State } from './types';

import type { SyntheticEvent } from 'react';

// handles the case where selected = 0
// @ts-ignore
function isSelectedDefined(selected) {
  return Array.isArray(selected) || typeof selected === 'number';
}

function defaultStateReducer(
  type: typeof STATE_CHANGE_TYPE[keyof typeof STATE_CHANGE_TYPE],
  nextState: State,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  currentState: State
) {
  return nextState;
}

export default class StatefulContainer extends React.Component<StatefulContainerProps, State> {
  static defaultProps = {
    // @ts-ignore
    initialState: { selected: [] },
    stateReducer: defaultStateReducer,
  };

  constructor(props: StatefulContainerProps) {
    super(props);

    const { initialState = {} as State } = props;
    const { selected = [] } = initialState;

    this.state = {
      // @ts-ignore
      selected: isSelectedDefined(selected) ? [].concat(selected) : [],
    };
  }

  changeState = (nextState: State) => {
    if (this.props.stateReducer) {
      this.setState(this.props.stateReducer(STATE_CHANGE_TYPE.change, nextState, this.state));
    } else {
      this.setState(nextState);
    }
  };

  onClick = (event: SyntheticEvent<HTMLButtonElement>, index: number) => {
    if (this.props.mode === MODE.radio) {
      if (this.state.selected.length === 0 || this.state.selected[0] !== index) {
        this.changeState({ selected: [index] });
      } else {
        this.changeState({ selected: [] });
      }
    }

    if (this.props.mode === MODE.checkbox) {
      if (!this.state.selected.includes(index)) {
        this.changeState({ selected: [...this.state.selected, index] });
      } else {
        this.changeState({
          selected: this.state.selected.filter((value) => value !== index),
        });
      }
    }

    if (this.props.onClick) {
      this.props.onClick(event, index);
    }
  };

  render() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { initialState, stateReducer, ...props } = this.props;
    return this.props.children({
      ...props,
      onClick: this.onClick,
      selected: this.state.selected,
    });
  }
}
