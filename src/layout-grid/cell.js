/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {StyledCell} from './styled-components.js';
import type {CellPropsT} from './types.js';

// When used with Grid, Cell does not actually return anything.
// All of the props are forwarded to a StyledCell inside of Grid.
export default function Cell({align, children, order, skip, span}: CellPropsT) {
  return (
    <StyledCell $align={align} $order={order} $skip={skip} $span={span}>
      {children}
    </StyledCell>
  );
}
