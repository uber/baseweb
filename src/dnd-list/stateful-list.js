/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import StatefulListContainer from './stateful-list-container.js';
import List from './list.js';
import type {StatefulListPropsT, StateReducerT} from './types.js';

const defaultStateReducer: StateReducerT = (type, nextState) => nextState;

function StatefulList(props: StatefulListPropsT) {
  return (
    <StatefulListContainer {...props}>
      {componentProps => <List {...componentProps} />}
    </StatefulListContainer>
  );
}

StatefulList.defaultProps = {
  initialState: {items: []},
  stateReducer: defaultStateReducer,
};

export default StatefulList;
