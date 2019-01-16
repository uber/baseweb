/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import StatefulListContainer from './stateful-list-container.js';
import List from './list.js';
import type {StatefulComponentPropsT} from './types.js';

function StatefulList(props: StatefulComponentPropsT) {
  const {children, ...restProps} = props;
  return (
    <StatefulListContainer {...restProps}>
      {componentProps => <List {...componentProps}>{children}</List>}
    </StatefulListContainer>
  );
}

StatefulList.defaultProps = StatefulListContainer.defaultProps;

export default StatefulList;
