/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {Grid, Cell, BEHAVIOR} from '../index.js';
import Inner from './inner.js';

export default function Scenario() {
  return (
    <>
      <Grid behavior={BEHAVIOR.fixed}>
        <Cell span={12}>
          <Inner>1</Inner>
        </Cell>
      </Grid>
      <br />
      <Grid behavior={BEHAVIOR.fluid}>
        <Cell span={12}>
          <Inner>2</Inner>
        </Cell>
      </Grid>
    </>
  );
}
