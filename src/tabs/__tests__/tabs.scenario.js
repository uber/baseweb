/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {StatefulTabs, Tab} from '../index.js';

export const name = 'tabs';

export const component = () => (
  <StatefulTabs>
    <Tab title="Tab Link 1">Tab 1 content</Tab>
    <Tab title="Tab Link 2">Tab 2 content</Tab>
    <Tab title="Tab Link 3">Tab 3 content</Tab>
  </StatefulTabs>
);
