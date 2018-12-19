/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {styled} from '../styles/index.js';
import {
  Tabs,
  StatefulTabs,
  TabPanel,
  StyledTabBar,
  StyledTabContent,
  StyledTab,
  ORIENTATION,
} from './index.js';
import examples from './examples-list.js';

export const suite = 'Component Test Suite';

const Centered = styled('div', {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
  alignItems: 'center',
  height: '90vh',
  lineHeight: 1.5,
  width: '500px',
  margin: '0 auto',
});

const CustomTabBar = styled(StyledTabBar, props => ({
  backgroundColor: 'yellow',
}));

const CustomTabContent = styled(StyledTabContent, props => ({
  padding: '10px',
  color: 'red',
}));

const overrides = {
  TabBar: CustomTabBar,
  TabContent: CustomTabContent,
};

const CustomTab = styled(StyledTab, props => ({
  borderBottom: props.$active ? `2px solid green` : 'none',
}));

const tabOverrides = {
  Tab: CustomTab,
};

class ControlledTabsStory extends React.Component<{}, {activeKey: React.Key}> {
  state = {
    activeKey: '0',
  };

  onChange = ({activeKey}) => {
    this.setState({activeKey});
  };

  render() {
    const content = ['Tab Content 1', 'Tab Content 2', 'Tab Content 3'];
    return (
      <Centered>
        <Tabs activeKey={this.state.activeKey} onChange={this.onChange}>
          <TabPanel title="Tab Link 1" />
          <TabPanel title="Tab Link 2" />
          <TabPanel title="Tab Link 3" />
        </Tabs>
        <div>Content:</div>
        <div>{content[Number(this.state.activeKey)]}</div>
      </Centered>
    );
  }
}

export default {
  [examples.TABS_EXAMPLE]: function Story1() {
    return (
      <Centered>
        <Tabs activeKey="1">
          <TabPanel title="Tab Link 1">Tab 1 content</TabPanel>
          <TabPanel title="Tab Link 2">Tab 2 content</TabPanel>
          <TabPanel title="Tab Link 3">Tab 3 content</TabPanel>
        </Tabs>
      </Centered>
    );
  },
  [examples.STATEFUL_TABS_EXAMPLE]: function Story2() {
    return (
      <Centered>
        <StatefulTabs>
          <TabPanel title="Tab Link 1">Tab 1 content</TabPanel>
          <TabPanel title="Tab Link 2">Tab 2 content</TabPanel>
          <TabPanel title="Tab Link 3">Tab 3 content</TabPanel>
        </StatefulTabs>
      </Centered>
    );
  },
  [examples.VERTICAL_TABS_EXAMPLE]: function Story3() {
    return (
      <Centered>
        <StatefulTabs orientation={ORIENTATION.vertical}>
          <TabPanel title="Tab Link 1">Tab 1 content</TabPanel>
          <TabPanel title="Tab Link 2">Tab 2 content</TabPanel>
          <TabPanel title="Tab Link 3">Tab 3 content</TabPanel>
        </StatefulTabs>
      </Centered>
    );
  },
  [examples.STYLE_PROPS_OVERRIDES]: function Story4() {
    return (
      <Centered>
        <StatefulTabs
          orientation={ORIENTATION.vertical}
          initialState={{activeKey: '1'}}
          overrides={overrides}
        >
          <TabPanel title="Tab 1" overrides={tabOverrides}>
            Tab 1 Content
          </TabPanel>
          <TabPanel title="Tab 2" overrides={tabOverrides}>
            Tab 2 Content
          </TabPanel>
          <TabPanel title="Tab 3" overrides={tabOverrides}>
            Tab 3 Content
          </TabPanel>
        </StatefulTabs>
      </Centered>
    );
  },
  [examples.CONTROLLED_TABS_EXAMPLE]: function Story5() {
    return <ControlledTabsStory />;
  },
};
