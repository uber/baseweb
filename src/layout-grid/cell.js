/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {getOverrides} from '../helpers/overrides.js';
import {StyledCell} from './styled-components.js';

import type {CellPropsT} from './types.js';

export default function Cell({
  align,
  children,
  gridColumns,
  gridGaps,
  gridGutters,
  gridUnit,
  order,
  overrides = {},
  skip,
  span,
}: CellPropsT) {
  const [Cell, overrideProps] = getOverrides(overrides.Cell, StyledCell);
  return (
    <Cell
      $align={align}
      $gridColumns={gridColumns}
      $gridGaps={gridGaps}
      $gridGutters={gridGutters}
      $gridUnit={gridUnit}
      $order={order}
      $skip={skip}
      $span={span}
      {...overrideProps}
    >
      {children}
    </Cell>
  );
}
