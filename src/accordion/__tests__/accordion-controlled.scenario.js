/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {
  StatelessAccordion as Accordion,
  StatelessPanel as Panel,
} from '../stateless-accordion.js';

export default function Scenario() {
  return (
    <Accordion>
      <Panel title="Litany I" expanded>
        I must not fear.
      </Panel>
      <Panel title="Litany II">Fear is the mind-killer.</Panel>
      <Panel title="Litany III" expanded>
        Fear is the little-death that brings total obliteration.
      </Panel>
    </Accordion>
  );
}
