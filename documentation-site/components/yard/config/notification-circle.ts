/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { NotificationCircle, COLOR, PLACEMENT } from 'baseui/badge';
import { Skeleton } from 'baseui/skeleton';
import { Check } from 'baseui/icon';
import { PropTypes } from 'react-view';
import type { TConfig } from '../types';

const NotificationCircleConfig: TConfig = {
  componentName: 'NotificationCircle',
  imports: {
    'baseui/badge': {
      named: ['NotificationCircle'],
    },
    'baseui/block': {
      named: ['Skeleton'],
    },
  },
  scope: {
    NotificationCircle,
    COLOR,
    PLACEMENT,
    Skeleton,
    Check,
  },
  theme: [],
  props: {
    children: {
      value: `<Skeleton width="90px" height="60px" />`,
      type: PropTypes.ReactNode,
      description: `The anchor the badge is positioned relative to.`,
    },
    content: {
      value: `<Check />`,
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
      options: {
        [PLACEMENT.topLeft]: [PLACEMENT.topLeft],
        [PLACEMENT.topRight]: [PLACEMENT.topRight],
      },
      type: PropTypes.Enum,
      description: 'Determines the placement of the badge relative to the anchor',
      imports: {
        'baseui/badge': {
          named: ['PLACEMENT'],
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
};

export default NotificationCircleConfig;
