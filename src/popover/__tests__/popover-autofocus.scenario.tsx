/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import { Button } from '../../button/index.js';
import { StatefulPopover } from '../index.js';

export function Scenario() {
  return (
    <div>
      <StatefulPopover
        content={() => (
          <div style={{ padding: '20px' }}>
            Hello, there!
            <input placeholder="Focusable Element" />
          </div>
        )}
      >
        <Button>Click me</Button>
      </StatefulPopover>
    </div>
  );
}
