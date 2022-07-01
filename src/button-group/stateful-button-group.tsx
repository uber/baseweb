/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import ButtonGroup from './button-group';
import StatefulContainer from './stateful-container';
import type { StatefulPropsT } from './types';

export default function StatefulButtonGroup(props: StatefulPropsT) {
  const { children, initialState, ...restProps } = props;
  return (
    <StatefulContainer initialState={initialState} {...restProps}>
      {({ ...containerProps }) => (
        //$FlowFixMe
        <ButtonGroup {...containerProps}>{props.children}</ButtonGroup>
      )}
    </StatefulContainer>
  );
}
