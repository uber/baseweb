import * as React from 'react';
import {styled} from 'baseui';
import {Theme} from 'baseui/theme';

type CustomTheme = Theme & {extraProp: string};

const BlueDiv = styled<
  {$color: keyof Theme['colors']},
  'div',
  CustomTheme
>('div', ({$color, $theme}) => ({
  color: $theme.colors[$color],
}));

export default function Example() {
  return <BlueDiv>This is a blue div</BlueDiv>;
}
