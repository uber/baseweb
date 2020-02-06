import React from 'react';
import {Avatar} from 'baseui/avatar';

const EnhancedAvatar = props => (
  <Avatar
    overrides={{
      Avatar: {
        style: ({$theme}) => ({
          borderTopLeftRadius: $theme.borders.radius100,
          borderTopRightRadius: $theme.borders.radius100,
          borderBottomRightRadius: $theme.borders.radius100,
          borderBottomLeftRadius: $theme.borders.radius100,
        }),
      },
    }}
    {...props}
  />
);

export default EnhancedAvatar;
