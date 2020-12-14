import * as React from 'react';
import {
  TreeView,
  toggleIsExpanded,
  TreeNode,
} from 'baseui/tree-view';

const initialData: TreeNode[] = [
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

export default function TreeViewBasic() {
  const [data, setData] = React.useState(initialData);

  return (
    <TreeView
      data={data}
      onToggle={node =>
        setData(prevData => toggleIsExpanded(prevData, node))
      }
    />
  );
}
