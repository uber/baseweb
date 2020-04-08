/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import Accordion from '../stateless-accordion.js';
import Panel from '../panel.js';

export default function Scenario() {
  const [panelState, setPanelState] = React.useState([true, false, true]);
  return (
    <Accordion overrides={{Content: {style: {fontFamily: 'fantasy'}}}}>
      <Panel
        key="L1"
        title="Litany I"
        expanded={panelState[0]}
        onChange={({expanded}) =>
          setPanelState(panelState.map((s, i) => (i === 0 ? expanded : s)))
        }
      >
        I must not fear.
      </Panel>
      <Panel
        key="L2"
        title="Litany II"
        expanded={panelState[1]}
        onChange={({expanded}) =>
          setPanelState(panelState.map((s, i) => (i === 1 ? expanded : s)))
        }
      >
        Fear is the mind-killer.
      </Panel>
      <Panel
        key="L3"
        title="Litany III"
        expanded={panelState[2]}
        onChange={({expanded}) =>
          setPanelState(panelState.map((s, i) => (i === 2 ? expanded : s)))
        }
      >
        Fear is the little-death that brings total obliteration.
      </Panel>
    </Accordion>
  );
}
