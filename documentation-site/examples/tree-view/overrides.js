// @flow
import * as React from 'react';
import {
  Unstable_StatefulTreeView as StatefulTreeView,
  type TreeNodeT,
} from 'baseui/tree-view';
import {Plus as PlusIcon} from 'baseui/icon';
import {CheckIndeterminate as CheckIndeterminateIcon} from 'baseui/icon';

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
            children: [
              {
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
    label: 'Node 2',
    isExpanded: true,
    children: [
      {
        label: 'Child 2',
        isExpanded: true,
        children: [
          {
            label: 'Grandchild 2',
            children: [
              {
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
  return (
    <StatefulTreeView
      data={initialData}
      renderAll={true}
      overrides={{
        IconContainer: {
          style: {
            borderStyle: 'solid',
            borderWidth: '1px',
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
      }}
    />
  );
}
