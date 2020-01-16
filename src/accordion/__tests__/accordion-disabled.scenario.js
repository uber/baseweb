/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {Accordion, Panel} from '../index.js';

export const name = 'accordion-disabled';

export const component = () => (
  <Accordion disabled>
    <Panel title="Default panel">stateless panel</Panel>
    <Panel title="Expanded provided as prop">stateless panel</Panel>
  </Accordion>
);
