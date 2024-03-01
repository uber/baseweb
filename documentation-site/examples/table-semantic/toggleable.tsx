import React, { useState } from "react";
import { Checkbox } from "baseui/checkbox";
import { StyledLink as Link } from "baseui/link";
import { TableBuilder, TableBuilderColumn } from "baseui/table-semantic";

export default function Example() {
  type Row = {
    foo: number;
    bar: string;
    url: string;
    selected: boolean;
  };
  const [data, setData] = useState<Row[]>([
    {
      foo: 10,
      bar: "banana",
      url: "https://example.com/b",
      selected: true,
    },
    {
      foo: 1,
      bar: "carrot",
      url: "https://example.com/c",
      selected: false,
    },
    {
      foo: 2,
      bar: "apple",
      url: "https://example.com/a",
      selected: false,
    },
  ]);

  const hasAny = Boolean(data.length);
  const hasAll = hasAny && data.every((x) => x.selected);
  const hasSome = hasAny && data.some((x) => x.selected);

  function toggleAll() {
    setData((data) =>
      data.map((row) => ({
        ...row,
        selected: !hasAll,
      })),
    );
  }

  function toggle(event: any) {
    const { name, checked } = event.currentTarget;

    setData((data) =>
      data.map((row) => ({
        ...row,
        selected: String(row.foo) === name ? checked : row.selected,
      })),
    );
  }

  return (
    <TableBuilder data={data}>
      <TableBuilderColumn
        overrides={{
          TableHeadCell: { style: { width: "1%" } },
          TableBodyCell: { style: { width: "1%" } },
        }}
        header={
          <Checkbox
            checked={hasAll}
            isIndeterminate={!hasAll && hasSome}
            onChange={toggleAll}
          />
        }
      >
        {(row: Row) => (
          <Checkbox
            name={"" + row.foo}
            checked={row.selected}
            onChange={toggle}
          />
        )}
      </TableBuilderColumn>
      <TableBuilderColumn header="Produce">
        {(row: Row) => <Link href={row.url}>{row.bar}</Link>}
      </TableBuilderColumn>
      <TableBuilderColumn header="Quantity" numeric>
        {(row: Row) => row.foo}
      </TableBuilderColumn>
    </TableBuilder>
  );
}
