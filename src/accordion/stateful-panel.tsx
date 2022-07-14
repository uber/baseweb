/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import StatefulContainer from './stateful-panel-container';
import Panel from './panel';
import type { StatefulPanelProps } from './types';

export default function StatefulPanel(props: StatefulPanelProps) {
  const { children, ...restProps } = props;
  return (
    <StatefulContainer {...restProps}>
      {(componentProps) => <Panel {...componentProps}>{children}</Panel>}
    </StatefulContainer>
  );
}
