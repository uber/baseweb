// @flow
import * as React from 'react';
import {Tabs, Tab, TAB_WIDTH} from 'baseui/tabs';

const content = ['Tab Content 1', 'Tab Content 2', 'Tab Content 3'];

export default function TabWidthExample() {
  const [activeKey, setActiveKey] = React.useState('0');
  return (
    <Tabs
      activeKey={activeKey}
      onChange={({activeKey}) => {
        setActiveKey(activeKey);
      }}
      tabWidth={TAB_WIDTH.fixed}
    >
      <Tab title="First">
        <div>{content[Number(activeKey)]}</div>
      </Tab>
      <Tab title="Second">
        <div>{content[Number(activeKey)]}</div>
      </Tab>
      <Tab title="Third">
        <div>{content[Number(activeKey)]}</div>
      </Tab>
    </Tabs>
  );
}
