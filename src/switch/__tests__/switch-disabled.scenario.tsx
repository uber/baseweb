/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import * as React from 'react';
import { Switch } from '../';

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
        disabled
      >
        Disabled Switch
      </Switch>
      <Switch
        checked={switches[1]}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const nextSwitches = [...switches];
          nextSwitches[1] = e.currentTarget.checked;
          setSwitches(nextSwitches);
        }}
      >
        Enabled Switch
      </Switch>
    </div>
  );
}
