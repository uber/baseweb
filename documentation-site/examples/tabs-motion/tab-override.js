// @flow

import * as React from 'react';
import {Tabs, Tab} from 'baseui/tabs-motion';

export default () => {
  const [activeKey, setActiveKey] = React.useState('0');
  return (
    <Tabs
      activeKey={activeKey}
      onChange={({activeKey}) => {
        setActiveKey(activeKey);
      }}
      activateOnFocus
    >
      <Tab
        overrides={{
          Tab: {
            style: {':hover': {background: 'green'}},
          },
        }}
        title="First"
      >
        Content 1
      </Tab>
      <Tab title="Second">Content 2</Tab>
      <Tab title="Third">Content 3</Tab>
    </Tabs>
  );
};
