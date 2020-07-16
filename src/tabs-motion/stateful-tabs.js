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

const getInitialState = (
  children: React.Node,
  initialState?: StatefulTabsStateT,
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

const defaultStateReducer: StatefulTabsReducerT = (state, action) => {
  if (action.type === STATE_CHANGE_TYPE.change) {
    return {activeKey: action.payload};
  }
  return state;
};

export function StatefulTabs(props: StatefulTabsPropsT) {
  const {
    children,
    initialState,
    stateReducer = defaultStateReducer,
    onChange,
    ...restProps
  } = props;
  const [state, dispatch] = React.useReducer(
    stateReducer,
    getInitialState(children, initialState),
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
