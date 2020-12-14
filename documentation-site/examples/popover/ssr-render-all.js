// @flow
import * as React from 'react';
import {Button} from 'baseui/button';
import {StatefulPopover} from 'baseui/popover';
import {Paragraph3} from 'baseui/typography';

export default function Example() {
  return (
    <StatefulPopover
      content={
        <Paragraph3 padding="scale500">
          Server-side rendered (check source!)
        </Paragraph3>
      }
      accessibilityType={'tooltip'}
      renderAll
    >
      <Button>
        Always Rendered for SEO / server-side rendering
      </Button>
    </StatefulPopover>
  );
}
