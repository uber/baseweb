import {ListItem, ListItemLabel, ARTWORK_SIZES} from 'baseui/list';
import {Check} from 'baseui/icon';
import {PropTypes} from 'react-view';
import {TConfig} from '../types';

const listItemProps = require('!!extract-react-types-loader!../../../../src/list/list-item.js');
const listItemLabelProps = require('!!extract-react-types-loader!../../../../src/list/list-item-label.js');

const ListItemConfig: TConfig = {
  imports: {
    'baseui/list': {
      named: ['ListItem'],
    },
    'baseui/icon': {
      named: ['Check'],
    },
  },
  scope: {
    ListItem,
    ListItemLabel,
    ARTWORK_SIZES,
    Check,
  },
  theme: [],
  props: {
    children: {
      value: '<ListItemLabel>Label</ListItemLabel>',
      type: PropTypes.ReactNode,
      description: 'List item content.',
    },
    artwork: {
      value: 'props => <Check {...props} />',
      type: PropTypes.ReactNode,
      description: 'Left-hand icon to render in the list item.',
    },
    artworkSize: {
      value: undefined,
      options: ARTWORK_SIZES,
      enumName: 'ARTWORK_SIZES',
      type: PropTypes.Enum,
      description: 'Defines the size of the artwork.',
      imports: {
        'baseui/list': {
          named: ['ARTWORK_SIZES'],
        },
      },
    },
    endEnhancer: {
      value: '() => "Right-Label"',
      type: PropTypes.ReactNode,
      description: 'Right-hand content to render in the list item.',
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
        names: ['Root', 'ArtworkContainer', 'Content', 'EndEnhancerContainer'],
        sharedProps: {
          $artworkSize: 'artworkSize',
          $mLeft: {
            type: PropTypes.Boolean,
            description: 'True when an artwork is present.',
          },
          $sublist: 'sublist',
        },
      },
    },
  },
  mapTokensToProps: {
    ListItem: listItemProps,
    ListItemLabel: listItemLabelProps,
  },
};

export default ListItemConfig;
