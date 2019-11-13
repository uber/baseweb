/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import CategoricalColumn from '../column-categorical.js';
import CustomColumn from '../column-custom.js';
import ellipsis from 'polished/lib/mixins/ellipsis.js';
import NumericalColumn from '../column-numerical.js';
import {useStyletron} from '../../styles/index.js';
import {Unstable_StatefulDataTable} from '../stateful-data-table.js';

import graphqlArrayData from './graphql-array-data.js';

export const name = 'data-table-collection-of-objects';

type RowDataT = {
  id: string,
  name: string,
  applicationTags: string,
  realUser: string,
  source: string,
  allocatedVCores: number,
  allocatedGB: number,
};

const applicationMinWidth = 130;
const columns = [
  CustomColumn<{name: string, id: string, applicationTags: string}, {}>({
    mapDataToValue: (data: RowDataT) => ({
      id: data.id,
      name: data.name,
      applicationTags: data.applicationTags,
    }),
    title: 'Application',
    sortable: true,
    minWidth: applicationMinWidth,
    renderCell: function Cell(props) {
      const [css] = useStyletron();
      return (
        <a
          href={`#id=${props.value.id}`}
          title={props.value.applicationTags}
          className={css({
            ...ellipsis(`${applicationMinWidth}px`),
          })}
        >
          {props.value.name}
        </a>
      );
    },
    sortFn: function(a, b) {
      return a.name.localeCompare(b.name);
    },
  }),
  CustomColumn<string, {}>({
    title: 'User',
    sortable: true,
    minWidth: 80,
    mapDataToValue: (data: RowDataT) => data.realUser,
    renderCell: function Cell(props) {
      return <a href={`#user=${props.value}`}>{props.value}</a>;
    },
  }),
  CategoricalColumn({
    title: 'Source',
    minWidth: 90,
    mapDataToValue: (data: RowDataT) => data.source,
  }),
  NumericalColumn({
    title: 'CPU vCores',
    mapDataToValue: (data: RowDataT) => data.allocatedVCores,
  }),
  NumericalColumn({
    title: 'Memory GB',
    mapDataToValue: (data: RowDataT) => data.allocatedGB,
  }),
];

const rows = [
  ...graphqlArrayData,
  ...graphqlArrayData,
  ...graphqlArrayData,
  ...graphqlArrayData,
  ...graphqlArrayData,
].map(row => ({
  id: row.id,
  data: row,
}));

export const component = () => {
  return (
    <div style={{height: '600px', width: '700px'}}>
      <Unstable_StatefulDataTable columns={columns} rows={rows} />
    </div>
  );
};
