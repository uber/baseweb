import * as React from 'react';
import {Button} from 'baseui/button';
import {StatefulPopover} from 'baseui/popover';
import {ParagraphSmall} from 'baseui/typography';

export default function Example() {
  return (
    <StatefulPopover
      initialState={{isOpen: true}}
      showArrow
      overrides={{
        Arrow: {
          style: ({$theme}) => ({
            backgroundColor: $theme.colors.warning,
          }),
        },
        Body: {
          style: ({$theme}) => ({
            backgroundColor: $theme.colors.warning,
            borderTopLeftRadius: $theme.borders.radius200,
            borderTopRightRadius: $theme.borders.radius200,
            borderBottomRightRadius: $theme.borders.radius200,
            borderBottomLeftRadius: $theme.borders.radius200,
          }),
        },
        Inner: {
          style: ({$theme}) => ({
            backgroundColor: $theme.colors.warning,
            borderTopLeftRadius: $theme.borders.radius200,
            borderTopRightRadius: $theme.borders.radius200,
            borderBottomRightRadius: $theme.borders.radius200,
            borderBottomLeftRadius: $theme.borders.radius200,
            color: $theme.colors.white,
          }),
        },
      }}
      content={
        <ParagraphSmall padding="scale500">
          hello world
        </ParagraphSmall>
      }
    >
      <Button>Click Me</Button>
    </StatefulPopover>
  );
}
