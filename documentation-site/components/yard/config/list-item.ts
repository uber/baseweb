/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { ListItem, ListItemLabel, ARTWORK_SIZES, SHAPE } from 'baseui/list';
import { Check } from 'baseui/icon';
import { PropTypes } from 'react-view';
import type { TConfig } from '../types';

const ListItemConfig: TConfig = {
  componentName: 'ListItem',
  imports: {
    'baseui/list': {
      named: ['ListItem', 'ListItemLabel'],
    },
    'baseui/icon': {
      named: ['Check'],
    },
  },
  scope: {
    ListItem,
    ListItemLabel,
    ARTWORK_SIZES,
    SHAPE,
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
      value: 'ARTWORK_SIZES.MEDIUM',
      defaultValue: 'ARTWORK_SIZES.MEDIUM',
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
    shape: {
      value: 'SHAPE.DEFAULT',
      defaultValue: 'SHAPE.DEFAULT',
      options: SHAPE,
      enumName: 'SHAPE',
      type: PropTypes.Enum,
      description: 'Defines the shape of the item.',
      imports: {
        'baseui/list': {
          named: ['SHAPE'],
        },
      },
    },
    endEnhancer: {
      value: '() => <ListItemLabel>End Enhancer</ListItemLabel>',
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
};

export default ListItemConfig;
