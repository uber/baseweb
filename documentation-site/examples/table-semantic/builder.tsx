import * as React from "react";
import { StyledLink as Link } from "baseui/link";
import { TableBuilder, TableBuilderColumn } from "baseui/table-semantic";

type Row = { bar: string; foo: number; url: string };
const DATA: Row[] = [
  {
    foo: 10,
    bar: "banana",
    url: "https://example.com/b",
  },
  {
    foo: 1,
    bar: "carrot",
    url: "https://example.com/c",
  },
  {
    foo: 2,
    bar: "apple",
    url: "https://example.com/a",
  },
];

export default function Example() {
  return (
    <TableBuilder data={DATA}>
      <TableBuilderColumn header="Produce">
        {(row: Row) => <Link href={row.url}>{row.bar}</Link>}
      </TableBuilderColumn>
      <TableBuilderColumn header="Quantity" numeric>
        {(row: Row) => row.foo}
      </TableBuilderColumn>
    </TableBuilder>
  );
}
