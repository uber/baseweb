/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React, {useState, useMemo} from 'react';
import {Checkbox} from '../../checkbox';
import {Unstable_TableBuilder, Unstable_TableBuilderColumn} from '../index.js';

export const name = 'table-semantic-builder';

export function component() {
  const [sortColumn, setSortColumn] = useState('bar');
  const [sortAsc, setSortAsc] = useState(true);
  const [data, setData] = useState([
    {
      foo: 10,
      bar: 'banana',
      url: '#b',
      selected: true,
    },
    {
      foo: 1,
      bar: 'carrot',
      url: '#c',
      selected: false,
    },
    {
      foo: 2,
      bar: 'apple',
      url: '#a',
      selected: false,
    },
  ]);

  const hasAny = Boolean(data.length);
  const hasAll = hasAny && data.every(x => x.selected);
  const hasSome = hasAny && data.some(x => x.selected);

  const sortedData = useMemo(() => {
    return data.slice().sort((a, b) => {
      const left = sortAsc ? a : b;
      const right = sortAsc ? b : a;
      const leftValue = String(left[sortColumn]);
      const rightValue = String(right[sortColumn]);

      return leftValue.localeCompare(rightValue, 'en', {
        numeric: true,
        sensitivity: 'base',
      });
    });
  }, [sortColumn, sortAsc, data]);

  function toggleAll(event) {
    setData(data =>
      data.map(row => ({
        ...row,
        selected: !hasAll,
      })),
    );
  }

  function toggle(event) {
    const {name, checked} = event.currentTarget;

    setData(data =>
      data.map(row => ({
        ...row,
        selected: String(row.foo) === name ? checked : row.selected,
      })),
    );
  }

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
      sortOrder={sortAsc ? 'ASC' : 'DESC'}
      onSort={handleSort}
    >
      <Unstable_TableBuilderColumn
        overrides={{
          TableHeadCell: {style: {width: '1%'}},
          TableBodyCell: {style: {width: '1%'}},
        }}
        header={
          <Checkbox
            checked={hasAll}
            isIndeterminate={!hasAll && hasSome}
            onChange={toggleAll}
          />
        }
      >
        {row => (
          <Checkbox name={row.foo} checked={row.selected} onChange={toggle} />
        )}
      </Unstable_TableBuilderColumn>
      <Unstable_TableBuilderColumn id="bar" header="Produce" sortable>
        {row => <a href={row.url}>{row.bar}</a>}
      </Unstable_TableBuilderColumn>
      <Unstable_TableBuilderColumn id="foo" header="Quantity" numeric sortable>
        {row => row.foo}
      </Unstable_TableBuilderColumn>
    </Unstable_TableBuilder>
  );
}
