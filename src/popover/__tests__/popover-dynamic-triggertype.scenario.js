/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {Popover} from '../index.js';

// https://github.com/uber/baseweb/issues/4617
export function Scenario() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [triggerType, setTriggerType] = React.useState('hover');

  return (
    <div>
      <Popover
        content={
          <p id={triggerType === 'hover' ? 'content-hover' : 'content-click'}>
            {triggerType === 'hover' ? 'hover' : 'click'}
          </p>
        }
        isOpen={isOpen}
        onClick={() => setTriggerType('click')}
        onClickOutside={() => {
          setIsOpen(false);
          setTriggerType('hover');
        }}
        onMouseLeave={() => setIsOpen(false)}
        onMouseEnter={() => setIsOpen(true)}
        triggerType={triggerType}
      >
        <button onClick={() => setTriggerType('click')}>
          click or hover me
        </button>
      </Popover>

      <p id="outside-target">click outside target</p>
    </div>
  );
}
