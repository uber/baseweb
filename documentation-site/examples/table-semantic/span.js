// @flow
import * as React from 'react';
import {
  StyledRoot,
  StyledTable,
  StyledTableHeadRow,
  StyledTableHeadCell,
  StyledTableBodyRow,
  StyledTableBodyCell,
} from 'baseui/table-semantic';

export default function Example() {
  return (
    <StyledRoot>
      <StyledTable>
        <StyledTableHeadRow>
          <StyledTableHeadCell colSpan="2">
            Parent
          </StyledTableHeadCell>
          <StyledTableHeadCell colSpan="2">
            Children
          </StyledTableHeadCell>
        </StyledTableHeadRow>
        <StyledTableBodyRow>
          <StyledTableBodyCell rowSpan="3">
            Sarah
          </StyledTableBodyCell>
          <StyledTableBodyCell rowSpan="3">
            Brown
          </StyledTableBodyCell>
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
          <StyledTableBodyCell rowSpan="2">
            Jane
          </StyledTableBodyCell>
          <StyledTableBodyCell rowSpan="2">
            Smith
          </StyledTableBodyCell>
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
