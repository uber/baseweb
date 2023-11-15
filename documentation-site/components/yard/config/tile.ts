/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { Tile, StyledParagraph, TILE_KIND, ALIGNMENT } from 'baseui/tile';
import Search from 'baseui/icon/search';
import ChevronRight from 'baseui/icon/chevron-right';

import type { TConfig } from '../types';
import { PropTypes } from 'react-view';

const TileConfig: TConfig = {
  componentName: 'Tile',
  imports: {
    'baseui/tile': {
      named: ['Tile'],
    },
  },
  scope: {
    Tile,
    StyledParagraph,
    TILE_KIND,
    Search,
    ALIGNMENT,
    ChevronRight,
  },
  theme: [],
  props: {
    tileKind: {
      value: TILE_KIND.action,
      defaultValue: TILE_KIND.action,
      type: PropTypes.Enum,
      description: 'Determines whether the tile is used for an action or a selection',
      options: TILE_KIND,
      enumName: 'TILE_KIND',
      imports: {
        'baseui/tile': {
          named: ['TILE_KIND'],
        },
      },
    },
    label: {
      value: 'Label',
      type: PropTypes.String,
      description: 'Determines the label to be displayed in the tile',
    },
    leadingContent: {
      type: PropTypes.ReactNode,
      value: '() => <Search size={36} />',
      description: 'Determines the leading content to render in the tile',
      imports: {
        'baseui/icon/search': { named: ['Search'] },
      },
    },
    trailingContent: {
      type: PropTypes.ReactNode,
      value: '() => <ChevronRight size={36} />',
      description: 'Determines the trailing content to render in the tile',
      imports: {
        'baseui/icon/chevron-right': { named: ['ChevronRight'] },
      },
    },
    selected: {
      type: PropTypes.Boolean,
      value: false,
      description: 'Renders the tile in a selected state when a tileKind of selection is chosen',
    },
    headerAlignment: {
      type: PropTypes.Enum,
      description:
        'Determines whether the top content for the tile is left, center, or right aligned',
      value: undefined,
      options: ALIGNMENT,
      enumName: 'ALIGNMENT',
      imports: {
        'baseui/tile': { named: ['ALIGNMENT'] },
      },
    },
    bodyAlignment: {
      type: PropTypes.Enum,
      description:
        'Determines whether the bottom content for the tile is left, center, or right aligned',
      value: undefined,
      options: ALIGNMENT,
      enumName: 'ALIGNMENT',
      imports: {
        'baseui/tile': { named: ['ALIGNMENT'] },
      },
    },
    onClick: {
      value: '() => alert("click")',
      type: PropTypes.Function,
      description: `Function called when the tile is clicked.`,
    },
    children: {
      value: `<StyledParagraph>Paragraph</StyledParagraph>`,
      type: PropTypes.ReactNode,
      description: 'Determines the content rendered underneath the label',
      imports: {
        'baseui/tile': { named: ['StyledParagraph'] },
      },
    },
    overrides: {
      value: undefined,
      type: PropTypes.Custom,
      description: 'Lets you customize all aspects of the component',
      custom: {
        names: [
          'Root',
          'HeaderContainer',
          'BodyContainer',
          'BodyContainerContent',
          'LeadingContent',
          'TrailingContent',
          'Label',
        ],
        sharedProps: {},
      },
    },
  },
};

export default TileConfig;
