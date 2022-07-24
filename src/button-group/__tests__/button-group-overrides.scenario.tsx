/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { Button } from '../../button';
import { StatefulButtonGroup, MODE } from '..';

const buttonOverrides = {
  BaseButton: {
    style: ({ $isSelected }) => {
      if ($isSelected)
        return {
          backgroundColor: 'seagreen',
        };
    },
  },
};

export function Scenario() {
  return (
    <StatefulButtonGroup mode={MODE.checkbox} initialState={{ selected: [0, 1] }}>
      <Button overrides={buttonOverrides}>Label</Button>
      <Button overrides={buttonOverrides}>Label</Button>
      <Button overrides={buttonOverrides}>Label</Button>
    </StatefulButtonGroup>
  );
}
