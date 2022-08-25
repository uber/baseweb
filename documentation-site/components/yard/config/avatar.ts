/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { Avatar } from 'baseui/avatar';
import { PropTypes } from 'react-view';
import { TConfig } from '../types';

const AvatarConfig: TConfig = {
  componentName: 'Avatar',
  imports: {
    'baseui/avatar': {
      named: ['Avatar'],
    },
  },
  scope: { Avatar },
  theme: [],
  props: {
    name: {
      value: 'Jane Doe',
      type: PropTypes.String,
      description: 'Alternative text description of the image.',
    },
    size: {
      value: 'scale1600',
      type: PropTypes.String,
      description:
        'Defines the width/height of the image. Accepts labels from theme.sizing, or passes value to height/width.',
    },
    src: {
      value: 'https://avatars.dicebear.com/api/human/yard.svg?width=285&mood=happy',
      type: PropTypes.String,
      description: 'Image to display.',
    },
    overrides: {
      value: undefined,
      type: PropTypes.Custom,
      description: 'Lets you customize all aspects of the component.',
      custom: {
        names: ['Root', 'Avatar', 'Initials'],
        sharedProps: {
          $size: 'size',
          $didImageFailToLoad: {
            type: PropTypes.Boolean,
            description: 'True when the src does not resolve to a valid image.',
          },
        },
      },
    },
  },
};

export default AvatarConfig;
