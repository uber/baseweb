/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {StatefulTabs, Tab, StyledTab} from '../../tabs/index.js';
import {Label2} from '../../typography/index.js';

const TabOverride = React.forwardRef(({children, ...rest}, ref) => {
  return (
    <StyledTab ref={ref} {...rest}>
      <Label2
        overrides={{
          Block: {
            style: {color: 'inherit', ':hover': {color: 'inherit'}},
          },
        }}
      >
        {children}
      </Label2>
    </StyledTab>
  );
});

const tabStyle = ({$active, $disabled, $theme}) => ({
  outlineColor: $theme.colors.white,
  color: $active ? $theme.colors.mono100 : $theme.colors.mono300,
  ':hover': $disabled
    ? {}
    : {
        color: $theme.colors.mono100,
      },
  ':focus': $disabled
    ? {}
    : {
        color: $theme.colors.mono100,
      },
});

const tabBarStyle = ({$theme}) => ({
  backgroundColor: $theme.colors.mono600,
});

const tabContentStyle = ({$theme}) => ({
  borderLeftWidth: '2px',
  borderRightWidth: '2px',
  borderBottomWidth: '2px',
  borderTopWidth: '0',
  borderLeftStyle: 'dashed',
  borderRightStyle: 'dashed',
  borderTopStyle: 'dashed',
  borderBottomStyle: 'dashed',
  borderLeftColor: $theme.colors.mono600,
  borderRightColor: $theme.colors.mono600,
  borderTopColor: $theme.colors.mono600,
  borderBottomColor: $theme.colors.mono600,
});

const content = ['Tab Content 1', 'Tab Content 2', 'Tab Content 3'];

export default function Scenario() {
  const [activeKey, setActiveKey] = React.useState('0');
  return (
    <StatefulTabs
      initialState={{activeKey: activeKey}}
      onChange={({activeKey}) => {
        setActiveKey(activeKey);
      }}
      overrides={{
        TabBar: {
          style: tabBarStyle,
        },
        TabContent: {
          style: tabContentStyle,
        },
      }}
    >
      <Tab
        overrides={{
          Tab: {component: TabOverride, style: tabStyle},
        }}
        title="Tab Link 1"
      >
        <div>{content[Number(activeKey)]}</div>
      </Tab>
      <Tab
        overrides={{
          Tab: {component: TabOverride, style: tabStyle},
        }}
        title="Tab Link 2"
      >
        <div>{content[Number(activeKey)]}</div>
      </Tab>
      <Tab
        overrides={{
          Tab: {component: TabOverride, style: tabStyle},
        }}
        title="Tab Link 3"
      >
        <div>{content[Number(activeKey)]}</div>
      </Tab>
    </StatefulTabs>
  );
}
