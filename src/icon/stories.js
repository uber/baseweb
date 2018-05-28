import React from 'react';

import {storiesOf} from '@storybook/react';

import {
  CloudUploadIcon,
  MagnifyingGlassIcon,
  RightArrowIcon,
  XIcon,
} from './index';

storiesOf('Icon', module)
  .add('cloud upload', () => <CloudUploadIcon />)
  .add('magnifying glass', () => <MagnifyingGlassIcon />)
  .add('right arrow', () => <RightArrowIcon />)
  .add('x', () => <XIcon />);
