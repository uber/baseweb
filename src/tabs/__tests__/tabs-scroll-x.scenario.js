/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {StatefulTabs, Tab} from '../index.js';

export default function Scenario() {
  return (
    <StatefulTabs initialState={{activeKey: '4'}}>
      <Tab title="Tab Link 1">Tab 1 content</Tab>
      <Tab title="Tab Link 2">Tab 2 content</Tab>
      <Tab title="Tab Link 3">Tab 3 content</Tab>
      <Tab title="Tab Link 4">Tab 4 content</Tab>
      <Tab title="Tab Link 5">Tab 5 content</Tab>
      <Tab title="Tab Link 6">Tab 6 content</Tab>
      <Tab title="Tab Link 7">Tab 7 content</Tab>
      <Tab title="Tab Link 8">Tab 8 content</Tab>
      <Tab title="Tab Link 9">Tab 9 content</Tab>
    </StatefulTabs>
  );
}
