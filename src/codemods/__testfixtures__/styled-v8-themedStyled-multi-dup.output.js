// @flow
import { styled, createThemedStyled } from 'baseui';

type CustomTheme = {color: string};

const themedStyled = createThemedStyled<CustomTheme>();

const A = themedStyled<{}>('div', props => {
  return {color: props.$theme.color};
});

const B = themedStyled<{}>('div', props => {
  return {color: props.$theme.color};
});
