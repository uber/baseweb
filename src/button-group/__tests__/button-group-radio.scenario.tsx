/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { Button } from '../../button/index';
import { StatefulButtonGroup, MODE } from '../index';

export function Scenario() {
  return (
    <StatefulButtonGroup mode={MODE.radio} initialState={{ selected: 0 }}>
      <Button>Label</Button>
      <Button>Label</Button>
      <Button>Label</Button>
    </StatefulButtonGroup>
  );
}
