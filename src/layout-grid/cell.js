/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {getOverrides, withOverrides} from '../helpers/overrides.js';
import {StyledCell as DefaultStyledCell} from './styled-components.js';
import {GridContext} from './grid.js';
import type {CellPropsT} from './types.js';

function Cell({
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
}: CellPropsT) {
  const [StyledCell, overrideProps] = getOverrides(
    overrides.Cell,
    DefaultStyledCell,
  );
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

export default withOverrides(Cell, 'Cell');
