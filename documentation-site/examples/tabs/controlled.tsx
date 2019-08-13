import * as React from 'react';
import {Tabs, Tab} from 'baseui/tabs';

const content = ['Tab Content 1', 'Tab Content 2', 'Tab Content 3'];

export default function ControlledTabsStory() {
  const [activeKey, setActiveKey] = React.useState<string | number>(
    '0',
  );
  return (
    <Tabs
      activeKey={activeKey}
      onChange={({activeKey}) => {
        setActiveKey(activeKey);
      }}
    >
      <Tab title="Tab Link 1">
        <div>{content[Number(activeKey)]}</div>
      </Tab>
      <Tab title="Tab Link 2">
        <div>{content[Number(activeKey)]}</div>
      </Tab>
      <Tab title="Tab Link 3">
        <div>{content[Number(activeKey)]}</div>
      </Tab>
    </Tabs>
  );
}
