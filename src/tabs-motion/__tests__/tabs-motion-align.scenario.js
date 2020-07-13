/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

/* eslint-disable jsx-a11y/accessible-emoji */

import * as React from 'react';
import {Tab, Tabs, StyledTabList, StyledTabPanel} from '../index.js';
import {Button, KIND} from '../../button/index.js';
import {Grid, Cell} from '../../layout-grid/index.js';

const TabsOverrides = {
  TabList: {
    component: function TabsListOverride(props) {
      return (
        <Grid>
          <Cell span={12}>
            <StyledTabList {...props} />
          </Cell>
        </Grid>
      );
    },
  },
};

const TabOverrides = {
  TabPanel: {
    component: function TabPanelOverride(props) {
      return (
        <Grid>
          <Cell span={12}>
            <StyledTabPanel {...props} />
          </Cell>
        </Grid>
      );
    },
  },
};

export default function Scenario() {
  const [activeKey, setActiveKey] = React.useState('0');
  return (
    <React.Fragment>
      <Tabs
        activeKey={activeKey}
        onChange={({activeKey}) => setActiveKey(activeKey)}
        overrides={TabsOverrides}
      >
        <Tab title="Robot" overrides={TabOverrides}>
          <div style={{padding: '16px'}}>
            <Button kind={KIND.secondary}>🤖</Button>
          </div>
        </Tab>
        <Tab title="Monster" overrides={TabOverrides}>
          <div style={{padding: '16px'}}>
            <Button kind={KIND.secondary}>👺</Button>
          </div>
        </Tab>
        <Tab title="Watermelon" overrides={TabOverrides}>
          <div style={{padding: '16px'}}>
            <Button kind={KIND.secondary}>🍉</Button>
          </div>
        </Tab>
      </Tabs>
    </React.Fragment>
  );
}
