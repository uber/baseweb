/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { Banner, ACTION_POSITION, ARTWORK_TYPE, HIERARCHY, KIND } from 'baseui/banner';
import { PropTypes } from 'react-view';
import { TConfig } from '../types';

const bannerProps = require('!!extract-react-types-loader!../../../../src/banner/banner');

const BannerConfig: TConfig = {
  componentName: 'Banner',
  imports: {
    'baseui/banner': {
      named: ['Banner'],
    },
  },
  scope: {
    Banner,
    ACTION_POSITION,
    ARTWORK_TYPE,
    HIERARCHY,
    KIND,
  },
  theme: [
    'bannerActionLowInfo',
    'bannerActionLowNegative',
    'bannerActionLowPositive',
    'bannerActionLowWarning',
    'bannerActionHighInfo',
    'bannerActionHighNegative',
    'bannerActionHighPositive',
    'bannerActionHighWarning',
  ],
  props: {
    children: {
      value: "You'll earn 30 points for this shipment",
      type: PropTypes.ReactNode,
      description: 'Message displayed.',
    },
    title: {
      value: 'Congratulations',
      type: PropTypes.ReactNode,
      description: 'Message displayed.',
    },
    action: {
      value: undefined,
      type: PropTypes.Object,
      description:
        'Provides a method to accept, dismiss, or otherwise interact with the message shown.',
    },
    artwork: {
      value: undefined,
      type: PropTypes.Object,
      description: 'Visually convey the message text.',
    },
    hierarchy: {
      value: 'HIERARCHY.low',
      defaultValue: 'HIERARCHY.low',
      options: HIERARCHY,
      type: PropTypes.Enum,
      description: 'Determines message priority by rendering in pale or saturated colors.',
      imports: {
        'baseui/banner': {
          named: ['HIERARCHY'],
        },
      },
    },
    kind: {
      value: 'KIND.info',
      defaultValue: 'KIND.info',
      options: KIND,
      type: PropTypes.Enum,
      description: 'Determines color scheme and conveys message intent.',
      imports: {
        'baseui/banner': {
          named: ['KIND'],
        },
      },
    },
    nested: {
      value: false,
      type: PropTypes.Boolean,
      description: 'Used to make the banner visually distinct from its container element.',
    },
    overrides: {
      value: undefined,
      type: PropTypes.Custom,
      description: 'Lets you customize all aspects of the component.',
      custom: {
        names: [
          'BelowContent',
          'LeadingContent',
          'Message',
          'MessageContent',
          'Root',
          'Title',
          'TrailingContent',
          'TrailingButtonContainer',
          'TrailingIconButton',
        ],
      },
    },
  },
  mapTokensToProps: {
    Banner: bannerProps,
  },
};

export default BannerConfig;
