// @flow
import * as React from 'react';
import {STATE_TYPE} from './constants';
import type {
  StatefulProps,
  DefaultStatefulProps,
  StateReducer,
  StateType,
  State,
} from './types';

const defaultStateReducer: StateReducer = (type, nextState) => nextState;

class StatefulContainer extends React.Component<
  StatefulProps & DefaultStatefulProps,
  State,
> {
  static defaultProps: DefaultStatefulProps = {
    initialState: {},
    stateReducer: defaultStateReducer,
    onChange: () => {},
    onFocus: () => {},
    onBlur: () => {},
  };

  constructor(props: StatefulProps & DefaultStatefulProps) {
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

  onFocus = (e: any) => {
    this.stateReducer(STATE_TYPE.focus, e);
    this.props.onFocus(e);
  };

  onBlur = (e: any) => {
    this.stateReducer(STATE_TYPE.blur, e);
    this.props.onBlur(e);
  };

  stateReducer = (type: StateType, e: any) => {
    let nextState = {};
    switch (type) {
      case STATE_TYPE.change:
        nextState = {value: e.target.value};
        break;
      case STATE_TYPE.focus:
        nextState = {$isFocused: true};
        break;
      case STATE_TYPE.blur:
        nextState = {$isFocused: false};
        break;
      default:
        nextState;
    }
    const newState = this.props.stateReducer(type, nextState, this.state, e);
    this.setState(newState);
  };

  render() {
    const {children, initialState, stateReducer, ...rest} = this.props;
    const {onChange, onFocus, onBlur} = this;
    return children({
      ...rest,
      ...this.state,
      onChange,
      onFocus,
      onBlur,
    });
  }
}

export default StatefulContainer;
