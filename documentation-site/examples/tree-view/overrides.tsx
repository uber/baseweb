import * as React from 'react';
import {
  Unstable_TreeView as TreeView,
  TreeNode,
  toggleIsExpanded,
} from 'baseui/tree-view';
import {ChevronRight} from 'baseui/icon';
import {ChevronDown} from 'baseui/icon';

const initialData: TreeNode[] = [
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
            children: [
              {
                id: 4,
                label:
                  'Should be rendered SSR / even when closed (check source!)',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 5,
    label: 'Node 2',
    isExpanded: true,
    children: [
      {
        id: 6,
        label: 'Child 2',
        isExpanded: true,
        children: [
          {
            id: 7,
            label: 'Grandchild 2',
            children: [
              {
                id: 8,
                label:
                  'Should be rendered SSR / even when closed (check source!)',
              },
            ],
          },
        ],
      },
    ],
  },
];

export default function TreeViewOverrides() {
  const [data, setData] = React.useState(initialData);

  return (
    <TreeView
      data={data}
      renderAll
      onToggle={node =>
        setData(prevData => toggleIsExpanded(prevData, node))
      }
      overrides={{
        IconContainer: {
          style: {
            borderStyle: 'none',
          },
        },
        CollapseIcon: {
          component: ChevronDown,
        },
        ExpandIcon: {
          component: ChevronRight,
        },
      }}
    />
  );
}
