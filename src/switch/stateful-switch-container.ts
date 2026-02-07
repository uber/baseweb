
/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { STATE_TYPE } from './constants';
import type { StatefulContainerProps, StateReducer } from './types';

import type { ChangeEvent } from 'react';

const defaultStateReducer: StateReducer = (type, nextState, currentState) => ({
  ...currentState,
  ...nextState,
});

const StatefulSwitchContainer = (props: StatefulContainerProps) => {
  const {
    initialState = { checked: false },
    stateReducer = defaultStateReducer,
    onChange = () => {},
    onMouseEnter = () => {},
    onMouseLeave = () => {},
    onMouseDown = () => {},
    onMouseUp = () => {},
    onFocus = () => {},
    onBlur = () => {},
    onKeyDown = () => {},
    onKeyUp = () => {},
    children = (childProps: {}) => null,
    ...restProps
  } = props;
  const [checked, setChecked] = React.useState(initialState.checked);

  const updateState = React.useCallback(
    (type: string, e: ChangeEvent<HTMLInputElement>) => {
      let nextState = {};
      switch (type) {
        case STATE_TYPE.change:
          nextState = { checked: e.target.checked };
          break;
      }
      const newState = stateReducer(type, nextState, { checked }, e);

      setChecked(newState.checked);
    },
    [checked, stateReducer]
  );

  const onChangeHandler = React.useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      updateState(STATE_TYPE.change, e);
      onChange && onChange(e);
    },
    [updateState, onChange]
  );

  const onMouseEnterHandler = React.useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onMouseEnter && onMouseEnter(e);
    },
    [onMouseEnter]
  );

  const onMouseLeaveHandler = React.useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onMouseLeave && onMouseLeave(e);
    },
    [onMouseLeave]
  );

  const onFocusHandler = React.useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onFocus && onFocus(e);
    },
    [onFocus]
  );

  const onBlurHandler = React.useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onBlur && onBlur(e);
    },
    [onBlur]
  );

  const onMouseDownHandler = React.useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onMouseDown && onMouseDown(e);
    },
    [onMouseDown]
  );

  const onMouseUpHandler = React.useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onMouseUp && onMouseUp(e);
    },
    [onMouseUp]
  );

  const onKeyDownHandler = React.useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      onKeyDown && onKeyDown(event);
    },
    [onKeyDown]
  );

  const onKeyUpHandler = React.useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      onKeyUp && onKeyUp(event);
    },
    [onKeyUp]
  );

  return children({
    ...restProps,
    checked,
    onChange: onChangeHandler,
    onMouseEnter: onMouseEnterHandler,
    onMouseLeave: onMouseLeaveHandler,
    onMouseDown: onMouseDownHandler,
    onMouseUp: onMouseUpHandler,
    onFocus: onFocusHandler,
    onBlur: onBlurHandler,
    onKeyDown: onKeyDownHandler,
    onKeyUp: onKeyUpHandler,
  });
};

export default StatefulSwitchContainer;
