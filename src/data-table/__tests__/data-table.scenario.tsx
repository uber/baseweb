/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { useStyletron } from '../../styles';

import {
  AnchorColumn,
  BooleanColumn,
  CategoricalColumn,
  CustomColumn,
  DatetimeColumn,
  NumericalColumn,
  StringColumn,
  COLUMNS,
  NUMERICAL_FORMATS,
  StatefulDataTable,
} from '..';

type RowDataT = [
  string,
  number,
  number,
  number,
  number,
  Date,
  {
    color: string;
  },
  string,
  boolean,
  string,
  {
    content: string;
    href: string;
  }
];

// https://gist.github.com/6174/6062387
function pseudoRandomString(rowIdx, columnIdx) {
  return (
    (0.88 * rowIdx).toString(36).replace('.', '').substring(2) +
    (0.99 * columnIdx).toString(36).replace('.', '')
  ).slice(0, 10);
}

function makeRowsFromColumns(columns, rowCount) {
  const rows = [];
  for (let i = 0; i < rowCount; i++) {
    rows.push({
      id: i,
      data: columns.map((column, j) => {
        switch (column.kind) {
          case COLUMNS.ANCHOR:
            return { content: 'hello', href: 'https://google.com' };
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

          case COLUMNS.DATETIME:
            return new Date('2011-04-11T10:20:30Z');
          case COLUMNS.NUMERICAL:
            // eslint-disable-next-line no-case-declarations
            let base = i % 2 ? i - 1 : i + 3;
            if (!(i % 4)) base *= -1;
            return (base * 99999) / 100;
          case COLUMNS.BOOLEAN:
            return i % 2 === 0;
          case COLUMNS.STRING:
            return pseudoRandomString(i, j);
          case COLUMNS.CUSTOM:
            switch (i % 4) {
              case 3:
                return { color: 'green' };
              case 2:
                return { color: 'blue' };
              case 1:
                return { color: 'purple' };
              case 0:
              default:
                return { color: 'red' };
            }

          default:
            return 'default' + pseudoRandomString(i, j);
        }
      }),
    });
  }
  return rows;
}

export const columns = [
  CategoricalColumn({
    title: 'categorical',
    mapDataToValue: (data: RowDataT) => data[0],
  }),

  NumericalColumn({
    title: 'numerical',
    minWidth: 90,
    mapDataToValue: (data: RowDataT) => data[1],
  }),

  NumericalColumn({
    title: 'neg std',
    highlight: (n) => n < 0,
    minWidth: 90,
    mapDataToValue: (data: RowDataT) => data[2],
  }),

  NumericalColumn({
    title: 'accounting',
    format: NUMERICAL_FORMATS.ACCOUNTING,
    minWidth: 120,
    mapDataToValue: (data: RowDataT) => data[3],
  }),

  NumericalColumn({
    title: 'percent',
    format: NUMERICAL_FORMATS.PERCENTAGE,
    minWidth: 120,
    mapDataToValue: (data: RowDataT) => data[4],
  }),

  DatetimeColumn({
    title: 'datetime',
    mapDataToValue: (data: RowDataT) => data[5],
  }),

  CustomColumn<
    {
      color: string;
    },
    {
      selection: Set<string>;
      exclude: boolean;
      description: string;
    }
  >({
    title: 'custom color',
    filterable: true,
    sortable: true,
    minWidth: 120,
    mapDataToValue: (data: RowDataT) => data[6],
    renderCell: function Cell(props) {
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
    renderFilter: function ColorFilter(props) {
      const [css] = useStyletron();
      const [selection, setSelection] = React.useState(new Set());
      const colors = React.useMemo(() => {
        return props.data.reduce((set, item) => set.add(item.color), new Set());
      }, [props.data]);

      return (
        <div>
          <ul>
            {Array.from(colors).map((color) => {
              return (
                <li key={color} className={css({ backgroundColor: color })}>
                  <input
                    type="checkbox"
                    onChange={() => {
                      if (selection.has(color)) {
                        selection.delete(color);
                      } else {
                        selection.add(color);
                      }
                      setSelection(selection);
                    }}
                  />

                  <span className={css({ paddingLeft: '8px' })}>{color}</span>
                </li>
              );
            })}
          </ul>
          <button
            onClick={() => {
              props.setFilter({
                selection,
                description: Array.from(selection).join(', '),
                exclude: false,
              });

              props.close();
            }}
          >
            apply
          </button>
        </div>
      );
    },
    buildFilter: function (params) {
      return function (data) {
        return params.selection.has(data.color);
      };
    },
    sortFn: function (a, b) {
      return a.color.localeCompare(b.color);
    },
  }),

  StringColumn({
    title: 'string',
    minWidth: 148,
    mapDataToValue: (data: RowDataT) => data[7],
  }),

  BooleanColumn({
    title: 'boolean',
    mapDataToValue: (data: RowDataT) => data[8],
  }),

  CategoricalColumn({
    title: 'second category',
    mapDataToValue: (data: RowDataT) => data[9],
  }),

  AnchorColumn({
    title: 'anchor',
    mapDataToValue: (data: RowDataT) => data[10],
  }),
];

export const rows = makeRowsFromColumns(columns, 2000);

export function Scenario() {
  return (
    <div style={{ height: '800px', width: '900px' }}>
      <StatefulDataTable columns={columns} rows={rows} />
    </div>
  );
}
