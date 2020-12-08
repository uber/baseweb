// @flow
import * as React from 'react';
import {styled} from 'baseui';

const BlueDiv = styled<{}>('div', ({$theme}) => ({
  color: $theme.colors.accent,
}));

export default function Example() {
  return <BlueDiv>This is a blue div</BlueDiv>;
}
