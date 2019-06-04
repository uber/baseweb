import * as React from 'react';
import {Block} from 'baseui/block';
import {Button} from 'baseui/button';
import {StatefulPopover} from 'baseui/popover';
import {Paragraph1} from 'baseui/typography';

export default () => (
  <StatefulPopover
    initialState={{isOpen: true}}
    showArrow
    overrides={{
      Arrow: {
        style: ({$theme}) => ({backgroundColor: $theme.colors.warning}),
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
    content={<Paragraph1 padding="scale500">hello world</Paragraph1>}
  >
    <Button>Click Me</Button>
  </StatefulPopover>
);
