import * as React from 'react';
import {Button, KIND} from 'baseui/button';
import {StatefulPagination} from 'baseui/pagination';

export default () => (
  <StatefulPagination
    numPages={10}
    overrides={{
      Root: {
        style: ({$theme}) => ({
          ...$theme.borders.border400,
          borderRadiusTopLeft: $theme.borders.radius200,
          borderRadiusTopRight: $theme.borders.radius200,
          borderRadiusBottomRight: $theme.borders.radius200,
          borderRadiusBottomLeft: $theme.borders.radius200,
          padding: $theme.sizing.scale400,
        }),
      },
      PrevButton: {
        component: ({onClick}) => <Button onClick={onClick}>Left</Button>,
      },
      NextButton: {
        component: ({onClick}) => <Button onClick={onClick}>Right</Button>,
      },
      MaxLabel: {
        style: ({$theme}) => ({
          ...$theme.typography.font100,
        }),
      },
      DropdownContainer: {
        style: ({$theme}) => ({
          marginLeft: $theme.sizing.scale1000,
          marginRight: $theme.sizing.scale1000,
        }),
      },
      DropdownButton: {props: {kind: KIND.secondary}},
      DropdownMenu: {style: {width: '300px'}},
    }}
  />
);
