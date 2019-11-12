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

const applicationMinWidth = 130;
const columns = [
  CustomColumn<{name: string, id: string, applicationTags: string}, {}>({
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
    renderCell: function Cell(props) {
      return <a href={`#user=${props.value}`}>{props.value}</a>;
    },
  }),
  CategoricalColumn({title: 'Source', minWidth: 90}),
  NumericalColumn({title: 'CPU vCores'}),
  NumericalColumn({title: 'Memory GB'}),
];

const rows = [
  ...graphqlArrayData,
  ...graphqlArrayData,
  ...graphqlArrayData,
  ...graphqlArrayData,
  ...graphqlArrayData,
].map(row => {
  return {
    id: row.id,
    data: [
      {
        id: row.id,
        name: row.name,
        applicationTags: row.applicationTags,
      },
      row.realUser,
      row.source,
      row.allocatedVCores,
      row.allocatedGB,
    ],
  };
});

export const component = () => {
  return (
    <div style={{height: '600px', width: '700px'}}>
      <Unstable_StatefulDataTable columns={columns} rows={rows} />
    </div>
  );
};
