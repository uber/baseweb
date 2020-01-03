/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import ButtonGroup from './button-group.js';
import StatefulContainer from './stateful-container.js';
import type {StatefulPropsT} from './types.js';

export default function StatefulButtonGroup(props: StatefulPropsT) {
  const {children, initialState, ...restProps} = props;
  return (
    <StatefulContainer initialState={initialState} {...restProps}>
      {({...containerProps}) => (
        <ButtonGroup {...containerProps}>{props.children}</ButtonGroup>
      )}
    </StatefulContainer>
  );
}
