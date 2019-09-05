import * as React from 'react';
import {StatefulPopover} from 'baseui/popover';
import {StyledLink} from 'baseui/link';
import {Paragraph1} from 'baseui/typography';

export default () => (
  <StatefulPopover
    content={
      <Paragraph1 padding="scale500">hello world</Paragraph1>
    }
    accessibilityType={'tooltip'}
  >
    <StyledLink href="javascript:void(0);" tabIndex={0}>
      Open
    </StyledLink>
  </StatefulPopover>
);
