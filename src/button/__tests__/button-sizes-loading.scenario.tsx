/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';

import { Button } from '../index';
import { SIZE } from '../constants';

export function Scenario() {
  return (
    <React.Fragment>
      <Button size={SIZE.mini}>Mini</Button>
      <Button isLoading size={SIZE.mini}>
        Mini
      </Button>
      <Button size={SIZE.compact}>Compact</Button>
      <Button isLoading size={SIZE.compact}>
        Compact
      </Button>

      <Button size={SIZE.default}>Default</Button>
      <Button isLoading size={SIZE.default}>
        Default
      </Button>
      <Button size={SIZE.large}>Large</Button>
      <Button isLoading size={SIZE.large}>
        Large
      </Button>
    </React.Fragment>
  );
}
