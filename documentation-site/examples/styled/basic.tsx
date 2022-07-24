import * as React from 'react';
import {styled} from 'baseui';
import {Theme} from 'baseui';

type CustomTheme = Theme & {extraProp: string};

const BlueDiv = styled<
  'div',
  {$color: keyof Theme['colors']},
  CustomTheme
>('div', ({$color, $theme}) => ({
  color: $theme.colors[$color],
}));

export default function Example() {
  return <BlueDiv $color="accent">This is a blue div</BlueDiv>;
}
