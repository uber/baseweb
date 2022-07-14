/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';
import { getOverrides } from '../helpers/overrides';
import { StyledCell as DefaultStyledCell } from './styled-components';
import { GridContext } from './grid';
import type { CellProps } from './types';

export default function Cell({
  align,
  children,
  gridColumns,
  gridGaps,
  gridGutters,
  gridUnit,
  order,
  skip,
  span,
  overrides = {},
}: CellProps) {
  const [StyledCell, overrideProps] = getOverrides(overrides.Cell, DefaultStyledCell);
  const gridContext = React.useContext(GridContext);
  return (
    <StyledCell
      $align={align}
      // TODO(v11): Remove the four grid props, get them solely from GridContext
      $gridColumns={gridColumns || gridContext.gridColumns}
      $gridGaps={gridGaps || gridContext.gridGaps}
      $gridGutters={gridGutters || gridContext.gridGutters}
      $gridUnit={gridUnit || gridContext.gridUnit}
      $order={order}
      $skip={skip}
      $span={span}
      {...overrideProps}
    >
      {children}
    </StyledCell>
  );
}
