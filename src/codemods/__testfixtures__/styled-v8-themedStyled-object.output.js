// @flow
import { styled, createThemedStyled } from 'baseui';

const themedStyled = createThemedStyled<{color: string}>();

const Component = themedStyled<{}>('div', props => {
  return {color: props.$theme.color};
});
