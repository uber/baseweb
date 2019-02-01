import React from 'react';
import {Block} from 'baseui/block';

export default () => {
  return (
    <Block
      height={['20px', '40px', '80px', '160px']}
      overrides={{
        Block: {
          style: ({$theme}) => ({backgroundColor: $theme.colors.primary200}),
        },
      }}
    />
  );
};
