// @flow

import React from 'react';
import {useStyletron} from 'baseui';
import {
  Unstable_DataTable,
  BooleanColumn,
  CategoricalColumn,
  CustomColumn,
  NumericalColumn,
  StringColumn,
  COLUMNS,
  NUMERICAL_FORMATS,
} from 'baseui/data-table';

// https://gist.github.com/6174/6062387
function pseudoRandomString(rowIdx, columnIdx) {
  return (
    (0.88 * rowIdx)
      .toString(36)
      .replace('.', '')
      .substring(2) +
    (0.99 * columnIdx).toString(36).replace('.', '')
  ).slice(0, 10);
}

function makeRowsFromColumns(columns, rowCount) {
  const rows = [];
  for (let i = 0; i < rowCount; i++) {
    rows.push({
      data: columns.map((column, j) => {
        switch (column.kind) {
          case COLUMNS.CATEGORICAL:
            switch (i % 11) {
              case 11:
                return 'UberX';
              case 10:
                return 'UberXL';
              case 9:
                return 'Uber Select';
              case 8:
                return 'Uber Comfort';
              case 7:
                return 'Uber Pool';
              case 6:
                return 'Uber Black';
              case 5:
                return 'Uber Assist';
              case 4:
                return 'Uber WAV';
              case 3:
                return 'Transit';
              case 2:
                return 'Taxi';
              case 1:
                return 'Bike';
              case 0:
              default:
                return 'Scooter';
            }
          case COLUMNS.NUMERICAL:
            return i % 2 ? i - 1 : i + 3;
          case COLUMNS.BOOLEAN:
            return i % 2 === 0;
          case COLUMNS.STRING:
            return pseudoRandomString(i, j);
          case COLUMNS.CUSTOM:
            switch (i % 5) {
              case 4:
                return {color: 'red'};
              case 3:
                return {color: 'green'};
              case 2:
                return {color: 'blue'};
              case 1:
                return {color: 'purple'};
              case 0:
              default:
                return {color: 'yellow'};
            }
          default:
            return 'default' + pseudoRandomString(i, j);
        }
      }),
    });
  }
  return rows;
}

const columns = [
  CategoricalColumn({title: 'categorical'}),
  StringColumn({title: 'string'}),
  NumericalColumn({title: 'three'}),
  NumericalColumn({title: 'neg std', highlight: n => n < 0}),
  NumericalColumn({
    title: 'accounting',
    format: NUMERICAL_FORMATS.ACCOUNTING,
  }),
  CustomColumn<{color: string}, {}>({
    title: 'custom color',
    renderCell: function Cell(props) {
      const [useCss] = useStyletron();
      return (
        <div
          className={useCss({
            alignItems: 'center',
            fontFamily: '"Comic Sans MS", cursive, sans-serif',
            display: 'flex',
          })}
        >
          <div
            className={useCss({
              backgroundColor: props.value.color,
              height: '12px',
              marginRight: '24px',
              width: '12px',
            })}
          />
          <div>{props.value.color}</div>
        </div>
      );
    },
  }),
  BooleanColumn({title: 'boolean'}),
  CategoricalColumn({title: 'second category'}),
];

const rows = makeRowsFromColumns(columns, 2000);

export default () => {
  const [useCss] = useStyletron();
  return (
    <div className={useCss({height: '800px'})}>
      <Unstable_DataTable columns={columns} rows={rows} />
    </div>
  );
};
