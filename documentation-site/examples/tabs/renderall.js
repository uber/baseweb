// @flow
import * as React from 'react';
import {StatefulTabs, Tab} from 'baseui/tabs';

export default function Example() {
  return (
    <StatefulTabs initialState={{activeKey: '0'}} renderAll>
      <Tab title="Tab Link 1">Tab 1 content</Tab>
      <Tab title="Tab Link 2">Tab 2 content</Tab>
      <Tab title="Tab Link 3">Tab 3 content</Tab>
    </StatefulTabs>
  );
}
