// @flow
import * as React from 'react';
import {StatefulTreeView, TreeLabelInteractable} from 'baseui/tree-view';
import {Checkbox} from 'baseui/checkbox';

const getLabelCheckbox = label => node => {
  const [value, setValue] = React.useState();
  return (
    <TreeLabelInteractable>
      <Checkbox checked={value} onChange={e => setValue(e.target.checked)}>
        {label}
      </Checkbox>
    </TreeLabelInteractable>
  );
};

const initialData = [
  {
    id: 1,
    label: getLabelCheckbox('Node 1'),
    isExpanded: true,
    children: [
      {
        id: 2,
        label: getLabelCheckbox('Child 1.1'),
      },
      {
        id: 3,
        label: getLabelCheckbox('Child 1.2'),
      },
    ],
  },
  {
    id: 4,
    label: getLabelCheckbox('Node 2'),
    isExpanded: true,
    children: [
      {
        id: 5,
        label: getLabelCheckbox('Child 2.1'),
      },
      {
        id: 6,
        label: getLabelCheckbox('Child 2.2'),
        isExpanded: true,
        children: [
          {
            id: 7,
            label: getLabelCheckbox('Grandchild 2.1'),
          },
          {
            id: 8,
            label: getLabelCheckbox('Grandchild 2.2'),
          },
        ],
      },
    ],
  },
];

export default function Scenario() {
  return <StatefulTreeView data={initialData} />;
}
