// @flow
import * as React from 'react';
import {
  Unstable_StatefulTreeView as StatefulTreeView,
  TreeLabel,
  type TreeNodeT,
} from 'baseui/tree-view';
import {ChevronRight} from 'baseui/icon';
import {ChevronDown} from 'baseui/icon';

type CustomNodePropsT = {
  depth?: number,
};

const CustomLabel = (node: TreeNodeT) => {
  const {label} = node;
  const Tag = (depth => {
    switch (depth) {
      case 1:
        return 'h1';
      case 2:
        return 'h2';
      case 3:
      default:
        return 'h3';
    }
  })(node.depth);
  return (
    <Tag>{typeof label === 'function' ? label(node) : label}</Tag>
  );
};

const CustomTreeLabel = props => {
  return (
    <TreeLabel
      {...props}
      label={CustomLabel}
      overrides={{
        CollapseIcon: {
          component: ChevronDown,
          props: {
            size: (5 - props.node.depth) * 10,
          },
        },
        ExpandIcon: {
          component: ChevronRight,
          props: {
            size: (5 - props.node.depth) * 10,
          },
        },
      }}
    />
  );
};

const initialData = [
  {
    depth: 1,
    label: 'Node 1',
    isExpanded: true,
    children: [
      {
        depth: 2,
        label: 'Child 1',
        isExpanded: true,
        children: [
          {
            depth: 3,
            label: 'Grandchild 1',
            isExpanded: true,
            children: [
              {
                depth: 4,
                label: 'Greatgrandchild 1',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    depth: 1,
    label: 'Node 2',
    isExpanded: true,
    children: [
      {
        depth: 2,
        label: 'Child 2',
        isExpanded: true,
        children: [
          {
            depth: 3,
            label: 'Grandchild 2',
            isExpanded: true,
            children: [
              {
                depth: 4,
                label: 'Greatgrandchild 2',
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
      overrides={{
        IconContainer: {
          style: {
            borderStyle: 'none',
          },
        },
        TreeLabel: {
          component: CustomTreeLabel,
        },
      }}
    />
  );
}
