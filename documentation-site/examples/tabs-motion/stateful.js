// @flow

import React from 'react';
import {StatefulTabs, Tab} from 'baseui/tabs-motion';

export default () => {
  return (
    <StatefulTabs>
      <Tab title="First">I must not fear.</Tab>
      <Tab title="Second">Fear is the mind-killer.</Tab>
      <Tab title="Third">
        Fear is the little-death that brings total obliteration.
      </Tab>
    </StatefulTabs>
  );
};
