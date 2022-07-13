import { ListItemLabel } from 'baseui/list';
import { PropTypes } from 'react-view';
import { TConfig } from '../types';

const listItemLabelProps = require('!!extract-react-types-loader!../../../../src/list/list-item-label');

const ListItemLabelConfig: TConfig = {
  componentName: 'ListItemLabel',
  imports: {
    'baseui/list': {
      named: ['ListItemLabel'],
    },
  },
  scope: {
    ListItemLabel,
  },
  theme: [],
  props: {
    children: {
      value: 'Label',
      type: PropTypes.ReactNode,
      description: 'List item label content.',
    },
    description: {
      value: 'description',
      type: PropTypes.ReactNode,
      description: 'List item label description.',
    },
    sublist: {
      value: false,
      type: PropTypes.Boolean,
      description: 'Renders the list item smaller to convey hierarchy.',
    },
    overrides: {
      value: undefined,
      type: PropTypes.Custom,
      description: 'Lets you customize all aspects of the component.',
      custom: {
        names: ['LabelContent', 'LabelDescription', 'LabelSublistContent'],
        sharedProps: {
          $labelContent: 'LabelContent',
          $labelDescription: 'LabelDescription',
          $labelSublistContent: 'LabelSublistContent',
        },
      },
    },
  },
  mapTokensToProps: {
    ListItemLabel: listItemLabelProps,
  },
};

export default ListItemLabelConfig;
