// @flow
import * as React from 'react';
import {StyledLink as Link} from 'baseui/link';
import {
  Unstable_TableBuilder,
  Unstable_TableBuilderColumn,
} from 'baseui/table-semantic';

const DATA = [
  {
    foo: 10,
    bar: 'banana',
    url: 'https://example.com/b',
  },
  {
    foo: 1,
    bar: 'carrot',
    url: 'https://example.com/c',
  },
  {
    foo: 2,
    bar: 'apple',
    url: 'https://example.com/a',
  },
];

export default () => (
  <Unstable_TableBuilder data={DATA}>
    <Unstable_TableBuilderColumn header="Produce">
      {row => <Link href={row.url}>{row.bar}</Link>}
    </Unstable_TableBuilderColumn>
    <Unstable_TableBuilderColumn header="Quantity" numeric>
      {row => row.foo}
    </Unstable_TableBuilderColumn>
  </Unstable_TableBuilder>
);
