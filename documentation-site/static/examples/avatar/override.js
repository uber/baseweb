import React from 'react';
import {Avatar} from 'baseui/avatar';
import {Block} from 'baseui/block';

export default () => {
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
      }),
    },
  };

  return (
    <React.Fragment>
      <Block>
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
      </Block>
      <Block>
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
      </Block>
    </React.Fragment>
  );
};
