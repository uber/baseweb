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

const columns = [
  CategoricalColumn({title: 'one'}),
  StringColumn({title: 'two'}),
  NumericalColumn({title: 'three'}),
  CustomColumn({
    title: 'four',
    renderCell: function Cell(props: any) {
      const [useCss] = useStyletron();
      return (
        <div
          className={useCss({
            alignItems: 'center',
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
  BooleanColumn({title: 'five'}),
  CategoricalColumn({title: 'six'}),
  StringColumn({title: 'seven'}),
  StringColumn({title: 'eight'}),
  StringColumn({title: 'nine'}),
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
