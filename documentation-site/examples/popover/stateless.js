// @flow
import * as React from 'react';
import {Block} from 'baseui/block';
import {Popover} from 'baseui/popover';
import {Paragraph1} from 'baseui/typography';

export default () => (
  <Popover
    isOpen
    content={
      <Paragraph1 padding="scale500">hello world</Paragraph1>
    }
  >
    <Block as="span" font="font400">
      Always open
    </Block>
  </Popover>
);
