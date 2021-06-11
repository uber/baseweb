/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {StatelessAccordion, Panel} from '../index.js';

export default function Scenario() {
  const [expanded, setExpanded] = React.useState(['P1', 'P2']);
  return (
    <StatelessAccordion
      expanded={expanded}
      accordion={false}
      onChange={({key, expanded}) => {
        console.log(key, '----');
        console.log(expanded);
        setExpanded(expanded);
      }}
    >
      <Panel key="P1" title="Panel 1">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Panel>
      <Panel key="P2" title="Panel 2">
        Quisque luctus eu sem et pharetra.
      </Panel>
      <Panel key="P3" title="Panel 3">
        Proin egestas dui sed semper iaculis.
      </Panel>
    </StatelessAccordion>
  );
}
