/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { StatefulTreeView, TreeLabelInteractable } from '..';
import { Select } from '../../select';
import { Checkbox } from '../../checkbox';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const LabelSelect = (node) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [value, setValue] = React.useState<any>();
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const LabelCheckbox = (node) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [value, setValue] = React.useState<any>();
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
