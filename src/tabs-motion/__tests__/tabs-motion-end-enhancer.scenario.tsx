/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-disable jsx-a11y/accessible-emoji */

import * as React from 'react';
import { Tab, Tabs, ORIENTATION, FILL } from '../index';
import { Button, KIND, SIZE, SHAPE } from '../../button/index';
import Menu from '../../icon/menu';

export function Scenario() {
  const [activeKey1, setActiveKey1] = React.useState<React.Key>('0');
  const [activeKey5, setActiveKey5] = React.useState<React.Key>('0');
  const [activeKey2, setActiveKey2] = React.useState<React.Key>('0');
  const [activeKey3, setActiveKey3] = React.useState<React.Key>('0');
  const [activeKey4, setActiveKey4] = React.useState<React.Key>('0');
  return (
    <>
      <div style={{ marginBottom: '100px' }}>
        <Tabs
          activeKey={activeKey1}
          onChange={({ activeKey }) => setActiveKey1(activeKey)}
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
          activeKey={activeKey5}
          onChange={({ activeKey }) => setActiveKey5(activeKey)}
          endEnhancer={() => <Menu size={24} />}
          fill={FILL.fixed}
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

      <div style={{ maxWidth: '600px', marginBottom: '100px' }}>
        <Tabs
          activeKey={activeKey2}
          onChange={({ activeKey }) => setActiveKey2(activeKey)}
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

      <div style={{ maxWidth: '600px', marginBottom: '100px' }}>
        <Tabs
          activeKey={activeKey3}
          onChange={({ activeKey }) => setActiveKey3(activeKey)}
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
          activeKey={activeKey4}
          onChange={({ activeKey }) => setActiveKey4(activeKey)}
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
    </>
  );
}
