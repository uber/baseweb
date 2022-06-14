/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import Accordion from '../stateless-accordion';
import Panel from '../panel';

export function Scenario() {
  const [expanded, setExpanded] = React.useState<React.Key[]>(['L1', 'L2']);
  return (
    <Accordion
      accordion={false} // Open multiple panels simultaneously
      expanded={expanded}
      onChange={({ key, expanded }) => setExpanded(expanded)} // Use key or expanded however you like
      overrides={{ Content: { style: { fontFamily: 'fantasy' } } }}
    >
      <Panel key="L1" title="Litany I">
        I must not fear.
      </Panel>
      <Panel key="L2" title="Litany II">
        Fear is the mind-killer.
      </Panel>
      <Panel key="L3" title="Litany III">
        Fear is the little-death that brings total obliteration.
      </Panel>
    </Accordion>
  );
}
