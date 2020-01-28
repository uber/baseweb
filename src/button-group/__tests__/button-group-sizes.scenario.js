/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import {Button} from '../../button/index.js';
import {StatefulButtonGroup, MODE} from '../index.js';
import {SIZE} from '../../button/index.js';

export const name = 'button-group-sizes';

export const component = () => (
  <React.Fragment>
    <StatefulButtonGroup mode={MODE.radio} size={SIZE.compact}>
      <Button>Label</Button>
      <Button>Label</Button>
      <Button>Label</Button>
    </StatefulButtonGroup>
    <StatefulButtonGroup mode={MODE.radio} size={SIZE.default}>
      <Button>Label</Button>
      <Button>Label</Button>
      <Button>Label</Button>
    </StatefulButtonGroup>
    <StatefulButtonGroup mode={MODE.radio} size={SIZE.large}>
      <Button>Label</Button>
      <Button>Label</Button>
      <Button>Label</Button>
    </StatefulButtonGroup>
  </React.Fragment>
);
