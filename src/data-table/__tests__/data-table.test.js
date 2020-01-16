/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {mount} from 'enzyme';

import {Unstable_DataTable} from '../data-table.js';
import {EmptyState} from '../styled-components.js';

import {useStyletron} from '../../styles/index.js';
import {NUMERICAL_FORMATS, COLUMNS} from '../constants.js';

import CategoricalColumn from '../column-categorical.js';
import StringColumn from '../column-string.js';
import NumericalColumn from '../column-numerical.js';
import CustomColumn from '../column-custom.js';
import BooleanColumn from '../column-boolean.js';

// COPIED FROM documentation-site/examples/data-table/basic.js FOR NOW
function pseudoRandomString(rowIdx, columnIdx) {
  return (
    (0.88 * rowIdx)
      .toString(36)
      .replace('.', '')
      .substring(2) + (0.99 * columnIdx).toString(36).replace('.', '')
  ).slice(0, 10);
}

function makeRowsFromColumns(columns, rowCount) {
  const rows = [];
  for (let i = 0; i < rowCount; i++) {
    rows.push({
      id: i,
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

export const mockColumns = [
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
// COPIED FROM documentation-site/examples/data-table/basic.js FOR NOW

const mockRows = makeRowsFromColumns(mockColumns, 10);

function getSharedProps() {
  return {
    columns: mockColumns,
    rows: mockRows,
  };
}

describe('DataTable Stateless Component', () => {
  test('basic renders', () => {
    const component = mount(<Unstable_DataTable {...getSharedProps()} />);

    expect(component.find(EmptyState)).toExist();
  });

  test('renders with components overrides', () => {
    const props = {
      ...getSharedProps(),
      overrides: {
        EmptyState: {
          props: {
            custom: 'prop',
          },
        },
      },
    };
    const component = mount(<Unstable_DataTable {...props} />);
    expect(component.find(EmptyState)).toExist();
    expect(
      component
        .find(EmptyState)
        .first()
        .prop('custom'),
    ).toEqual('prop');
  });
});
