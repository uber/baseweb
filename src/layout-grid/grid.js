/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {getOverrides} from '../helpers/overrides.js';
import {StyledGrid as DefaultStyledGrid} from './styled-components.js';
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
  const [StyledGrid, overrideProps] = getOverrides(
    overrides.Grid,
    DefaultStyledGrid,
  );
  return (
    <StyledGrid
      $align={align}
      $behavior={behavior}
      $gridGutters={gridGutters}
      $gridMargins={gridMargins}
      $gridMaxWidth={gridMaxWidth}
      $gridUnit={gridUnit}
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
    </StyledGrid>
  );
}
