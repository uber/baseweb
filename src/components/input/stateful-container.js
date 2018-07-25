// @flow
import * as React from 'react';
import {STATE_CHANGE_TYPE} from './constants';
import type {
  StatefulContainerPropsT,
  StateT,
  StateReducerT,
  StateTypeT,
} from './types';

const defaultStateReducer: StateReducerT = (type, nextState) => nextState;

class StatefulContainer extends React.Component<
  StatefulContainerPropsT,
  StateT,
> {
  static defaultProps = {
    initialState: {},
    stateReducer: defaultStateReducer,
    onChange: () => {},
  };

  state: StateT = {
    value: '',
    ...this.props.initialState,
  };

  onChange = (e: SyntheticEvent<HTMLInputElement>) => {
    this.stateReducer(STATE_CHANGE_TYPE.change, e);
    this.props.onChange(e);
  };

  stateReducer = (type: StateTypeT, e: SyntheticEvent<HTMLInputElement>) => {
    let nextState = {};
    if (
      type === STATE_CHANGE_TYPE.change &&
      // eslint-disable-next-line cup/no-undef
      e.target instanceof window.HTMLInputElement
    ) {
      nextState = {value: e.target.value};
    }
    const newState = this.props.stateReducer(type, nextState, this.state);
    this.setState(newState);
  };

  render() {
    // eslint-disable-next-line no-unused-vars
    const {children, initialState, stateReducer, ...rest} = this.props;
    const {onChange} = this;
    return children({
      ...rest,
      ...this.state,
      onChange,
    });
  }
}

export default StatefulContainer;
