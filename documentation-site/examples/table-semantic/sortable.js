// @flow
import React, {useState, useMemo} from 'react';
import {StyledLink as Link} from 'baseui/link';
import {
  Unstable_TableBuilder,
  Unstable_TableBuilderColumn,
} from 'baseui/table-semantic';

export default () => {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortAsc, setSortAsc] = useState(true);

  const [data] = useState([
    {
      foo: 10,
      bar: 'banana',
      url: 'https://example.com/c',
    },
    {
      foo: 1,
      bar: 'carrot',
      url: 'https://example.com/b',
    },
    {
      foo: 2,
      bar: 'apple',
      url: 'https://example.com/a',
    },
  ]);

  const sortedData = useMemo(() => {
    if (!sortColumn) {
      return data;
    }

    return data.sort((a, b) => {
      const left = sortAsc ? a[sortColumn] : b[sortColumn];
      const right = sortAsc ? b[sortColumn] : a[sortColumn];

      return String(left).localeCompare(String(right), 'en', {
        numeric: true,
        sensitivity: 'base',
      });
    });
  }, [sortColumn, sortAsc, data]);

  function handleSort(id) {
    if (id === sortColumn) {
      setSortAsc(asc => !asc);
    } else {
      setSortColumn(id);
      setSortAsc(true);
    }
  }

  return (
    <Unstable_TableBuilder
      data={sortedData}
      sortColumn={sortColumn}
      sortOrder={sortAsc ? 'asc' : 'desc'}
      onSort={handleSort}
    >
      <Unstable_TableBuilderColumn
        id="bar"
        header="Produce"
        sortable
      >
        {row => <Link href={row.url}>{row.bar}</Link>}
      </Unstable_TableBuilderColumn>
      <Unstable_TableBuilderColumn
        id="foo"
        header="Quantity"
        numeric
        sortable
      >
        {row => row.foo}
      </Unstable_TableBuilderColumn>
    </Unstable_TableBuilder>
  );
};
