// @flow

import React, {Fragment} from 'react';
import {storiesOf} from '@storybook/react';
import {IconCloudUpload, IconMagnifyingGlass, IconRightArrow, IconX} from '.';

storiesOf('Icon', module)
  .add('All Icons', () => (
    <Fragment>
      <IconCloudUpload />
      <IconMagnifyingGlass />
      <IconRightArrow />
      <IconX />
    </Fragment>
  ))
  .add('Icon w/ Alternate Text', () => <IconX alt="Close" />);
