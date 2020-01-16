/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {
  CategoricalColumn,
  StringColumn,
  BooleanColumn,
  Unstable_StatefulDataTable,
} from '../index.js';

import AnimalData from './animal-data.js';

export const name = 'data-table-extracted-highlight';

type RowDataT = {
  isSelected: boolean,
  Name: string,
  Kingdom: string,
  Phylum: string,
  Class: string,
  Order: string,
  Family: string,
};

const columns = [
  StringColumn({
    title: 'Name',
    minWidth: 300,
    mapDataToValue: (data: RowDataT) => data.Name,
  }),
  BooleanColumn({
    title: 'Is Selected',
    mapDataToValue: (data: RowDataT) => data.isSelected,
  }),
  CategoricalColumn({
    title: 'Kingdom',
    mapDataToValue: (data: RowDataT) => data.Kingdom,
  }),
  CategoricalColumn({
    title: 'Phylum',
    minWidth: 90,
    mapDataToValue: (data: RowDataT) => data.Phylum,
  }),
  CategoricalColumn({
    title: 'Class',
    minWidth: 120,
    mapDataToValue: (data: RowDataT) => data.Class,
  }),
  CategoricalColumn({
    title: 'Order',
    mapDataToValue: (data: RowDataT) => data.Order,
  }),
  CategoricalColumn({
    title: 'Family',
    mapDataToValue: (data: RowDataT) => data.Family,
  }),
];

const initialRows = AnimalData.map(row => {
  return {
    id: row.Name,
    data: {...row, isSelected: false},
  };
});

export const component = () => {
  const [highlightIndex, setHighlightIndex] = React.useState(-1);
  const [highlightedRow, setHighlightedRow] = React.useState(null);
  const [rows, setRows] = React.useState(initialRows);

  React.useLayoutEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.keyCode === 74) {
        setHighlightIndex(prev => Math.min(prev + 1, rows.length));
      }
      if (event.keyCode === 75) {
        setHighlightIndex(prev => Math.max(prev - 1, 0));
      }
      if (event.keyCode === 79) {
        setRows(prevRows => {
          return prevRows.map(row => {
            if (highlightedRow && row.id === highlightedRow.id) {
              return {
                ...row,
                data: {
                  ...row.data,
                  isSelected: !row.data.isSelected,
                },
              };
            }
            return row;
          });
        });
      }
    }

    if (__BROWSER__) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      if (__BROWSER__) {
        document.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [highlightedRow, setRows]);

  return (
    <div style={{height: '600px', width: '700px'}}>
      <Unstable_StatefulDataTable
        rowHighlightIndex={highlightIndex}
        onRowHighlightChange={(rowIndex, row) => {
          setHighlightIndex(rowIndex);
          setHighlightedRow(row);
        }}
        columns={columns}
        rows={rows}
      />
    </div>
  );
};
