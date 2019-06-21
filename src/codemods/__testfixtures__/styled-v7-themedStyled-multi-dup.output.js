// @flow
import { styled, createThemedStyled } from 'baseui';

type CustomTheme = {color: string};

const themedStyled1 = createThemedStyled<CustomTheme>();

const A = themedStyled1<{}>('div', props => {
  return {color: props.$theme.color};
});

const B = themedStyled1<{}>('div', props => {
  return {color: props.$theme.color};
});
