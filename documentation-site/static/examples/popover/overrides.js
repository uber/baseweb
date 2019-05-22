import * as React from 'react';
import {Block} from 'baseui/block';
import {Button} from 'baseui/button';
import {StatefulPopover} from 'baseui/popover';

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
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          borderBottomLeftRadius: 0,
        }),
      },
      Inner: {
        style: ({$theme}) => ({
          backgroundColor: $theme.colors.warning,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          borderBottomLeftRadius: 0,
          color: $theme.colors.white,
        }),
      },
    }}
    content={<Block padding="scale500">hello world</Block>}
  >
    <Button>Click Me</Button>
  </StatefulPopover>
);
