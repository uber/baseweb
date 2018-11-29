/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {styled} from '../styles';
import {Avatar} from './index';
import examples from './examples-list';

const Row = styled('div', props => ({
  width: '400px',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'flex-end',
  marginTop: props.$theme.sizing.scale1400,
}));

export default {
  [examples.AVATAR_EXAMPLE]: function AvatarStory() {
    return (
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
    );
  },

  [examples.AVATAR_ERROR]: function AvatarErrorStory() {
    return (
      <Row>
        {['scale800', 'scale1000', 'scale1200', 'scale1400', '64px'].map(
          (size, index) => (
            <Avatar
              name={`user name # ${index}`}
              size={size}
              src="https://not-a-real-image.png"
              key={size}
            />
          ),
        )}
      </Row>
    );
  },

  [examples.AVATAR_OVERRIDE]: function AvatarOverrideStory() {
    const borderOverrides = {
      Root: {
        style: ({$theme}) => ({
          ...$theme.borders.border500,
        }),
      },
    };

    const squaredOverrides = {
      Avatar: {
        style: ({$theme}) => ({
          borderRadius: $theme.borders.radius100,
        }),
      },
      Root: {
        style: ({$theme}) => ({
          borderRadius: $theme.borders.radius100,
          ...$theme.borders.border500,
        }),
      },
    };

    return (
      <React.Fragment>
        <Row>
          <Avatar
            overrides={borderOverrides}
            name="user name #1"
            size="scale1400"
            src="https://api.adorable.io/avatars/285/11@adorable.io.png"
          />

          <Avatar
            overrides={borderOverrides}
            name="user name #2"
            size="scale1400"
            src="https://not-a-real-image.png"
          />
        </Row>

        <Row>
          <Avatar
            overrides={squaredOverrides}
            name="user name #3"
            size="scale1400"
            src="https://api.adorable.io/avatars/285/12@adorable.io.png"
          />

          <Avatar
            overrides={squaredOverrides}
            name="user name #4"
            size="scale1400"
            src="https://not-a-real-image.png"
          />
        </Row>
      </React.Fragment>
    );
  },
};
