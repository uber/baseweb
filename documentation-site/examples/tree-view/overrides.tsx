import * as React from 'react';
import {
  TreeView,
  TreeNodeData,
  toggleIsExpanded,
} from 'baseui/tree-view';
import {Plus as PlusIcon} from 'baseui/icon';
import {CheckIndeterminate as CheckIndeterminateIcon} from 'baseui/icon';
import {Search as SearchIcon} from 'baseui/icon';

const initialData: TreeNodeData[] = [
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
            isExpanded: true,
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
      onToggle={(node) =>
        setData((prevData) => toggleIsExpanded(prevData, node))
      }
      overrides={{
        IconContainer: {
          style: {
            borderLeftStyle: 'solid',
            borderRightStyle: 'solid',
            borderTopStyle: 'solid',
            borderBottomStyle: 'solid',
            borderLeftWidth: '1px',
            borderRightWidth: '1px',
            borderTopWidth: '1px',
            borderBottomWidth: '1px',
            width: '12px',
            height: '12px',
          },
        },
        CollapseIcon: {
          component: CheckIndeterminateIcon,
        },
        ExpandIcon: {
          component: PlusIcon,
        },
        LeafIconContainer: {
          style: {
            backgroundColor: '#000',
            color: '#fff',
            width: '20px',
          },
        },
        LeafIcon: {
          component: SearchIcon,
        },
      }}
    />
  );
}
