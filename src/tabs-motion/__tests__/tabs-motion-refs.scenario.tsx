/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-disable jsx-a11y/accessible-emoji */

import * as React from 'react';
import { Tab, Tabs } from '..';
import { Button, KIND } from '../../button';

export function Scenario() {
  const [activeKey, setActiveKey] = React.useState<React.Key>(0);
  const ref = React.useRef<HTMLButtonElement>();
  const [s, ss] = React.useState(0);
  React.useEffect(() => {
    if (ref.current) ss(ref.current.clientWidth);
  });
  return (
    <React.Fragment>
      <Tabs activeKey={activeKey} onChange={({ activeKey }) => setActiveKey(activeKey)}>
        <Tab title="Robot" tabRef={ref}>
          <Button kind={KIND.secondary}>🤖</Button>
        </Tab>
        <Tab title="Monster">
          <Button kind={KIND.secondary}>👺</Button>
        </Tab>
        <Tab title="Watermelon">
          <Button kind={KIND.secondary}>🍉</Button>
        </Tab>
      </Tabs>
      {`${s}px`}
    </React.Fragment>
  );
}
