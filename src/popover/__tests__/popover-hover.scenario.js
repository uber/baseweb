/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {Button} from '../../button/index.js';
import {StatefulPopover, TRIGGER_TYPE, PLACEMENT} from '../index.js';

export function Scenario() {
  return (
    <div style={{padding: '36px'}}>
      <StatefulPopover
        accessibilityType={'tooltip'}
        content={<div id="content">content</div>}
        placement={PLACEMENT.right}
        triggerType={TRIGGER_TYPE.hover}
      >
        <Button>Open</Button>
      </StatefulPopover>
    </div>
  );
}
