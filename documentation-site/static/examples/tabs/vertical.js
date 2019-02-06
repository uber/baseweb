import React from 'react';
import {StatefulTabs, TabPanel, ORIENTATION} from 'baseui/tabs';

export default () => (
  <StatefulTabs orientation={ORIENTATION.vertical} activeKey="1">
    <TabPanel title="Tab Link 1">Tab 1 content</TabPanel>
    <TabPanel title="Tab Link 2">Tab 2 content</TabPanel>
    <TabPanel title="Tab Link 3">Tab 3 content</TabPanel>
  </StatefulTabs>
);
