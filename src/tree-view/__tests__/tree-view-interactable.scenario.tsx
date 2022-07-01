/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import { StatefulTreeView, TreeLabelInteractable } from '../index.js';
import { Select } from '../../select/index.js';
import { Checkbox } from '../../checkbox/index.js';

const LabelSelect = (node) => {
  const [value, setValue] = React.useState();
  return (
    <TreeLabelInteractable>
      <Select
        options={[
          { id: 'AliceBlue', color: '#F0F8FF' },
          { id: 'AntiqueWhite', color: '#FAEBD7' },
          { id: 'Aqua', color: '#00FFFF' },
          { id: 'Aquamarine', color: '#7FFFD4' },
          { id: 'Azure', color: '#F0FFFF' },
          { id: 'Beige', color: '#F5F5DC' },
        ]}
        labelKey="id"
        valueKey="color"
        onChange={({ value }) => setValue(value)}
        value={value}
        searchable={false}
      />
    </TreeLabelInteractable>
  );
};

const LabelCheckbox = (node) => {
  const [value, setValue] = React.useState();
  return (
    <TreeLabelInteractable>
      <Checkbox checked={value} onChange={(e) => setValue(e.target.checked)}>
        Grandchild 2
      </Checkbox>
    </TreeLabelInteractable>
  );
};

const initialData = [
  {
    id: 1,
    label: 'Node 1',
    isExpanded: true,
    children: [
      {
        id: 2,
        label: 'Child 1',
        isExpanded: true,
        children: [
          {
            id: 3,
            label: LabelSelect,
          },
        ],
      },
    ],
  },

  {
    id: 4,
    label: 'Node 2',
    isExpanded: true,
    children: [
      {
        id: 5,
        label: 'Child 2',
        isExpanded: true,
        children: [
          {
            id: 6,
            label: LabelCheckbox,
          },
        ],
      },
    ],
  },
];

export function Scenario() {
  return <StatefulTreeView data={initialData} />;
}
