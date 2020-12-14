import * as React from 'react';
import {Button} from 'baseui/button';
import {StatefulPagination} from 'baseui/pagination';
import {expandBorderStyles} from 'baseui/styles';

export default function Example() {
  return (
    <StatefulPagination
      numPages={10}
      overrides={{
        Root: {
          style: ({$theme}) => ({
            ...expandBorderStyles($theme.borders.border400),
            borderTopLeftRadius: $theme.borders.radius200,
            borderTopRightRadius: $theme.borders.radius200,
            borderBottomRightRadius: $theme.borders.radius200,
            borderBottomLeftRadius: $theme.borders.radius200,
            padding: $theme.sizing.scale400,
          }),
        },
        PrevButton: {
          component: ({onClick}: any) => (
            <Button onClick={onClick}>Left</Button>
          ),
        },
        NextButton: {
          component: ({onClick}: any) => (
            <Button onClick={onClick}>Right</Button>
          ),
        },
        MaxLabel: {
          style: ({$theme}) => ({
            ...$theme.typography.font300,
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
                }: any) => ({
                  borderLeftColor: 'transparent',
                  borderRightColor: 'transparent',
                  borderTopColor: 'transparent',
                  borderBottomColor: 'transparent',
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
              SingleValue: {
                style: ({$theme}: any) => ({
                  position: 'relative',
                  paddingTop: '0',
                  paddingBottom: '0',
                  paddingLeft: $theme.sizing.scale200,
                  paddingRight: $theme.sizing.scale500,
                  color: $theme.colors.buttonTertiaryText,
                  ...$theme.typography.font350,
                }),
              },
              SelectArrow: {
                style: ({$theme}: any) => ({
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
}
