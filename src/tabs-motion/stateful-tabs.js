/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import * as React from 'react';
import {Tabs} from './tabs.js';
import {STATE_CHANGE_TYPE} from './constants.js';

import type {
  StatefulTabsPropsT,
  StatefulTabsStateT,
  StatefulTabsReducerT,
} from './types.js';

export const getInitialState = (
  initialState: StatefulTabsStateT,
  children: React.Node,
) => {
  if (initialState && initialState.activeKey) {
    return initialState;
  } else {
    const firstKey = React.Children.map(
      children,
      (child, index) => child.key || String(index),
    )[0];
    return {activeKey: firstKey};
  }
};

export const defaultStateReducer: StatefulTabsReducerT = (state, action) => {
  if (action.type === STATE_CHANGE_TYPE.change) {
    return {activeKey: action.payload};
  }
  return state;
};

export function StatefulTabs(props: StatefulTabsPropsT) {
  const {
    initialState = {activeKey: '0'},
    stateReducer = defaultStateReducer,
    onChange,
    children,
    ...restProps
  } = props;
  const [state, dispatch] = React.useReducer(
    stateReducer,
    getInitialState(initialState, children),
  );
  const handleChange = React.useCallback(params => {
    const {activeKey} = params;
    dispatch({type: STATE_CHANGE_TYPE.change, payload: activeKey});
    if (typeof onChange === 'function') onChange(params);
  }, []);
  return (
    <Tabs {...restProps} activeKey={state.activeKey} onChange={handleChange}>
      {children}
    </Tabs>
  );
}
