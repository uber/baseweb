import * as React from 'react';
import {Button} from 'baseui/button';
import {StatefulPopover} from 'baseui/popover';
import {ParagraphSmall} from 'baseui/typography';

export default function Example() {
  return (
    <StatefulPopover
      content={
        <ParagraphSmall padding="scale500">
          hello world
        </ParagraphSmall>
      }
      accessibilityType={'tooltip'}
    >
      <Button>Open</Button>
    </StatefulPopover>
  );
}
