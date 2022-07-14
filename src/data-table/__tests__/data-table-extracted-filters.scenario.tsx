/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { useStyletron } from '../../styles';
import { LabelXSmall } from '../../typography';

import { DataTable, StatefulContainer, CategoricalColumn, StringColumn } from '..';

import AnimalData from './animal-data';

type RowData = [string, string, string, string, string, string];

const columns = [
  StringColumn({
    title: 'Name',
    minWidth: 300,
    mapDataToValue: (data: RowData) => data[0],
  }),

  CategoricalColumn({
    title: 'Kingdom',
    mapDataToValue: (data: RowData) => data[1],
  }),

  CategoricalColumn({
    title: 'Phylum',
    minWidth: 90,
    mapDataToValue: (data: RowData) => data[2],
  }),

  CategoricalColumn({
    title: 'Class',
    minWidth: 120,
    mapDataToValue: (data: RowData) => data[3],
  }),

  CategoricalColumn({
    title: 'Order',
    mapDataToValue: (data: RowData) => data[4],
  }),

  CategoricalColumn({
    title: 'Family',
    mapDataToValue: (data: RowData) => data[5],
  }),
];

const rows = AnimalData.map((row) => {
  return {
    id: row.Name,
    data: [row.Name, row.Kingdom, row.Phylum, row.Class, row.Order, row.Family],
  };
});

export function Scenario() {
  const [css] = useStyletron();
  return (
    <StatefulContainer columns={columns} rows={rows}>
      {({ filters, onFilterAdd, onFilterRemove, onSort, sortIndex, sortDirection }) => (
        <div
          className={css({
            display: 'flex',
            height: '600px',
            paddingRight: '24px',
          })}
        >
          <div className={css({ overflowY: 'auto' })}>
            {columns.map((column, index) => {
              if (!column.filterable) return null;
              const Filter = column.renderFilter;
              const activeFilter = filters.get(column.title);
              return (
                <div key={index} id={`${column.title}-filter`}>
                  {activeFilter && (
                    <div
                      className={css({
                        alignItems: 'center',
                        backgroundColor: 'lightskyblue',
                        display: 'flex',
                        height: '24px',
                        justifyContent: 'flex-end',
                        paddingRight: '16px',
                      })}
                    >
                      <LabelXSmall>
                        {column.title}:{activeFilter.description}
                      </LabelXSmall>
                      <button onClick={() => onFilterRemove(column.title)}>x</button>
                    </div>
                  )}

                  <Filter
                    close={() => {}}
                    data={rows.map((r) => r.data[index])}
                    setFilter={(params) => onFilterAdd(column.title, params)}
                  />

                  <div
                    className={css({
                      backgroundColor: 'lightgreen',
                      height: '1px',
                    })}
                  />
                </div>
              );
            })}
          </div>
          <div className={css({ width: '700px' })}>
            <DataTable
              columns={columns}
              rows={rows}
              filters={filters}
              onSort={onSort}
              sortIndex={sortIndex}
              sortDirection={sortDirection}
            />
          </div>
          <div className={css({ paddingLeft: '24px' })}>
            Applied filters:
            <ul>
              {Array.from(filters).map(([title, f]) => (
                <li key={title}>
                  {title}: {f.description}{' '}
                  <button onClick={() => onFilterRemove(title)}>remove</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </StatefulContainer>
  );
}
