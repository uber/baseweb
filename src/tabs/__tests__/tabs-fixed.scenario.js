/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {StatefulTabs, Tab, TAB_WIDTH} from '../index.js';

export default function Scenario() {
  return (
    <StatefulTabs tabWidth={TAB_WIDTH.fixed}>
      <Tab title="One">One</Tab>
      <Tab title="Two">Two</Tab>
      <Tab title="Three">Three</Tab>
    </StatefulTabs>
  );
}
