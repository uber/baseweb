// @flow
import React from 'react';
import {STATE_TYPE} from './constants';
import type {
  StatefulContainerPropsT,
  StateReducerT,
  DefaultStatefulPropsT,
  StateT,
} from './types';

const defaultStateReducer: StateReducerT = (type, nextState) => nextState;

class StatefulCheckboxContainer extends React.Component<
  StatefulContainerPropsT,
  StateT,
> {
  static defaultProps: DefaultStatefulPropsT = {
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

  constructor(props: StatefulContainerPropsT) {
    super(props);
    const {initialState} = this.props;
    this.state = {
      ...initialState,
    };
  }

  onChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.stateReducer(STATE_TYPE.change, e);
    const {onChange} = this.props;
    onChange && onChange(e);
  };

  onMouseEnter = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const {onMouseEnter} = this.props;
    onMouseEnter && onMouseEnter(e);
  };

  onMouseLeave = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const {onMouseLeave} = this.props;
    onMouseLeave && onMouseLeave(e);
  };

  onFocus = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const {onFocus} = this.props;
    onFocus && onFocus(e);
  };

  onBlur = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const {onBlur} = this.props;
    onBlur && onBlur(e);
  };

  stateReducer = (type: string, e: SyntheticInputEvent<HTMLInputElement>) => {
    let nextState = {};
    const {stateReducer} = this.props;
    switch (type) {
      case STATE_TYPE.change:
        nextState = {checked: e.target.checked};
        break;
    }
    const newState = stateReducer(type, nextState, this.state, e);
    this.setState(newState);
  };

  render() {
    const {
      children = (childProps: {}) => null, // eslint-disable-line no-unused-vars
      initialState, // eslint-disable-line no-unused-vars
      stateReducer, // eslint-disable-line no-unused-vars
      ...rest
    } = this.props;
    const {onChange, onMouseEnter, onMouseLeave, onFocus, onBlur} = this;
    return children({
      ...rest,
      ...this.state,
      onChange,
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
    });
  }
}

export default StatefulCheckboxContainer;
