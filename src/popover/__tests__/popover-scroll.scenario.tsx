/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { StatefulPopover } from '..';

function PopoverContent() {
  return (
    <div id="content">
      <p>content</p>
      <input />
    </div>
  );
}

export function Scenario() {
  return (
    <div style={{ height: '2000px' }}>
      <div style={{ height: '1500px' }}>
        <p>scroll down for test cases</p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div id="case-not-focus-locked">
          <StatefulPopover content={PopoverContent}>
            <button id="button-not-focus-locked">not-focus-locked</button>
          </StatefulPopover>
        </div>
        <div id="case-focus-locked">
          <StatefulPopover content={PopoverContent} focusLock>
            <button id="button-focus-locked">focus-locked</button>
          </StatefulPopover>
        </div>
      </div>
    </div>
  );
}
