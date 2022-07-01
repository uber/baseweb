/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import { Button } from '../../button/index.js';
import { useStyletron } from '../../styles/index.js';
import { Popover } from '../index.js';

export function Scenario() {
  const [css] = useStyletron();
  return (
    <div className={css({ backgroundColor: 'lightskyblue' })}>
      <div>
        <Popover
          autoFocus={false}
          accessibilityType={'tooltip'}
          isOpen
          content={<div>content</div>}
          popoverMargin={30}
        >
          <Button>Open</Button>
        </Popover>
      </div>

      <div>
        <Popover
          autoFocus={false}
          accessibilityType={'tooltip'}
          isOpen
          content={<div>content</div>}
          popoverMargin={30}
          showArrow
        >
          <Button>Open</Button>
        </Popover>
      </div>
    </div>
  );
}
