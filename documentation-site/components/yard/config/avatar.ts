import {Avatar} from 'baseui/avatar';
import {PropTypes} from 'react-view';
import {TConfig} from '../types';

const avatarProps = require('!!extract-react-types-loader!../../../../src/avatar/avatar.js');

const AvatarConfig: TConfig = {
  imports: {
    'baseui/avatar': {
      named: ['Avatar'],
    },
  },
  scope: {Avatar},
  theme: [],
  props: {
    name: {
      value: 'Jane Doe',
      type: PropTypes.String,
      description: 'Alternative text description of the image.',
    },
    size: {
      value: 'scale1200',
      type: PropTypes.String,
      description:
        'Defines the width/height of the image. Accepts labels from theme.sizing, or passes value to height/width.',
    },
    src: {
      value: 'https://api.adorable.io/avatars/285/10@adorable.io.png',
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
  mapTokensToProps: {
    Avatar: avatarProps,
  },
};

export default AvatarConfig;
