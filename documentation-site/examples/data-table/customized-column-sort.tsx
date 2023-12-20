import React from 'react';
import {useStyletron} from 'baseui';
import {
  StatefulDataTable,
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
    (0.88 * rowIdx).toString(36).replace('.', '').substring(2) +
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

type RowDataT = [string, {color: string}, string, number];

const columns = [
  CategoricalColumn({
    title: 'categorical',
    mapDataToValue: (data: RowDataT) => data[0],
  }),
  CustomColumn<
    {color: string},
    {selection: Set<string>; exclude: boolean; description: string}
  >({
    title: 'custom color (sortable)',
    filterable: true,
    sortable: true,
    minWidth: 120,
    mapDataToValue: (data: RowDataT) => data[1],
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
    renderFilter: function ColorFilter(props: any) {
      const [css] = useStyletron();
      const [selection, setSelection] = React.useState(new Set());
      const colors = React.useMemo(() => {
        return props.data.reduce(
          (set: any, item: any) => set.add(item.color),
          new Set(),
        );
      }, [props.data]);

      return (
        <div>
          <ul>
            {Array.from(colors).map((color: any) => {
              return (
                <li
                  key={color}
                  className={css({backgroundColor: color})}
                >
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
                  <span className={css({paddingLeft: '8px'})}>
                    {color}
                  </span>
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
    buildFilter: function (params: any) {
      return function (data: any) {
        return params.selection.has(data.color);
      };
    },
    sortFn: function (a: any, b: any) {
      return a.color.localeCompare(b.color);
    },
  }),
  StringColumn({
    title: 'string',
    mapDataToValue: (data: RowDataT) => data[2],
  }),
  NumericalColumn({
    title: 'accounting',
    format: NUMERICAL_FORMATS.ACCOUNTING,
    mapDataToValue: (data: RowDataT) => data[3],
  }),
];

const rows = makeRowsFromColumns(columns, 100);

export default function Example() {
  const [css] = useStyletron();
  return (
    <div className={css({height: '800px'})}>
      <StatefulDataTable columns={columns} rows={rows} />
    </div>
  );
}
