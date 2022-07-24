/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import StatefulListContainer from './stateful-list-container';
import List from './list';
import type { StatefulListProps, StateReducer } from './types';

const defaultStateReducer: StateReducer = (type, nextState) => nextState;

function StatefulList(props: StatefulListProps) {
  return (
    <StatefulListContainer {...props}>
      {(componentProps) => <List {...componentProps} />}
    </StatefulListContainer>
  );
}

StatefulList.defaultProps = {
  initialState: { items: [] },
  stateReducer: defaultStateReducer,
};

export default StatefulList;
