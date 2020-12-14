// @flow
import * as React from 'react';
import {
  TreeView,
  TreeLabel,
  type TreeNodeT,
  toggleIsExpanded,
} from 'baseui/tree-view';

type CustomNodePropsT = {
  depth?: number,
};

const CustomLabel = (node: TreeNodeT<>) => {
  const {label} = node;
  const Tag = (depth => {
    switch (depth) {
      case 1:
        return 'h1';
      case 2:
        return 'h2';
      case 3:
        return 'h3';
      default:
        return 'p';
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
          props: {
            size: (5 - props.node.depth) * 10,
          },
        },
        ExpandIcon: {
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
    id: 1,
    depth: 1,
    label: 'Node 1',
    isExpanded: true,
    children: [
      {
        id: 2,
        depth: 2,
        label: 'Child 1',
        isExpanded: true,
        children: [
          {
            id: 3,
            depth: 3,
            label: 'Grandchild 1',
            isExpanded: true,
            children: [
              {
                id: 4,
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
    id: 5,
    depth: 1,
    label: 'Node 2',
    isExpanded: true,
    children: [
      {
        id: 6,
        depth: 2,
        label: 'Child 2',
        isExpanded: true,
        children: [
          {
            id: 7,
            depth: 3,
            label: 'Grandchild 2',
            isExpanded: true,
            children: [
              {
                id: 8,
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
  const [data, setData] = React.useState(initialData);

  return (
    <TreeView
      data={data}
      onToggle={node =>
        setData(prevData => toggleIsExpanded(prevData, node))
      }
      overrides={{
        TreeLabel: {
          component: CustomTreeLabel,
        },
      }}
    />
  );
}
