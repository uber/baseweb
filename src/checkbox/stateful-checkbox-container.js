// @flow
import * as React from 'react';
import {STATE_TYPE} from './constants';
import type {StatefulProps, Props, StateReducer, StateType} from './types';

const defaultStateReducer: StateReducer = (type, nextState) => nextState;

class StatefulCheckboxContainer extends React.Component<StatefulProps & Props> {
  static defaultProps = {
    initialState: {},
    stateReducer: defaultStateReducer,
    disabled: false,
    $placement: 'right',
    onChange: () => {},
    onMouseEnter: () => {},
    onMouseLeave: () => {},
    onFocus: () => {},
    onBlur: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      $isFocused: false,
      ...this.props.initialState,
    };
  }

  onChange = (e: any) => {
    this.stateReducer(STATE_TYPE.change, e);
    this.props.onChange(e);
  };

  onMouseEnter = (e: any) => {
    this.stateReducer(STATE_TYPE.hover, e);
    this.props.onMouseEnter(e);
  };

  onMouseLeave = (e: any) => {
    this.stateReducer(STATE_TYPE.unhover, e);
    this.props.onMouseEnter(e);
  };

  onFocus = (e: any) => {
    this.stateReducer(STATE_TYPE.focus, e);
    this.props.onFocus(e);
  };

  onBlur = (e: any) => {
    this.stateReducer(STATE_TYPE.blur, e);
    this.props.onBlur(e);
  };

  stateReducer = (type: StateType, e: any) => {
    let nextState;
    switch (type) {
      case STATE_TYPE.change:
        nextState = {checked: e.target.checked};
        break;
      case STATE_TYPE.focus:
        nextState = {$isFocused: true};
        break;
      case STATE_TYPE.blur:
        nextState = {$isFocused: false};
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
    const {stateReducer} = this.props;
    const newState = stateReducer(type, nextState, this.state, e);
    this.setState(newState);
  };

  render() {
    const {children, initialState, stateReducer, ...rest} = this.props;
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
