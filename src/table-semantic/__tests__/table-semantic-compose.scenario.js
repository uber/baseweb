/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {
  StyledRoot,
  StyledTable,
  StyledTableHeadRow,
  StyledTableHeadCell,
  StyledTableBodyRow,
  StyledTableBodyCell,
} from '../index.js';

export const name = 'table-semantic-compose';

export function component() {
  return (
    <StyledRoot>
      <StyledTable>
        <StyledTableHeadRow>
          <StyledTableHeadCell colspan="2">Parent</StyledTableHeadCell>
          <StyledTableHeadCell colspan="2">Children</StyledTableHeadCell>
        </StyledTableHeadRow>
        <StyledTableBodyRow>
          <StyledTableBodyCell rowspan="3">Sarah</StyledTableBodyCell>
          <StyledTableBodyCell rowspan="3">Brown</StyledTableBodyCell>
          <StyledTableBodyCell>Sally</StyledTableBodyCell>
          <StyledTableBodyCell>Brown</StyledTableBodyCell>
        </StyledTableBodyRow>
        <StyledTableBodyRow>
          <StyledTableBodyCell>Jimmy</StyledTableBodyCell>
          <StyledTableBodyCell>Brown</StyledTableBodyCell>
        </StyledTableBodyRow>
        <StyledTableBodyRow>
          <StyledTableBodyCell>Joe</StyledTableBodyCell>
          <StyledTableBodyCell>Black</StyledTableBodyCell>
        </StyledTableBodyRow>
        <StyledTableBodyRow>
          <StyledTableBodyCell rowspan="2">Jane</StyledTableBodyCell>
          <StyledTableBodyCell rowspan="2">Smith</StyledTableBodyCell>
          <StyledTableBodyCell>Molly</StyledTableBodyCell>
          <StyledTableBodyCell>Smith</StyledTableBodyCell>
        </StyledTableBodyRow>
        <StyledTableBodyRow>
          <StyledTableBodyCell>Jesse</StyledTableBodyCell>
          <StyledTableBodyCell>Brown</StyledTableBodyCell>
        </StyledTableBodyRow>
      </StyledTable>
    </StyledRoot>
  );
}
