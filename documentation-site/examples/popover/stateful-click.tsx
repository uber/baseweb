import * as React from 'react';
import {Button} from 'spaceweb/button';
import {StatefulPopover} from 'spaceweb/popover';
import {Paragraph3} from 'spaceweb/typography';

export default () => (
  <StatefulPopover
    content={
      <Paragraph3 padding="scale500">hello world</Paragraph3>
    }
    accessibilityType={'tooltip'}
  >
    <Button>Open</Button>
  </StatefulPopover>
);
