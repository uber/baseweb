/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';

import { Button } from '..';
import { SIZE } from '../constants';

export function Scenario() {
  return (
    <React.Fragment>
      <Button size={SIZE.mini}>Primary</Button>
      <Button size={SIZE.compact}>Primary</Button>
      <Button size={SIZE.default}>Primary</Button>
      <Button size={SIZE.large}>Primary</Button>
    </React.Fragment>
  );
}
