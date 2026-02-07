
/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { Switch } from '..';

export function Scenario() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        alignItems: 'flex-start',
      }}
    >
      <Switch>Switch</Switch>
      <Switch checked>Switch checked</Switch>
      <Switch checked showIcon>
        Switch checked(show checkmark icon)
      </Switch>

      <Switch disabled>Switch disabled</Switch>
      <Switch disabled checked>
        Switch disabled checked
      </Switch>
    </div>
  );
}
