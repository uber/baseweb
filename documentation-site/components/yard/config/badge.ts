/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { Badge, HIERARCHY, SHAPE, COLOR, PLACEMENT } from 'baseui/badge';
import { Skeleton } from 'baseui/skeleton';
import { PropTypes } from 'react-view';
import { TConfig } from '../types';

const badgeProps = require('!!extract-react-types-loader!../../../../src/badge/badge.js');

const BadgeConfig: TConfig = {
  componentName: 'Badge',
  imports: {
    'baseui/badge': {
      named: ['Badge'],
    },
    'baseui/block': {
      named: ['Skeleton'],
    },
  },
  scope: {
    Badge,
    HIERARCHY,
    SHAPE,
    COLOR,
    PLACEMENT,
    Skeleton,
  },
  theme: [],
  props: {
    children: {
      value: `<Skeleton width="180px" height="120px" />`,
      type: PropTypes.ReactNode,
      description: `The anchor the badge is positioned relative to.`,
    },
    content: {
      value: `Badge`,
      type: PropTypes.ReactNode,
      description: `Content to be displayed in the badge.`,
    },
    horizontalOffset: {
      value: undefined,
      type: PropTypes.String,
      description: 'Overrides the default horizontal position.',
    },
    verticalOffset: {
      value: undefined,
      type: PropTypes.String,
      description: 'Overrides the default vertical position.',
    },
    hidden: {
      value: false,
      type: PropTypes.Boolean,
      description: `Sets visibility to "hidden".`,
    },
    placement: {
      value: 'PLACEMENT.topRight',
      defaultValue: 'PLACEMENT.topRight',
      options: PLACEMENT,
      type: PropTypes.Enum,
      description: 'Determines the placement of the badge relative to the anchor',
      imports: {
        'baseui/badge': {
          named: ['PLACEMENT'],
        },
      },
    },
    hierarchy: {
      value: 'HIERARCHY.primary',
      defaultValue: 'HIERARCHY.primary',
      options: HIERARCHY,
      type: PropTypes.Enum,
      description:
        'Defines badge look by purpose. Set it to one of HIERARCHY[key] values. Defaults to HIERARCHY.primary.',
      imports: {
        'baseui/badge': {
          named: ['HIEARCHY'],
        },
      },
    },
    shape: {
      value: 'SHAPE.rectangle',
      defaultValue: 'SHAPE.rectangle',
      options: SHAPE,
      type: PropTypes.Enum,
      description:
        'Defines badge shape. Set it to one of SHAPE[key] values. Defaults to SHAPE.rectangle.',
      imports: {
        'baseui/badge': {
          named: ['SHAPE'],
        },
      },
    },
    color: {
      value: 'COLOR.accent',
      defaultValue: 'COLOR.accent',
      options: COLOR,
      type: PropTypes.Enum,
      description:
        'Defines badge color. Set it to one of COLOR[key] values. Defaults to COLOR.accent.',
      imports: {
        'baseui/badge': {
          named: ['COLOR'],
        },
      },
    },
    overrides: {
      value: undefined,
      type: PropTypes.Custom,
      description: 'Lets you customize all aspects of the component.',
      custom: {
        names: ['Root', 'Badge', 'Positioner'],
        sharedProps: {
          $hierarchy: 'hierarchy',
          $shape: 'shape',
          $color: 'color',
        },
      },
    },
  },
  mapTokensToProps: {
    Badge: badgeProps,
  },
};

export default BadgeConfig;
