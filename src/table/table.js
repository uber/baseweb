/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {getOverrides} from '../helpers/overrides.js';
import {
  Root as StyledRoot,
  Head as StyledHead,
  HeadCell as StyledHeadCell,
  Body as StyledBody,
  Row as StyledRow,
  Cell as StyledCell,
} from './styled-components.js';

import type {TablePropsT} from './types.js';

export default function Table(props: TablePropsT) {
  const {overrides = {}, columns, data: rows, ...restProps} = props;

  const [Root, RootProps] = getOverrides(overrides.Root, StyledRoot);
  const [Head, HeadProps] = getOverrides(overrides.Head, StyledHead);
  const [HeadCell, HeadCellProps] = getOverrides(
    overrides.HeadCell,
    StyledHeadCell,
  );
  const [Body, BodyProps] = getOverrides(overrides.Body, StyledBody);
  const [Row, RowProps] = getOverrides(overrides.Row, StyledRow);
  const [Cell, CellProps] = getOverrides(overrides.Cell, StyledCell);

  return (
    <Root {...restProps} {...RootProps}>
      <Head {...HeadProps}>
        {columns.map((column, index) => {
          return (
            <HeadCell key={index} {...HeadCellProps}>
              {column}
            </HeadCell>
          );
        })}
      </Head>
      <Body {...BodyProps}>
        {rows.map((row, i) => {
          return (
            <Row key={i} {...RowProps}>
              {row.map((cell, j) => {
                return (
                  <Cell key={j} {...CellProps}>
                    {cell}
                  </Cell>
                );
              })}
            </Row>
          );
        })}
      </Body>
    </Root>
  );
}

Table.defaultProps = {
  columns: [],
  data: [[]],
  estimatedRowSize: 40,
  isLoading: false,
  useDynamicRowHeight: false,
};
