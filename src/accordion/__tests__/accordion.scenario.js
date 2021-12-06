/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {Accordion, Panel} from '../index.js';

export function Scenario() {
  return (
    <Accordion>
      <Panel title="Accordion panel 1">panel 1</Panel>
      <Panel title="Accordion panel 2">panel 2</Panel>
      <Panel title="Accordion panel 3">panel 3</Panel>
    </Accordion>
  );
}
