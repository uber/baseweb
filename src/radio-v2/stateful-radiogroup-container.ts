/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { STATE_TYPE } from './constants';
import type { StatefulContainerProps, StateReducer, State } from './types';
import type { ChangeEvent } from 'react';

const defaultStateReducer: StateReducer = (type, nextState) => nextState;

type Action = {
  type: string;
  event: ChangeEvent<HTMLInputElement>;
};

const StatefulRadioGroupContainer: React.FC<StatefulContainerProps> = (
  props,
) => {
  const {
    children = (childProps: {}) => null,
    initialState = { value: '' },
    stateReducer = defaultStateReducer,
    onChange = () => {},
    ...restProps
  } = props;

  const reducer = React.useCallback(
    (currentState: State, action: Action): State => {
      const { type, event } = action;

      // Calculate next state based on action type
      let nextState = currentState;
      if (type === STATE_TYPE.change) {
        nextState = { value: event.target.value };
      }

      // Allow user's stateReducer to intercept and modify the state change
      return stateReducer(type, nextState, currentState, event);
    },
    [stateReducer],
  );

  const [state, dispatch] = React.useReducer(reducer, initialState);

  const handleChange = React.useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: STATE_TYPE.change, event: e });
      onChange(e);
    },
    [onChange],
  );

  return children({
    ...restProps,
    value: state.value,
    onChange: handleChange,
  });
};

export default StatefulRadioGroupContainer;
