// @flow
import * as React from 'react';
import {
  Unstable_TreeView as TreeView,
  type TreeNodeT,
} from 'baseui/tree-view';

const initialData = [
  {
    label: 'Node 1',
    isExpanded: true,
    children: [
      {
        label: 'Child 1',
        isExpanded: true,
        children: [
          {
            label: 'Grandchild 1',
          },
        ],
      },
    ],
  },
  {
    label: 'Node 2',
    isExpanded: true,
    children: [
      {
        label: 'Child 2',
        isExpanded: true,
        children: [
          {
            label: 'Grandchild 2',
          },
        ],
      },
    ],
  },
];

export default function TreeViewControlled() {
  const [data, setData] = React.useState(initialData);

  const onToggle = (node: TreeNodeT) => {
    setData(prevData => {
      node.isExpanded = !node.isExpanded;
      const newData = [...prevData];
      return newData;
    });
  };

  return <TreeView data={data} onToggle={onToggle} />;
}
