import React from 'react';
import {Block} from 'baseui/block';
import {Popover} from 'baseui/popover';

export default () => (
  <Popover isOpen content={<Block padding="scale500">hello world</Block>}>
    <Block as="span" font="font400">
      Always open
    </Block>
  </Popover>
);
