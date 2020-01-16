// @flow

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

export const columns = [
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
    highlight: n => n < 0,
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

export default () => {
  const [css] = useStyletron();
  return (
    <div className={css({height: '800px'})}>
      <Unstable_StatefulDataTable
        columns={columns}
        rows={[]}
        overrides={{
          EmptyState: {
            style: ({$theme}) => {
              return {
                outline: `${$theme.colors.warning600} dotted`,
                backgroundColor: $theme.colors.warning600,
              };
            },
          },
        }}
      />
    </div>
  );
};
