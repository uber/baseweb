// @flow
import { styled, createThemedStyled } from 'baseui';

type CustomTheme = {color: string};

const themedStyled = createThemedStyled<CustomTheme>();

const Component = themedStyled<{}>('div', props => {
  return {color: props.$theme.color};
});
