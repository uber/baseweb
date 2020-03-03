import {Unstable_TreeView, toggleIsExpanded} from 'baseui/tree-view';
import {PropTypes} from 'react-view';
import {TConfig} from '../types';

const treeViewProps = require('!!extract-react-types-loader!../../../../src/tree-view/tree-view.js');

const TreeViewConfig: TConfig = {
  componentName: 'Unstable_TreeView',
  imports: {
    'baseui/tree-view': {named: ['Unstable_TreeView', 'toggleIsExpanded']},
  },
  scope: {
    Unstable_TreeView,
    toggleIsExpanded,
  },
  theme: [],
  props: {
    data: {
      value: `[
  {
    id: 1,
    label: 'Projects',
    isExpanded: true,
    children: [
      {
        id: 2,
        label: 'project-1.docx',
      }
    ]
  },
  {
    id: 3,
    label: 'Reports',
    isExpanded: false,
    children: [
      {
        id: 4,
        label: 'report-1.docx',
      }
    ]
  },
]`,
      type: PropTypes.Array,
      description: 'Tree View data structure.',
      stateful: true,
      hidden: true,
    },
    onToggle: {
      value:
        'node => {\n  setData(prevData => toggleIsExpanded(prevData, node))\n}',
      type: PropTypes.Function,
      description: `Called every time an tree item is clicked.`,
    },
    renderAll: {
      value: false,
      type: PropTypes.Boolean,
      description:
        'Renders all tab content for SEO purposes regardless of tab active state.',
    },
    indentGuides: {
      value: false,
      type: PropTypes.Boolean,
      description: 'Displays indent guides',
    },
    getId: {
      value: undefined,
      type: PropTypes.Function,
      placeholder: 'node => node.id',
      description: `Let's you set a custom mapping node => id function.`,
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
  mapTokensToProps: {
    Unstable_TreeView: treeViewProps,
  },
};

export default TreeViewConfig;
