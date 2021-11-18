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
    <Accordion disabled>
      <Panel title="Default panel">stateless panel</Panel>
      <Panel title="Expanded provided as prop">stateless panel</Panel>
    </Accordion>
  );
}
