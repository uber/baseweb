/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { Button } from '../../button';
import { StatefulButtonGroup, MODE } from '..';

export function Scenario() {
  return (
    <StatefulButtonGroup mode={MODE.checkbox} initialState={{ selected: [0, 1] }}>
      <Button>Label</Button>
      <Button>Label</Button>
      <Button>Label</Button>
    </StatefulButtonGroup>
  );
}
