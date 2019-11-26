import React from 'react';
import {useStyletron} from 'baseui';
import {
  Unstable_StatefulDataTable,
  BooleanColumn,
  CategoricalColumn,
  CustomColumn,
  NumericalColumn,
  StringColumn,
  COLUMNS,
  NUMERICAL_FORMATS,
} from 'baseui/data-table';

// https://gist.github.com/6174/6062387
function pseudoRandomString(rowIdx: any, columnIdx: any) {
  return (
    (0.88 * rowIdx)
      .toString(36)
      .replace('.', '')
      .substring(2) +
    (0.99 * columnIdx).toString(36).replace('.', '')
  ).slice(0, 10);
}

function makeRowsFromColumns(columns: any, rowCount: number) {
  const rows = [];
  for (let i = 0; i < rowCount; i++) {
    rows.push({
      id: i,
      data: columns.map((column: any, j: number) => {
        switch (column.kind) {
          case COLUMNS.CATEGORICAL:
            switch (i % 5) {
              case 4:
                return 'A';
              case 3:
                return 'B';
              case 2:
                return 'C';
              case 1:
                return 'D';
              case 0:
              default:
                return 'F';
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

type RowDataT = [
  string,
  string,
  number,
  number,
  number,
  {color: string},
  boolean,
  string,
];

const columns = [
  CategoricalColumn({
    title: 'categorical',
    mapDataToValue: (data: RowDataT) => data[0],
  }),
  StringColumn({
    title: 'string',
    mapDataToValue: (data: RowDataT) => data[1],
  }),
  NumericalColumn({
    title: 'three',
    mapDataToValue: (data: RowDataT) => data[2],
  }),
  NumericalColumn({
    title: 'neg std',
    highlight: (n: number) => n < 0,
    mapDataToValue: (data: RowDataT) => data[3],
  }),
  NumericalColumn({
    title: 'accounting',
    format: NUMERICAL_FORMATS.ACCOUNTING,
    mapDataToValue: (data: RowDataT) => data[4],
  }),
  CustomColumn<{color: string}, {}>({
    title: 'custom color',
    mapDataToValue: (data: RowDataT) => data[5],
    renderCell: function Cell(props: any) {
      const [css] = useStyletron();
      return (
        <div
          className={css({
            alignItems: 'center',
            fontFamily: '"Comic Sans MS", cursive, sans-serif',
            display: 'flex',
          })}
        >
          <div
            className={css({
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
  BooleanColumn({
    title: 'boolean',
    mapDataToValue: (data: RowDataT) => data[6],
  }),
  CategoricalColumn({
    title: 'second category',
    mapDataToValue: (data: RowDataT) => data[7],
  }),
];

const rows = makeRowsFromColumns(columns, 2000);

export default () => {
  const [css] = useStyletron();
  return (
    <div className={css({height: '800px'})}>
      <Unstable_StatefulDataTable columns={columns} rows={rows} />
    </div>
  );
};
