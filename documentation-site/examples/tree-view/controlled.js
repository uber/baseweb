// @flow
import * as React from 'react';
import {
  Unstable_TreeView as TreeView,
  type TreeNodeT,
} from 'baseui/tree-view';

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
            label: 'Grandchild 1',
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
            label: 'Grandchild 2',
          },
        ],
      },
    ],
  },
];

const updateData = (arr: TreeNodeT[], id) => {
  return arr.map(node => {
    const newNode = {...node};
    if (newNode.id === id) {
      newNode.isExpanded = !newNode.isExpanded;
    }
    if (newNode.children && newNode.children.length) {
      newNode.children = updateData(newNode.children, id);
    }
    return newNode;
  });
};

export default function TreeViewControlled() {
  const [data, setData] = React.useState(initialData);

  const onToggle = (node: TreeNodeT) => {
    setData(prevData => {
      return updateData(prevData, node.id);
    });
  };

  return <TreeView data={data} onToggle={onToggle} />;
}
