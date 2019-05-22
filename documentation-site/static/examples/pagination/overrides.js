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
          ...$theme.typography.font400,
          marginRight: $theme.sizing.scale1000,
        }),
      },
      DropdownContainer: {
        style: ({$theme}) => ({
          marginLeft: $theme.sizing.scale1000,
        }),
      },
      Select: {
        props: {
          overrides: {
            ControlContainer: {
              style: ({
                $theme,
                $disabled,
                $isFocused,
                $isPseudoFocused,
                $error,
              }) => ({
                borderWidth: '0',
                boxShadow: 'none',
                backgroundColor: $disabled
                  ? $theme.colors.buttonDisabledFill
                  : $isFocused || $isPseudoFocused
                    ? $theme.colors.buttonSecondaryHover
                    : $error
                      ? $theme.colors.negative50
                      : $theme.colors.buttonSecondaryFill,
              }),
            },
            ValueContainer: {
              style: ({$theme}) => ({
                paddingTop: $theme.sizing.scale300,
                paddingBottom: $theme.sizing.scale300,
              }),
            },
            SingleValue: {
              style: ({$theme}) => ({
                position: 'relative',
                paddingTop: '0',
                paddingBottom: '0',
                paddingLeft: $theme.sizing.scale200,
                paddingRight: $theme.sizing.scale500,
                color: $theme.colors.buttonTertiaryText,
                ...$theme.typography.font450,
              }),
            },
            SelectArrow: {
              style: ({$theme}) => ({
                width: '24px',
                height: '24px',
                color: $theme.colors.buttonTertiaryText,
              }),
            },
          },
        },
      },
    }}
  />
);
