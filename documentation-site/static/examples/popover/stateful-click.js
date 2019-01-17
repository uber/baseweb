import React from 'react';
import {Block} from 'baseui/block';
import {Button} from 'baseui/button';
import {StatefulPopover} from 'baseui/popover';

export default () => (
  <StatefulPopover
    content={<Block padding="scale500">hello world</Block>}
    accessibilityType={'tooltip'}
  >
    <Button>Open</Button>
  </StatefulPopover>
);
