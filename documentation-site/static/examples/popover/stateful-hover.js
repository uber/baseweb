import * as React from 'react';
import {Block} from 'baseui/block';
import {StatefulPopover, TRIGGER_TYPE} from 'baseui/popover';

export default () => (
  <StatefulPopover
    content={<Block padding="scale500">hello world</Block>}
    accessibilityType={'tooltip'}
    triggerType={TRIGGER_TYPE.hover}
  >
    <Block as="span" font="font400">
      Hover
    </Block>
  </StatefulPopover>
);
