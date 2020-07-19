import React from 'react';
import {Tabs, Tab, ORIENTATION} from 'baseui/tabs-motion';

export default () => {
  const [activeKey, setActiveKey] = React.useState<React.Key>(0);
  return (
    <Tabs
      activeKey={activeKey}
      onChange={({activeKey}) => setActiveKey(activeKey)}
      orientation={ORIENTATION.vertical}
    >
      <Tab title="First">I must not fear.</Tab>
      <Tab title="Second">Fear is the mind-killer.</Tab>
      <Tab title="Third">
        Fear is the little-death that brings total obliteration.
      </Tab>
    </Tabs>
  );
};
