/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {getOverrides} from '../helpers/overrides.js';
import {
  StyledGrid as DefaultStyledGrid,
  StyledCell as DefaultStyledCell,
} from './styled-components.js';

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
  const {StyledGrid: StyledGridOverride} = overrides;
  const [StyledGrid, styledGridProps] = getOverrides(
    StyledGridOverride,
    DefaultStyledGrid,
  );
  const {StyledCell: StyledGridCellOverride} = overrides;
  const [StyledGridCell, styledGridCellProps] = getOverrides(
    StyledGridCellOverride,
    DefaultStyledCell,
  );
  return (
    <StyledGrid
      $behavior={behavior}
      $gridMargins={gridMargins}
      $gridGutters={gridGutters}
      $gridMaxWidth={gridMaxWidth}
      $gridUnit={gridUnit}
      $align={align}
      {...styledGridProps}
    >
      {React.Children.map(children, child => {
        const {
          overrides = {},
          align,
          children,
          order,
          skip,
          span,
        } = child.props;
        const {StyledCell: StyledCellOverride} = overrides;
        const [StyledCell, styledCellProps] = getOverrides(
          StyledCellOverride,
          StyledGridCell,
        );
        return (
          <StyledCell
            $align={align}
            $order={order}
            $skip={skip}
            $span={span}
            $gridColumns={gridColumns}
            $gridGutters={gridGutters}
            $gridUnit={gridUnit}
            $gridGaps={gridGaps}
            {...styledGridCellProps}
            {...styledCellProps}
          >
            {children}
          </StyledCell>
        );
      })}
    </StyledGrid>
  );
}
