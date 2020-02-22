/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {getOverrides} from '../helpers/overrides.js';
import {StyledGrid} from './styled-components.js';
import Cell from './cell.js';

import type {GridPropsT} from './types.js';

export default function Grid({
  align,
  behavior,
  children,
  gridColumns,
  gridGaps,
  gridGutters,
  gridMargins,
  gridMaxWidth,
  gridUnit,
  overrides = {},
}: GridPropsT) {
  const [Grid, overrideProps] = getOverrides(overrides.Grid, StyledGrid);
  return (
    <Grid
      $behavior={behavior}
      $gridMargins={gridMargins}
      $gridGutters={gridGutters}
      $gridMaxWidth={gridMaxWidth}
      $gridUnit={gridUnit}
      $align={align}
      {...overrideProps}
    >
      {React.Children.map(children, child => {
        return (
          <Cell
            gridColumns={gridColumns}
            gridGaps={gridGaps}
            gridGutters={gridGutters}
            gridUnit={gridUnit}
            {...child.props}
          />
        );
      })}
    </Grid>
  );
}
