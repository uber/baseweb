import React from 'react';
import {Block} from 'baseui/block';

export default () => {
  return (
    <Block
      as="h2"
      font="font500"
      overrides={{
        Block: {
          style: {color: 'red'},
        },
      }}
    >
      These styles are provided by styletron
    </Block>
  );
};
