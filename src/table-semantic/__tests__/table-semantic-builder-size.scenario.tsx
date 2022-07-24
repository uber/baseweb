/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';
import { useStyletron } from '../../styles';
import { TableBuilder, TableBuilderColumn, SIZE } from '..';

const data = [
  {
    foo: 10,
    bar: 'banana',
    url: 'https://example.com/b',
    selected: true,
  },

  {
    foo: 1,
    bar: 'carrot',
    url: 'https://example.com/c',
    selected: false,
  },

  {
    foo: 2,
    bar: 'apple',
    url: 'https://example.com/a',
    selected: false,
  },
];

function Instance({ size }) {
  return (
    <TableBuilder data={data} size={size}>
      <TableBuilderColumn<any> id="bar" header="Produce" sortable>
        {(row) => <a href={row.url}>{row.bar}</a>}
      </TableBuilderColumn>
      <TableBuilderColumn<any> id="foo" header="Quantity" numeric sortable>
        {(row) => row.foo}
      </TableBuilderColumn>
    </TableBuilder>
  );
}

export function Scenario() {
  const [css, theme] = useStyletron();
  const title = css({
    ...theme.typography.ParagraphMedium,
    color: theme.colors.contentPrimary,
  });

  return (
    <div className={css({ padding: '24px', width: '800px' })}>
      <p className={title}>compact</p>
      <Instance size={SIZE.compact} />

      <p className={title}>default</p>
      <Instance size={SIZE.default} />

      <p className={title}>spacious</p>
      <Instance size={SIZE.spacious} />
    </div>
  );
}
