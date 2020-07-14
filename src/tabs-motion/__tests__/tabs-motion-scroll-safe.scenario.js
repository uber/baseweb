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

// This scenario tests to make sure that the page does not scroll to the
// component on initial mount.

export default function Scenario() {
  const [activeKey, setActiveKey] = React.useState('8');
  return (
    <React.Fragment>
      <div style={{height: '100vh'}} />
      <Tabs
        activeKey={activeKey}
        onChange={({activeKey}) => setActiveKey(activeKey)}
      >
        <Tab title="Watermelon">
          <Button kind={KIND.secondary}>🍉</Button>
        </Tab>
        <Tab title="Watermelon">
          <Button kind={KIND.secondary}>🍉</Button>
        </Tab>
        <Tab title="Watermelon">
          <Button kind={KIND.secondary}>🍉</Button>
        </Tab>
        <Tab title="Watermelon">
          <Button kind={KIND.secondary}>🍉</Button>
        </Tab>
        <Tab title="Watermelon">
          <Button kind={KIND.secondary}>🍉</Button>
        </Tab>
        <Tab title="Watermelon">
          <Button kind={KIND.secondary}>🍉</Button>
        </Tab>
        <Tab title="Watermelon">
          <Button kind={KIND.secondary}>🍉</Button>
        </Tab>
        <Tab title="Watermelon">
          <Button kind={KIND.secondary}>🍉</Button>
        </Tab>
        <Tab title="Watermelon">
          <Button kind={KIND.secondary}>🍉</Button>
        </Tab>
        <Tab title="Watermelon">
          <Button kind={KIND.secondary}>🍉</Button>
        </Tab>
        <Tab title="Watermelon">
          <Button kind={KIND.secondary}>🍉</Button>
        </Tab>
        <Tab title="Watermelon">
          <Button kind={KIND.secondary}>🍉</Button>
        </Tab>
        <Tab title="Watermelon">
          <Button kind={KIND.secondary}>🍉</Button>
        </Tab>
      </Tabs>
      <div style={{height: '100vh'}} />
    </React.Fragment>
  );
}
