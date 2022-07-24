/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { Accordion, StatefulPanel, Panel } from '..';

export function Scenario() {
  return (
    <Accordion>
      <Panel title="Default panel">stateless panel</Panel>
      <Panel title="Expanded provided as prop" expanded>
        stateless panel
      </Panel>
      <StatefulPanel initialState={{ expanded: true }} title="Initial state expanded">
        stateful panel
      </StatefulPanel>
    </Accordion>
  );
}
