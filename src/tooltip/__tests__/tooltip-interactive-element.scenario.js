/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {StatefulTooltip} from '../index.js';
import {Button} from '../../button/index.js';

export default function Scenario() {
  return (
    <div>
      <StatefulTooltip
        accessibilityType={'tooltip'}
        content="Tooltips display short messages."
      >
        <Button>Button</Button>
      </StatefulTooltip>
      <StatefulTooltip
        accessibilityType={'tooltip'}
        content="Tooltips display short messages."
      >
        <Button>Button</Button>
      </StatefulTooltip>
    </div>
  );
}
