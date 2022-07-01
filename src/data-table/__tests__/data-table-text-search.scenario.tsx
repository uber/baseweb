/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { Tag, KIND as TAG_KIND } from '../../tag/index';

import CategoricalColumn from '../column-categorical';
import CustomColumn from '../column-custom';
import StringColumn from '../column-string';
import { StatefulDataTable } from '../stateful-data-table';

import AnimalData from './animal-data';

type RowDataT = {
  Name: string;
  Kingdom: string;
  Phylum: string;
  Class: string;
  Order: string;
  Family: string;
};

const columns = [
  StringColumn({
    title: 'Name',
    minWidth: 300,
    mapDataToValue: (data: RowDataT) => data.Name,
  }),

  CategoricalColumn({
    title: 'Kingdom',
    mapDataToValue: (data: RowDataT) => data.Kingdom,
  }),

  CustomColumn({
    title: 'Phylum',
    minWidth: 90,
    mapDataToValue: (data: RowDataT) => data.Phylum,
    textQueryFilter: function (textQuery, data) {
      return data.toLowerCase().includes(textQuery.toLowerCase());
    },
    renderCell: function PhylumnCell(props) {
      return (
        <Tag
          closeable={false}
          overrides={{
            Root: {
              style: {
                marginTop: 0,
                marginRight: 0,
                marginBottom: 0,
                marginLeft: 0,
              },
            },
          }}
          kind={TAG_KIND.accent}
        >
          {props.value}
        </Tag>
      );
    },
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

const rows = AnimalData.map((row) => {
  return {
    id: row.Name,
    data: row,
  };
});

export function Scenario() {
  return (
    <div style={{ height: '600px', width: '700px' }}>
      <StatefulDataTable columns={columns} rows={rows} />
    </div>
  );
}
