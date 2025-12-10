/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import * as React from 'react';
import { SegmentedControl } from './segmented-control';
import { STATE_CHANGE_TYPE } from './constants';

import type {
  StatefulSegmentedControlProps,
  StatefulSegmentedControlState,
  StatefulSegmentedControlReducer,
  onChange,
} from './types';

const getInitialState = (
  children: React.ReactNode,
  initialState?: StatefulSegmentedControlState
) => {
  if (initialState && initialState.activeKey) {
    return initialState;
  } else {
    const firstKey = React.Children.map(
      children,
      // @ts-expect-error todo(flow->ts) child might be not a ReactElement, theoretically including null
      (child, index) => child.key || String(index)
    )?.[0];
    return { activeKey: firstKey };
  }
};

const defaultStateReducer: StatefulSegmentedControlReducer = (state, action) => {
  if (action.type === STATE_CHANGE_TYPE.change) {
    return { activeKey: action.payload };
  }
  return state;
};

export function StatefulSegmentedControl(props: StatefulSegmentedControlProps) {
  const {
    children,
    initialState,
    stateReducer = defaultStateReducer,
    onChange,
    ...restProps
  } = props;
  const [state, dispatch] = React.useReducer(stateReducer, getInitialState(children, initialState));
  const handleChange = React.useCallback<onChange>((params) => {
    const { activeKey } = params;
    dispatch({ type: STATE_CHANGE_TYPE.change, payload: activeKey });
    if (typeof onChange === 'function') onChange(params);
  }, []);
  return (
    <SegmentedControl {...restProps} activeKey={state.activeKey} onChange={handleChange}>
      {children}
    </SegmentedControl>
  );
}
