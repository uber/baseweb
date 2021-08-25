/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {Button} from '../../button/index.js';
import {StatefulPopover, TRIGGER_TYPE} from '../index.js';

function PopoverOnHover() {
  return (
    <StatefulPopover
      triggerType={'hover'}
      placement="bottomLeft"
      ignoreBoundary
      accessibilityType="menu"
      onClick={() => console.log('hover')}
      content={
        <div>
          <div>3. now click on "hover popover".</div>
          <div>First popover should be closed now but it is not. </div>
        </div>
      }
    >
      <div>hover popover</div>
    </StatefulPopover>
  );
}

function PopoverOnClick() {
  return (
    <StatefulPopover
      triggerType={'click'}
      placement="bottomLeft"
      ignoreBoundary
      accessibilityType="menu"
      onClick={() => console.log('click')}
      content={<span>2. now hover on "hover popover"</span>}
    >
      <div>1. click here</div>
    </StatefulPopover>
  );
}

export default function Scenario() {
  return (
    <div>
      <div>
        <PopoverOnClick />
      </div>
      <div style={{paddingTop: '100px'}}>
        <PopoverOnHover />
      </div>
    </div>
  );
}
