/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {getOverrides} from '../helpers/overrides.js';
import {StyledGrid, StyledCell} from './styled-components.js';

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
  overrides: GridOverrides = {},
}: GridPropsT) {
  const [Grid, gridOverrideProps] = getOverrides(
    GridOverrides.Grid,
    StyledGrid,
  );
  return (
    <Grid
      $behavior={behavior}
      $gridMargins={gridMargins}
      $gridGutters={gridGutters}
      $gridMaxWidth={gridMaxWidth}
      $gridUnit={gridUnit}
      $align={align}
      {...gridOverrideProps}
    >
      {React.Children.map(children, child => {
        const {
          align,
          children,
          order,
          overrides: CellOverrides = {},
          skip,
          span,
        } = child.props;
        const [Cell, cellOverrideProps] = getOverrides(
          CellOverrides.Cell,
          StyledCell,
        );
        return (
          <Cell
            $align={align}
            $order={order}
            $skip={skip}
            $span={span}
            $gridColumns={gridColumns}
            $gridGutters={gridGutters}
            $gridUnit={gridUnit}
            $gridGaps={gridGaps}
            {...cellOverrideProps}
          >
            {children}
          </Cell>
        );
      })}
    </Grid>
  );
}
