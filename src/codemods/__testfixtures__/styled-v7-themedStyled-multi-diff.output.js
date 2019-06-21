// @flow
import {styled, createThemedStyled} from 'baseui';

type CustomTheme1 = {color: string};
type CustomTheme2 = {size: string};

const themedStyled1 = createThemedStyled<CustomTheme1>();

const A = themedStyled1<{}>('div', props => {
  return {color: props.$theme.color};
});

const themedStyled2 = createThemedStyled<CustomTheme2>();

const B = themedStyled2<{}>('div', props => {
  return {color: props.$theme.color};
});
