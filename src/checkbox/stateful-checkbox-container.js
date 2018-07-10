// @flow
import React from 'react';
import {STATE_TYPE} from './constants';
import type {
  StatefulProps,
  StateReducer,
  DefaultStatefulProps,
  State,
} from './types';

const defaultStateReducer: StateReducer = (type, nextState) => nextState;

class StatefulCheckboxContainer extends React.Component<StatefulProps, State> {
  static defaultProps: DefaultStatefulProps = {
    initialState: {
      checked: false,
      isFocused: false,
      isIndeterminate: false,
    },
    stateReducer: defaultStateReducer,
    onChange: () => {},
    onMouseEnter: () => {},
    onMouseLeave: () => {},
    onFocus: () => {},
    onBlur: () => {},
  };

  constructor(props: StatefulProps) {
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
    this.stateReducer(STATE_TYPE.hover, e);
    const {onMouseEnter} = this.props;
    onMouseEnter && onMouseEnter(e);
  };

  onMouseLeave = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.stateReducer(STATE_TYPE.unhover, e);
    const {onMouseLeave} = this.props;
    onMouseLeave && onMouseLeave(e);
  };

  onFocus = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.stateReducer(STATE_TYPE.focus, e);
    const {onFocus} = this.props;
    onFocus && onFocus(e);
  };

  onBlur = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.stateReducer(STATE_TYPE.blur, e);
    const {onBlur} = this.props;
    onBlur && onBlur(e);
  };

  stateReducer = (type: string, e: SyntheticInputEvent<HTMLInputElement>) => {
    let nextState;
    const {stateReducer} = this.props;
    switch (type) {
      case STATE_TYPE.change:
        nextState = {checked: e.target.checked};
        break;
      case STATE_TYPE.focus:
        nextState = {isFocused: true};
        break;
      case STATE_TYPE.blur:
        nextState = {isFocused: false};
        break;
      case STATE_TYPE.hover:
        nextState = {$isHovered: true};
        break;
      case STATE_TYPE.unhover:
        nextState = {$isHovered: false};
        break;
      default:
        nextState = this.state;
    }
    const newState = stateReducer(type, nextState, this.state, e);
    this.setState(newState);
  };

  render() {
    const {
      children = (childProps: {}) => null, // eslint-disable-line no-unused-vars
      initialState,
      stateReducer,
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
