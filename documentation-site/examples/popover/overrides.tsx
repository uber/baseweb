import * as React from 'react';
import {Button} from 'baseui/button';
import {StatefulPopover} from 'baseui/popover';
import {expandBorderRadiusStyles} from 'baseui/styles';
import {Paragraph3} from 'baseui/typography';

export default () => (
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
          ...expandBorderRadiusStyles($theme.borders.radius200),
        }),
      },
      Inner: {
        style: ({$theme}) => ({
          backgroundColor: $theme.colors.warning,
          ...expandBorderRadiusStyles($theme.borders.radius200),
          color: $theme.colors.white,
        }),
      },
    }}
    content={
      <Paragraph3 padding="scale500">hello world</Paragraph3>
    }
  >
    <Button>Click Me</Button>
  </StatefulPopover>
);
