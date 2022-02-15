import * as React from 'react';
import {StatefulPopover} from 'baseui/popover';
import {StyledLink} from 'baseui/link';
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
      <StyledLink href="javascript:void(0);" tabIndex={0}>
        Open
      </StyledLink>
    </StatefulPopover>
  );
}
