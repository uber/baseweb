/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

/* eslint-disable jsx-a11y/accessible-emoji */

import * as React from 'react';
import {Tab, Tabs} from '../index.js';
import {Button, KIND} from '../../button/index.js';

export default function Scenario() {
  const [activeKey, setActiveKey] = React.useState('0');
  return (
    <Tabs
      activeKey={activeKey}
      onChange={({activeKey}) => setActiveKey(activeKey)}
    >
      <Tab title="Robot">
        <div style={{padding: '16px'}}>
          <Button kind={KIND.secondary}>🤖</Button>
        </div>
      </Tab>
      <Tab title="Monster" disabled>
        <div style={{padding: '16px'}}>
          <Button kind={KIND.secondary}>👺</Button>
        </div>
      </Tab>
      <Tab title="Watermelon">
        <div style={{padding: '16px'}}>
          <Button kind={KIND.secondary}>🍉</Button>
        </div>
      </Tab>
    </Tabs>
  );
}
