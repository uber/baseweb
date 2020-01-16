/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {Button} from '../../button/index.js';
import {StatefulButtonGroup, MODE} from '../index.js';

export const name = 'button-group-overrides';

const buttonOverrides = {
  BaseButton: {
    style: ({$isSelected}) => {
      if ($isSelected)
        return {
          backgroundColor: 'seagreen',
        };
    },
  },
};

export const component = () => (
  <StatefulButtonGroup mode={MODE.checkbox} initialState={{selected: [0, 1]}}>
    <Button overrides={buttonOverrides}>Label</Button>
    <Button overrides={buttonOverrides}>Label</Button>
    <Button overrides={buttonOverrides}>Label</Button>
  </StatefulButtonGroup>
);
