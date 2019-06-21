// @flow
import { styled, createThemedStyled } from 'baseui';

const themedStyled1 = createThemedStyled<{color: string}>();

const Component = themedStyled1<{}>('div', props => {
  return {color: props.$theme.color};
});
