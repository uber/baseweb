/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import { Button, SIZE } from '../../button/index.js';
import { StatefulButtonGroup, MODE } from '../index.js';

export function Scenario() {
  return (
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
}
