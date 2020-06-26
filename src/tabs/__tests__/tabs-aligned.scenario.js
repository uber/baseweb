/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {StatefulTabs, Tab, StyledTabBar, StyledTabContent} from '../index.js';
import {Grid, Cell} from '../../layout-grid/index.js';

export default function Scenario() {
  return (
    <StatefulTabs
      overrides={{
        TabBar: {
          component: function TabBarOverride(props) {
            return (
              <Grid overrides={{Grid: {style: {width: '100%'}}}}>
                <Cell span={12}>
                  <StyledTabBar {...props} />
                </Cell>
              </Grid>
            );
          },
        },
        TabContent: {
          component: function TabContentOverride(props) {
            return (
              <Grid overrides={{Grid: {style: {width: '100%'}}}}>
                <Cell span={12}>
                  <StyledTabContent {...props} />
                </Cell>
              </Grid>
            );
          },
        },
      }}
    >
      <Tab title="Tab Link 1">Tab 1 content</Tab>
      <Tab title="Tab Link 2">Tab 2 content</Tab>
      <Tab title="Tab Link 3">Tab 3 content</Tab>
    </StatefulTabs>
  );
}
