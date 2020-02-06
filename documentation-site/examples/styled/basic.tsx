import * as React from 'react';
import {styled} from 'spaceweb';
import {Theme} from 'spaceweb/theme';

type CustomTheme = Theme & {extraProp: string};

const BlueDiv = styled<
  {$color: keyof Theme['colors']},
  'div',
  CustomTheme
>('div', ({$color, $theme}) => ({
  color: $theme.colors[$color],
}));

export default () => (
  <BlueDiv $color="accent">This is a blue div</BlueDiv>
);
