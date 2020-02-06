import * as React from 'react';
import {Block} from 'spaceweb/block';

export default () => {
  return (
    <Block
      as="h2"
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
