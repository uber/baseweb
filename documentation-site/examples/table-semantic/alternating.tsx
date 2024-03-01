import * as React from "react";
import { StyledLink as Link } from "baseui/link";
import { TableBuilder, TableBuilderColumn } from "baseui/table-semantic";

const DATA = [
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
  const overrides = {
    TableBodyRow: {
      style: ({ $theme, $rowIndex }: any) => ({
        backgroundColor:
          $rowIndex % 2
            ? $theme.colors.backgroundPrimary
            : $theme.colors.backgroundSecondary,
        ":hover": {
          backgroundColor: $theme.colors.backgroundTertiary,
        },
      }),
    },
  };

  return (
    <TableBuilder data={DATA} overrides={overrides}>
      <TableBuilderColumn header="Produce">
        {(row: any) => <Link href={row.url}>{row.bar}</Link>}
      </TableBuilderColumn>
      <TableBuilderColumn header="Quantity" numeric>
        {(row: any) => row.foo}
      </TableBuilderColumn>
    </TableBuilder>
  );
}
