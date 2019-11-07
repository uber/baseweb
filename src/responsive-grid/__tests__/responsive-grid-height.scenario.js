/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {Grid, Cell, ALIGNMENT} from '../index.js';
import Inner from './inner.js';

export const name = 'responsive-grid-height';

export function component() {
  return (
    <>
      {/* Align grid. */}
      <Grid align={ALIGNMENT.center}>
        <Cell>
          <Inner style={{height: '50px'}}>1</Inner>
        </Cell>
        <Cell>
          <Inner style={{height: '75px'}}>2</Inner>
        </Cell>
        <Cell>
          <Inner style={{height: '25px'}}>3</Inner>
        </Cell>
      </Grid>
      <br />
      {/* Align grid with wrapping cells. */}
      <Grid align={ALIGNMENT.center}>
        <Cell span={5}>
          <Inner style={{height: '50px'}}>1</Inner>
        </Cell>
        <Cell span={5}>
          <Inner style={{height: '75px'}}>2</Inner>
        </Cell>
        <Cell span={5}>
          <Inner style={{height: '25px'}}>3</Inner>
        </Cell>
        <Cell span={5}>
          <Inner style={{height: '75px'}}>3</Inner>
        </Cell>
      </Grid>
      <br />
      {/* Align single cell. */}
      <Grid>
        <Cell>
          <Inner style={{height: '50px'}}>1</Inner>
        </Cell>
        <Cell>
          <Inner style={{height: '75px'}}>2</Inner>
        </Cell>
        <Cell align={ALIGNMENT.end}>
          <Inner style={{height: '25px'}}>3</Inner>
        </Cell>
      </Grid>
      <br />
      {/* Align single cell. */}
      <Grid align={ALIGNMENT.center}>
        <Cell>
          <Inner style={{height: '50px'}}>1</Inner>
        </Cell>
        <Cell>
          <Inner style={{height: '75px'}}>2</Inner>
        </Cell>
        <Cell align={ALIGNMENT.start}>
          <Inner style={{height: '25px'}}>3</Inner>
        </Cell>
      </Grid>
      <br />
      {/* Align grid responsive. */}
      <Grid align={[ALIGNMENT.center, ALIGNMENT.start, ALIGNMENT.end]}>
        <Cell>
          <Inner style={{height: '50px'}}>1</Inner>
        </Cell>
        <Cell>
          <Inner style={{height: '75px'}}>2</Inner>
        </Cell>
        <Cell>
          <Inner style={{height: '25px'}}>3</Inner>
        </Cell>
      </Grid>
      <br />
      {/* Align cell responsive. */}
      <Grid>
        <Cell>
          <Inner style={{height: '50px'}}>1</Inner>
        </Cell>
        <Cell>
          <Inner style={{height: '75px'}}>2</Inner>
        </Cell>
        <Cell align={[ALIGNMENT.center, ALIGNMENT.start, ALIGNMENT.end]}>
          <Inner style={{height: '25px'}}>3</Inner>
        </Cell>
      </Grid>
      <br />
      {/* Align grid and cell responsive. */}
      <Grid align={[ALIGNMENT.start, ALIGNMENT.end]}>
        <Cell>
          <Inner style={{height: '50px'}}>1</Inner>
        </Cell>
        <Cell>
          <Inner style={{height: '75px'}}>2</Inner>
        </Cell>
        <Cell align={[ALIGNMENT.end, ALIGNMENT.start]}>
          <Inner style={{height: '25px'}}>3</Inner>
        </Cell>
      </Grid>
    </>
  );
}
