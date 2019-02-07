/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import {StatefulTabs, TabPanel} from '../index.js';

export const name = 'tabs';

export const component = () => (
  <StatefulTabs>
    <TabPanel title="Tab Link 1">Tab 1 content</TabPanel>
    <TabPanel title="Tab Link 2">Tab 2 content</TabPanel>
    <TabPanel title="Tab Link 3">Tab 3 content</TabPanel>
  </StatefulTabs>
);
