/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* global module */
/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import {storiesOf} from '@storybook/react';

import {styled} from '../../styles/index.js';
import {Avatar} from '../index.js';

const Row = styled('div', props => ({
  width: '400px',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'flex-end',
  marginTop: props.$theme.sizing.scale1400,
}));

storiesOf('Avatar', module)
  .add('Avatar', () => (
    <Row>
      {['scale800', 'scale1000', 'scale1200', 'scale1400', '64px'].map(
        (size, index) => (
          <Avatar
            name={`user name # ${index}`}
            size={size}
            src={`https://api.adorable.io/avatars/285/${index}@adorable.io.png`}
            key={size}
          />
        ),
      )}
    </Row>
  ))
  .add('Avatar error state', () => (
    <Row>
      {['scale800', 'scale1000', 'scale1200', 'scale1400', '64px'].map(
        (size, index) => (
          <Avatar
            name={`username`}
            size={size}
            src="https://not-a-real-image.png"
            key={size}
          />
        ),
      )}
    </Row>
  ));
