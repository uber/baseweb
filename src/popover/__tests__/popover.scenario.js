/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {Button} from '../../button/index.js';
import {StatefulPopover} from '../index.js';
import {Block} from '../../block/index.js';

export default function Scenario() {
  return (
    <div>
      {new Array(222).fill('').map((_, idx) => (
        <StatefulPopover
          key={idx}
          content={() => <Block padding={'20px'}>🎉</Block>}
          onMouseEnterDelay={0}
          onMouseLeaveDelay={0}
          showArrow={false}
          triggerType={'hover'}
        >
          <Button>👋</Button>
        </StatefulPopover>
      ))}
    </div>
  );
}
