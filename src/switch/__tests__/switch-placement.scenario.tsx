/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import * as React from 'react';
import { Switch, LABEL_PLACEMENT } from '../';

export function Scenario() {
  const [switches, setSwitches] = React.useState([false, false]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        alignItems: 'flex-start',
      }}
    >
      <Switch
        checked={switches[0]}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const nextSwitches = [...switches];
          nextSwitches[0] = e.currentTarget.checked;
          setSwitches(nextSwitches);
        }}
        labelPlacement={LABEL_PLACEMENT.left}
      >
        Label on the left
      </Switch>
      <Switch
        checked={switches[1]}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const nextSwitches = [...switches];
          nextSwitches[1] = e.currentTarget.checked;
          setSwitches(nextSwitches);
        }}
        labelPlacement={LABEL_PLACEMENT.right}
      >
        Label on the right
      </Switch>
    </div>
  );
}
