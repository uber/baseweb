import * as React from 'react';
import {Block} from 'baseui/block';
import {StatefulPopover, TRIGGER_TYPE} from 'baseui/popover';
import {Paragraph1} from 'baseui/typography';

export default () => (
  <StatefulPopover
    content={
      <Paragraph1 padding="scale500">hello world</Paragraph1>
    }
    accessibilityType={'tooltip'}
    triggerType={TRIGGER_TYPE.hover}
  >
    <Block as="span" font="font400">
      Hover
    </Block>
  </StatefulPopover>
);
