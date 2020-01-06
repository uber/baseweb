/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import StringColumn from '../column-string.js';
import {Unstable_StatefulDataTable} from '../stateful-data-table.js';

import AnimalData from './animal-data.js';

export const name = 'data-table-row-height';

type RowDataT = {
  Name: string,
  loremIpsum: string,
};

const loremIpsum = `"We went upstairs together, the colonel first with the lamp, the fat manager and I behind him. It was a labyrinth of an old house, with corridors, passages, narrow winding staircases, and little low doors, the thresholds of which were hollowed out by the generations who had crossed them. There were no carpets and no signs of any furniture above the ground floor, while the plaster was peeling off the walls, and the damp was breaking through in green, unhealthy blotches. I tried to put on as unconcerned an air as possible, but I had not forgotten the warnings of the lady, even though I disregarded them, and I kept a keen eye upon my two companions. Ferguson appeared to be a morose and silent man, but I could see from the little that he said that he was at least a fellow-countryman.`;

const columns = [
  StringColumn({
    title: 'Name',
    minWidth: 300,
    mapDataToValue: (data: RowDataT) => data.Name,
  }),
  StringColumn({
    title: 'Long Text',
    maxWidth: 300,
    lineClamp: 3,
    mapDataToValue: (data: RowDataT) => data.loremIpsum,
  }),
];

const rows = AnimalData.map((row, index) => {
  return {
    id: row.Name,
    data: {Name: row.Name, loremIpsum},
  };
});

const actions = [
  {
    label: 'No Effect',
    onClick: () => {},
  },
];

export const component = () => {
  return (
    <div style={{height: '600px', width: '700px'}}>
      <Unstable_StatefulDataTable
        batchActions={actions}
        columns={columns}
        rows={rows}
        rowHeight={78}
      />
    </div>
  );
};
