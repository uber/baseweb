/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import { StatefulTextarea } from '../index.js';

export function Scenario() {
  return (
    <StatefulTextarea
      clearable
      placeholder="Uncontrolled textarea"
      initialState={{ value: 'initial value' }}
      overrides={{
        ClearIcon: {
          props: { 'data-e2e': 'clear-icon' },
        },
      }}
    />
  );
}
