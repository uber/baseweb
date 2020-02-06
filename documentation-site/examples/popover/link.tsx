import * as React from 'react';
import {StatefulPopover} from 'spaceweb/popover';
import {StyledLink} from 'spaceweb/link';
import {Paragraph3} from 'spaceweb/typography';

export default () => (
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
