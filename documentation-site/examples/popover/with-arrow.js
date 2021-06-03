// @flow
import * as React from 'react';
import {Block} from 'baseui/block';
import {Button} from 'baseui/button';
import {StatefulPopover} from 'baseui/popover';
import {Paragraph3} from 'baseui/typography';

export default function Example() {
  return (
    <StatefulPopover
      showArrow
      content={
        <Paragraph3 padding="scale500">hello world</Paragraph3>
      }
      accessibilityType={'tooltip'}
    >
      <Button>Open</Button>
    </StatefulPopover>
  );
}
