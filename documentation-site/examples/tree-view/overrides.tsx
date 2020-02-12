import * as React from 'react';
import {Unstable_StatefulTreeView as StatefulTreeView} from 'spaceweb/tree-view';
import {ChevronRight} from 'spaceweb/icon';
import {ChevronDown} from 'spaceweb/icon';

function CollapseIconOverride() {
  return <ChevronDown />;
}

function ExpandIconOverride() {
  return <ChevronRight />;
}

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

export default function TreeViewOverrides() {
  return (
    <StatefulTreeView
      data={initialData}
      renderAll={true}
      overrides={{
        IconContainer: {
          style: {
            borderStyle: 'none',
          },
        },
        CollapseIcon: {
          component: CollapseIconOverride,
        },
        ExpandIcon: {
          component: ExpandIconOverride,
        },
      }}
    />
  );
}
