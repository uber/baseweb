/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';
import { useStyletron } from '../../styles';
import { TableBuilder, TableBuilderColumn, DIVIDER } from '..';

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

function Instance({ divider }) {
  return (
    <TableBuilder data={data} divider={divider}>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <TableBuilderColumn<any> id="bar" header="Produce" sortable>
        {(row) => <a href={row.url}>{row.bar}</a>}
      </TableBuilderColumn>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
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
      <p className={title}>horizontal / default</p>
      <Instance divider={DIVIDER.horizontal} />

      <p className={title}>vertical</p>
      <Instance divider={DIVIDER.vertical} />

      <p className={title}>grid</p>
      <Instance divider={DIVIDER.grid} />

      <p className={title}>clean</p>
      <Instance divider={DIVIDER.clean} />
    </div>
  );
}
