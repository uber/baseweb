import * as React from 'react';
import {
  Unstable_TreeView as TreeView,
  TreeNode,
} from 'baseui/tree-view';

const initialData = [
  {
    id: 1,
    label: 'Projects',
    isExpanded: true,
    children: [
      {
        id: 2,
        label: 'project-1.docx',
      },
      {
        id: 3,
        label: 'project-2.docx',
      },
      {
        id: 4,
        label: 'Project 3',
        isExpanded: false,
        children: [
          {
            id: 5,
            label: 'project-3A.docx',
          },
          {
            id: 6,
            label: 'project-3B.docx',
          },
          {
            id: 7,
            label: 'project-3C.docx',
          },
        ],
      },
      {
        id: 8,
        label: 'project-4.docx',
      },
      {
        id: 9,
        label: 'Project 5',
        isExpanded: false,
        children: [
          {
            id: 10,
            label: 'project-5A.docx',
          },
          {
            id: 11,
            label: 'project-5B.docx',
          },
        ],
      },
    ],
  },
  {
    id: 12,
    label: 'Reports',
    isExpanded: false,
    children: [
      {
        id: 13,
        label: 'report-1',
        isExpanded: false,
        children: [
          {
            id: 14,
            label: 'report-1A.docx',
          },
          {
            id: 15,
            label: 'report-1B.docx',
          },
        ],
      },
      {
        id: 16,
        label: 'report-2',
        isExpanded: false,
        children: [
          {
            id: 17,
            label: 'report-2A.docx',
          },
          {
            id: 18,
            label: 'report-2B.docx',
          },
        ],
      },
      {
        id: 19,
        label: 'report-3',
        isExpanded: false,
        children: [
          {
            id: 20,
            label: 'report-3A.docx',
          },
          {
            id: 21,
            label: 'report-3B.docx',
          },
        ],
      },
    ],
  },
];

function updateData<T extends TreeNode>(
  arr: T[],
  id: number | string | undefined,
): T[] {
  return arr.map(node => {
    const newNode = {...node};
    if (newNode.id && newNode.id === id) {
      newNode.isExpanded = !newNode.isExpanded;
    }
    if (newNode.children && newNode.children.length) {
      newNode.children = updateData(newNode.children, id);
    }
    return newNode;
  });
}

export default function TreeViewControlled() {
  const [data, setData] = React.useState(initialData);

  const onToggle = (node: TreeNode) => {
    setData(prevData => {
      return updateData(prevData, node.id);
    });
  };

  return <TreeView data={data} onToggle={onToggle} />;
}
