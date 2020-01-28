// @flow

import React from 'react';
import {useStyletron} from 'baseui';
import Alert from 'baseui/icon/alert.js';
import Check from 'baseui/icon/check.js';

import {
  Unstable_StatefulDataTable,
  BooleanColumn,
  CategoricalColumn,
  NumericalColumn,
  StringColumn,
  NUMERICAL_FORMATS,
} from 'baseui/data-table';

type RowDataT = [
  string,
  boolean,
  string,
  number,
  number,
  number,
  number,
];

const columns = [
  StringColumn({
    title: 'Movie',
    mapDataToValue: (data: RowDataT) => data[0],
  }),
  BooleanColumn({
    title: 'is it good?',
    mapDataToValue: (data: RowDataT) => data[1],
  }),
  CategoricalColumn({
    title: 'Genre',
    mapDataToValue: (data: RowDataT) => data[2],
  }),
  NumericalColumn({
    title: 'Production Budget (millions)',
    format: NUMERICAL_FORMATS.ACCOUNTING,
    mapDataToValue: (data: RowDataT) => data[3],
  }),
  NumericalColumn({
    title: 'Box Office (millions)',
    format: NUMERICAL_FORMATS.ACCOUNTING,
    mapDataToValue: (data: RowDataT) => data[4],
  }),
  NumericalColumn({
    title: 'ROI',
    precision: 2,
    mapDataToValue: (data: RowDataT) => data[5],
  }),
  NumericalColumn({
    title: 'Rating IMDB',
    precision: 2,
    mapDataToValue: (data: RowDataT) => data[6],
  }),
];

const initialRows = [
  ['Avatar', false, 'Action', 237, 2784, 11.7, 8.0],
  ['The Blind Side', false, 'Drama', 29, 309, 10.7, 7.6],
  ['The Dark Knight', false, 'Action', 185, 1005, 5.4, 9.0],
  ['ET: The Extra-Terrestrial', false, 'Drama', 11, 793, 75.5, 7.9],
  ['Finding Nemo', false, 'Adventure', 94, 940, 10.0, 8.1],
  ['Ghostbusters', false, 'Comedy', 144, 229, 1.6, 7.8],
  [
    'The Hunger Games',
    false,
    'Thriller/Suspense',
    78,
    649,
    8.3,
    7.2,
  ],
  ['Iron Man 3', false, 'Action', 178, 1215, 6.8, 7.6],
  ['Jurassic Park', false, 'Action', 53, 1030, 19.4, 8.0],
  ['King Kong', false, 'Adventure', 207, 551, 2.7, 7.3],
  ['The Lion King', false, 'Adventure', 115, 577, 5.0, 8.0],
  ['Monsters, Inc.', false, 'Adventure', 115, 577, 5.0, 8.0],
  [
    'The Twilight Saga: New Moon',
    false,
    'Drama',
    50,
    710,
    14.2,
    4.5,
  ],
  [
    'Oz the Great and Powerful',
    false,
    'Adventure',
    160,
    493,
    3.1,
    6.6,
  ],
  [
    `Pirates of the Caribbean: Dead Man's Chest`,
    false,
    'Adventure',
    225,
    1066,
    4.7,
    7.3,
  ],
  ['Quantum of Solace', false, 'Action', 200, 586, 2.9, 6.7],
  [
    'Raiders of the Lost Ark',
    false,
    'Adventure',
    18,
    390,
    21.7,
    8.7,
  ],
  [
    'Star Wars Ep. I: The Phantom Menace',
    false,
    'Adventure',
    115,
    1027,
    8.9,
    6.5,
  ],
  ['Titanic', false, 'Thriller/Suspense', 200, 2187, 10.9, 7.6],
  ['Up', false, 'Adventure', 175, 735, 4.2, 8.3],
  ['The Vow', false, 'Drama', 30, 196, 6.5, 6.7],
  ['The War of the Worlds', false, 'Action', 132, 704, 5.3, 6.5],
  ['X-Men: The Last Stand', false, 'Action', 210, 459, 2.2, 6.8],
  [`You've Got Mail`, false, 'Drama', 65, 251, 3.9, 6.3],
  ['Zookeeper', false, 'Romantic Comedy', 80, 170, 2.1, 5.0],
].map(r => ({id: r[0], data: r}));

export default () => {
  const [rows, setRows] = React.useState(initialRows);

  function flagRows(ids) {
    const nextRows = rows.map(row => {
      if (ids.includes(row.id)) {
        const nextData = [...row.data];
        nextData[1] = !nextData[1];
        return {...row, data: nextData};
      }

      return row;
    });
    setRows(nextRows);
  }
  function flagRow(id) {
    flagRows([id]);
  }

  function removeRows(ids) {
    const nextRows = rows.filter(row => !ids.includes(row.id));
    setRows(nextRows);
  }
  function removeRow(id) {
    removeRows([id]);
  }

  const batchActions = [
    {
      label: 'Check',
      onClick: ({selection, clearSelection}) => {
        flagRows(selection.map(r => r.id));
        clearSelection();
      },
      renderIcon: Check,
    },
    {
      label: 'Remove',
      onClick: ({selection, clearSelection}) => {
        removeRows(selection.map(r => r.id));
        clearSelection();
      },
      renderIcon: Alert,
    },
    {
      label: 'Download',
      onClick: ({clearSelection}) => clearSelection(),
    },
  ];

  const rowActions = [
    {
      label: 'Check',
      onClick: ({row}) => flagRow(row.id),
      renderIcon: Check,
    },
    {
      label: 'Remove',
      onClick: ({row}) => removeRow(row.id),
      renderIcon: Alert,
    },
  ];

  return (
    <div style={{height: '300px'}}>
      <Unstable_StatefulDataTable
        batchActions={batchActions}
        rowActions={rowActions}
        columns={columns}
        rows={rows}
      />
    </div>
  );
};
