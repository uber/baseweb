/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import StatefulContainer from './stateful-panel-container.js';
import Panel from './panel.js';
import type {StatefulPanelPropsT} from './types.js';

export default function StatefulPanel(props: StatefulPanelPropsT) {
  const {children, ...restProps} = props;
  return (
    <StatefulContainer {...restProps}>
      {componentProps => <Panel {...componentProps}>{children}</Panel>}
    </StatefulContainer>
  );
}
