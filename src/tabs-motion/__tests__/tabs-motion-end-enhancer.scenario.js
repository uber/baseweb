/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

/* eslint-disable jsx-a11y/accessible-emoji */

import * as React from 'react';
import { Tab, Tabs, ORIENTATION } from '../index.js';
import { Button, KIND, SIZE, SHAPE } from '../../button/index.js';
import Menu from '../../icon/menu.js';

export function Scenario() {
  const [activeKey, setActiveKey] = React.useState(0);
  return (
    <div style={{ maxWidth: '600px' }}>
      <div style={{ marginBottom: '100px' }}>
        <Tabs
          activeKey={activeKey}
          onChange={({ activeKey }) => setActiveKey(activeKey)}
          endEnhancer={() => <Menu size={24} />}
        >
          <Tab title="Robot">
            <Button kind={KIND.secondary}>🤖</Button>
          </Tab>
          <Tab title="Monster">
            <Button kind={KIND.secondary}>👺</Button>
          </Tab>
          <Tab title="Watermelon">
            <Button kind={KIND.secondary}>🍉</Button>
          </Tab>
          <Tab title="Heart">
            <Button kind={KIND.secondary}>❤️</Button>
          </Tab>
          <Tab title="Flame">
            <Button kind={KIND.secondary}>🔥</Button>
          </Tab>
          <Tab title="Chocolate">
            <Button kind={KIND.secondary}>🍫</Button>
          </Tab>
          <Tab title="Butterfly">
            <Button kind={KIND.secondary}>🦋</Button>
          </Tab>
          <Tab title="Volcano">
            <Button kind={KIND.secondary}>🌋</Button>
          </Tab>
        </Tabs>
      </div>

      <div style={{ marginBottom: '100px' }}>
        <Tabs
          activeKey={activeKey}
          onChange={({ activeKey }) => setActiveKey(activeKey)}
          endEnhancer={
            <Button size={SIZE.compact} shape={SHAPE.pill}>
              Button
            </Button>
          }
        >
          <Tab title="Robot">
            <Button kind={KIND.secondary}>🤖</Button>
          </Tab>
          <Tab title="Monster">
            <Button kind={KIND.secondary}>👺</Button>
          </Tab>
          <Tab title="Watermelon">
            <Button kind={KIND.secondary}>🍉</Button>
          </Tab>
          <Tab title="Heart">
            <Button kind={KIND.secondary}>❤️</Button>
          </Tab>
          <Tab title="Flame">
            <Button kind={KIND.secondary}>🔥</Button>
          </Tab>
          <Tab title="Chocolate">
            <Button kind={KIND.secondary}>🍫</Button>
          </Tab>
          <Tab title="Butterfly">
            <Button kind={KIND.secondary}>🦋</Button>
          </Tab>
          <Tab title="Volcano">
            <Button kind={KIND.secondary}>🌋</Button>
          </Tab>
        </Tabs>
      </div>

      <div style={{ marginBottom: '100px' }}>
        <Tabs
          activeKey={activeKey}
          onChange={({ activeKey }) => setActiveKey(activeKey)}
          endEnhancer="String w/ min-width style override"
          overrides={{
            EndEnhancerContainer: {
              style: {
                minWidth: '225px',
              },
            },
          }}
        >
          <Tab title="Robot">
            <Button kind={KIND.secondary}>🤖</Button>
          </Tab>
          <Tab title="Monster">
            <Button kind={KIND.secondary}>👺</Button>
          </Tab>
          <Tab title="Watermelon">
            <Button kind={KIND.secondary}>🍉</Button>
          </Tab>
          <Tab title="Heart">
            <Button kind={KIND.secondary}>❤️</Button>
          </Tab>
          <Tab title="Flame">
            <Button kind={KIND.secondary}>🔥</Button>
          </Tab>
          <Tab title="Chocolate">
            <Button kind={KIND.secondary}>🍫</Button>
          </Tab>
          <Tab title="Butterfly">
            <Button kind={KIND.secondary}>🦋</Button>
          </Tab>
          <Tab title="Volcano">
            <Button kind={KIND.secondary}>🌋</Button>
          </Tab>
        </Tabs>
      </div>

      <div style={{ marginBottom: '100px' }}>
        <Tabs
          activeKey={activeKey}
          onChange={({ activeKey }) => setActiveKey(activeKey)}
          endEnhancer={() => <span>Will not appear</span>}
          orientation={ORIENTATION.vertical}
        >
          <Tab title="Robot">
            <Button kind={KIND.secondary}>🤖</Button>
          </Tab>
          <Tab title="Monster">
            <Button kind={KIND.secondary}>👺</Button>
          </Tab>
          <Tab title="Watermelon">
            <Button kind={KIND.secondary}>🍉</Button>
          </Tab>
          <Tab title="Heart">
            <Button kind={KIND.secondary}>❤️</Button>
          </Tab>
          <Tab title="Flame">
            <Button kind={KIND.secondary}>🔥</Button>
          </Tab>
          <Tab title="Chocolate">
            <Button kind={KIND.secondary}>🍫</Button>
          </Tab>
          <Tab title="Butterfly">
            <Button kind={KIND.secondary}>🦋</Button>
          </Tab>
          <Tab title="Volcano">
            <Button kind={KIND.secondary}>🌋</Button>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
