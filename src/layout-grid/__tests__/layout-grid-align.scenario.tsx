/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';
import { Grid, Cell, ALIGNMENT } from '../index';
import Inner from './inner';

export function Scenario() {
  return (
    <>
      {/* No alignment specified. (defaults to `normal`) */}
      <Grid>
        <Cell>
          <Inner h="50px">1</Inner>
        </Cell>
        <Cell>
          <Inner h="75px">2</Inner>
        </Cell>
        <Cell>
          <Inner h="25px">3</Inner>
        </Cell>
      </Grid>
      <br />
      {/* Align grid along start. */}
      <Grid align={ALIGNMENT.start}>
        <Cell>
          <Inner h="50px">1</Inner>
        </Cell>
        <Cell>
          <Inner h="75px">2</Inner>
        </Cell>
        <Cell>
          <Inner h="25px">3</Inner>
        </Cell>
      </Grid>
      <br />
      {/* Align grid along center. */}
      <Grid align={ALIGNMENT.center}>
        <Cell>
          <Inner h="50px">1</Inner>
        </Cell>
        <Cell>
          <Inner h="75px">2</Inner>
        </Cell>
        <Cell>
          <Inner h="25px">3</Inner>
        </Cell>
      </Grid>
      <br />
      {/* Align grid along end. */}
      <Grid align={ALIGNMENT.end}>
        <Cell>
          <Inner h="50px">1</Inner>
        </Cell>
        <Cell>
          <Inner h="75px">2</Inner>
        </Cell>
        <Cell>
          <Inner h="25px">3</Inner>
        </Cell>
      </Grid>
      <br />
      {/* Align grid with wrapping cells. */}
      <Grid align={ALIGNMENT.center}>
        <Cell span={4}>
          <Inner h="50px">1</Inner>
        </Cell>
        <Cell span={4}>
          <Inner h="75px">2</Inner>
        </Cell>
        <Cell span={4}>
          <Inner h="25px">3</Inner>
        </Cell>
        <Cell span={4}>
          <Inner h="75px">3</Inner>
        </Cell>
      </Grid>
      <br />
      {/* Align single cell. */}
      <Grid>
        <Cell>
          <Inner h="50px">1</Inner>
        </Cell>
        <Cell>
          <Inner h="75px">2</Inner>
        </Cell>
        <Cell align={ALIGNMENT.end}>
          <Inner h="25px">3</Inner>
        </Cell>
      </Grid>
      <br />
      {/* Align grid and single cell. */}
      <Grid align={ALIGNMENT.center}>
        <Cell>
          <Inner h="50px">1</Inner>
        </Cell>
        <Cell>
          <Inner h="75px">2</Inner>
        </Cell>
        <Cell align={ALIGNMENT.start}>
          <Inner h="25px">3</Inner>
        </Cell>
      </Grid>
      <br />
      {/* Align grid responsive. */}
      <Grid align={[ALIGNMENT.center, ALIGNMENT.start, ALIGNMENT.end]}>
        <Cell>
          <Inner h="50px">1</Inner>
        </Cell>
        <Cell>
          <Inner h="75px">2</Inner>
        </Cell>
        <Cell>
          <Inner h="25px">3</Inner>
        </Cell>
      </Grid>
      <br />
      {/* Align cell responsive. */}
      <Grid>
        <Cell>
          <Inner h="50px">1</Inner>
        </Cell>
        <Cell>
          <Inner h="75px">2</Inner>
        </Cell>
        <Cell align={[ALIGNMENT.center, ALIGNMENT.start, ALIGNMENT.end]}>
          <Inner h="25px">3</Inner>
        </Cell>
      </Grid>
      <br />
      {/* Align grid and cell responsive. */}
      <Grid align={[ALIGNMENT.start, ALIGNMENT.end]}>
        <Cell>
          <Inner h="50px">1</Inner>
        </Cell>
        <Cell>
          <Inner h="75px">2</Inner>
        </Cell>
        <Cell align={[ALIGNMENT.end, ALIGNMENT.start]}>
          <Inner h="25px">3</Inner>
        </Cell>
      </Grid>
    </>
  );
}
