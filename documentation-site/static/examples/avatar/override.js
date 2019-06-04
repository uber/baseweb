import * as React from 'react';
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
        borderTopLeftRadius: $theme.borders.radius100,
        borderTopRightRadius: $theme.borders.radius100,
        borderBottomRightRadius: $theme.borders.radius100,
        borderBottomLeftRadius: $theme.borders.radius100,
      }),
    },
    Root: {
      style: ({$theme}) => ({
        borderTopLeftRadius: $theme.borders.radius100,
        borderTopRightRadius: $theme.borders.radius100,
        borderBottomRightRadius: $theme.borders.radius100,
        borderBottomLeftRadius: $theme.borders.radius100,
      }),
    },
  };

  return (
    <React.Fragment>
      <Block display="flex" alignItems="center">
        <Avatar
          overrides={borderOverrides}
          name="user name #1"
          size="scale1400"
          src="https://api.adorable.io/avatars/285/11@adorable.io.png"
        />

        <Avatar
          overrides={borderOverrides}
          name="beyonce knowles"
          size="scale1400"
          src="https://not-a-real-image.png"
        />
      </Block>
      <Block display="flex" alignItems="center">
        <Avatar
          overrides={squaredOverrides}
          name="user name #3"
          size="scale1400"
          src="https://api.adorable.io/avatars/285/12@adorable.io.png"
        />

        <Avatar
          overrides={squaredOverrides}
          name="beyonce knowles"
          size="scale1400"
          src="https://not-a-real-image.png"
        />
      </Block>
    </React.Fragment>
  );
};
