/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { TreeView, toggleIsExpanded } from 'baseui/tree-view';
import { PropTypes } from 'react-view';
import { TConfig } from '../types';

const TreeViewConfig: TConfig = {
  componentName: 'TreeView',
  imports: {
    'baseui/tree-view': { named: ['TreeView', 'toggleIsExpanded'] },
  },
  scope: {
    TreeView,
    toggleIsExpanded,
  },
  theme: [],
  props: {
    data: {
      value: `[
  {
    id: 1,
    label: 'The Two Gentlemen of Verona',
    isExpanded: true,
    children: [
      {
        id: 11,
        label: 'Duke of Milan',
      },
      {
        id: 12,
        label: 'Two Gentleman',
        isExpanded: true,
        children: [
          {
            id: 121,
            label: 'Valentine',
          },
          {
            id: 122,
            label: 'Proteus',
          }
        ]
      },
      {
        id: 13,
        label: 'Silvia',
      },
      {
        id: 14,
        label: 'Julia',
      },
    ]
  },
  {
    id: 2,
    label: 'The Tempest',
    isExpanded: false,
    children: [
      {
        id: 21,
        label: 'Alonso',
      },
      {
        id: 22,
        label: 'Sebastian',
      },
      {
        id: 23,
        label: 'Prospero',
      },
      {
        id: 24,
        label: 'Antonio',
      },
    ]
  },
]`,
      type: PropTypes.Array,
      description: 'Tree View data structure.',
      stateful: true,
      hidden: true,
    },
    getId: {
      value: undefined,
      type: PropTypes.Function,
      placeholder: 'node => node.id',
      description: `Let's you set a custom mapping node => id function.`,
    },
    indentGuides: {
      value: false,
      type: PropTypes.Boolean,
      description: 'Displays indent guides',
    },
    onToggle: {
      value: 'node => {\n  setData(prevData => toggleIsExpanded(prevData, node))\n}',
      type: PropTypes.Function,
      description: `Called every time an tree item is clicked.`,
    },
    renderAll: {
      value: false,
      type: PropTypes.Boolean,
      description: 'Renders all tab content for SEO purposes regardless of tab active state.',
    },
    overrides: {
      value: undefined,
      type: PropTypes.Custom,
      description: 'Lets you customize all aspects of the component.',
      custom: {
        names: [
          'Root',
          'TreeItemList',
          'TreeItem',
          'TreeLabel',
          'TreeItemContent',
          'IconContainer',
          'ExpandIcon',
          'CollapseIcon',
        ],
        sharedProps: {
          $hasChildren: {
            type: PropTypes.Boolean,
            description: 'True when the node has children.',
          },
          $isExpanded: {
            type: PropTypes.Boolean,
            description: 'True when the node is expanded.',
          },
          $isSelected: {
            type: PropTypes.Boolean,
            description: 'True when the node is selected.',
          },
          $isFocusVisible: {
            type: PropTypes.Boolean,
            description: `True when the node's should be visible.`,
          },
        },
      },
    },
  },
};

export default TreeViewConfig;
