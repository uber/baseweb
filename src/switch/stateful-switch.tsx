
/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import StatefulContainer from './stateful-switch-container';
import Switch from './switch';
import type { StatefulContainerChildProps, StatefulSwitchProps } from './types';
// Styled elements

const StatefulSwitch = function (props: StatefulSwitchProps) {
  return (
    <StatefulContainer {...props}>
      {(childrenProps: StatefulContainerChildProps) => (
        <Switch {...childrenProps}>{props.children}</Switch>
      )}
    </StatefulContainer>
  );
};
StatefulSwitch.displayName = 'StatefulSwitch';
export default StatefulSwitch;
