import React from 'react';
import {StatefulTabs, TabPanel} from 'baseui/tabs';

export default () => (
  <StatefulTabs initialState={{activeKey: '0'}}>
    <TabPanel title="Tab Link 1">Tab 1 content</TabPanel>
    <TabPanel title="Tab Link 2">Tab 2 content</TabPanel>
    <TabPanel title="Tab Link 3">Tab 3 content</TabPanel>
  </StatefulTabs>
);
