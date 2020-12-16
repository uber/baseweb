import * as React from 'react';
import {StatefulPopover} from 'baseui/popover';
import {StyledLink} from 'baseui/link';
import {Paragraph3} from 'baseui/typography';

export default function Example() {
  return (
    <StatefulPopover
      content={
        <Paragraph3 padding="scale500">hello world</Paragraph3>
      }
      accessibilityType={'tooltip'}
    >
      <StyledLink href="javascript:void(0);" tabIndex={0}>
        Open
      </StyledLink>
    </StatefulPopover>
  );
}
