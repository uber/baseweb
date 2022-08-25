/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { STATE_TYPE } from './constants';
import type {
  StatefulContainerProps,
  StateReducer,
  DefaultStatefulProps,
  CheckboxReducerState,
} from './types';

import type { ChangeEvent } from 'react';

const defaultStateReducer: StateReducer = (type, nextState) => nextState;

class StatefulCheckboxContainer extends React.Component<
  StatefulContainerProps,
  CheckboxReducerState
> {
  static defaultProps: DefaultStatefulProps = {
    initialState: {
      checked: false,
      isIndeterminate: false,
    },
    stateReducer: defaultStateReducer,
    onChange: () => {},
    onMouseEnter: () => {},
    onMouseLeave: () => {},
    onFocus: () => {},
    onBlur: () => {},
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

  onMouseEnter = (e: ChangeEvent<HTMLInputElement>) => {
    const { onMouseEnter } = this.props;
    onMouseEnter && onMouseEnter(e);
  };

  onMouseLeave = (e: ChangeEvent<HTMLInputElement>) => {
    const { onMouseLeave } = this.props;
    onMouseLeave && onMouseLeave(e);
  };

  onFocus = (e: ChangeEvent<HTMLInputElement>) => {
    const { onFocus } = this.props;
    onFocus && onFocus(e);
  };

  onBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const { onBlur } = this.props;
    onBlur && onBlur(e);
  };

  stateReducer = (type: string, e: ChangeEvent<HTMLInputElement>) => {
    let nextState = {};
    const { stateReducer } = this.props;
    switch (type) {
      case STATE_TYPE.change:
        nextState = { checked: e.target.checked };
        break;
    }
    const newState = stateReducer(type, nextState, this.state, e);
    this.setState(newState);
  };

  render() {
    const {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      children = (childProps: {}) => null,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      initialState,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      stateReducer,
      ...restProps
    } = this.props;
    const { onChange, onMouseEnter, onMouseLeave, onFocus, onBlur } = this;
    return children({
      ...restProps,
      checked: this.state.checked,
      isIndeterminate: this.state.isIndeterminate,
      onChange,
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
    });
  }
}

export default StatefulCheckboxContainer;
