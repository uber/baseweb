import * as React from 'react';
import {Button} from 'baseui/button';
import {StatefulPopover} from 'baseui/popover';
import {Paragraph1} from 'baseui/typography';

export default () => (
  <StatefulPopover
    content={
      <Paragraph1 padding="scale500">hello world</Paragraph1>
    }
    accessibilityType={'tooltip'}
  >
    <Button>Open</Button>
  </StatefulPopover>
);
