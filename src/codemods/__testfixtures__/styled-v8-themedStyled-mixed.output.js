// @flow
import { styled, createThemedStyled } from 'baseui';

type CustomTheme1 = {height: string};
type CustomTheme2 = {width: string};

const themedStyled = createThemedStyled<CustomTheme1>();

const A = themedStyled<{}>('div', props => {
  return {height: props.$theme.height};
});

const themedStyled2 = createThemedStyled<{color: string}>();

const B = themedStyled2<{}>('div', props => {
  return {color: props.$theme.color};
});

const themedStyled3 = createThemedStyled<CustomTheme2>();

const C = themedStyled3<{}>('div', props => {
  return {width: props.$theme.width};
});

const themedStyled4 = createThemedStyled<{color: string}>();

const D = themedStyled4<{}>('div', props => {
  return {color: props.$theme.color};
});

const E = themedStyled3<{}>('div', props => {
  return {width: props.$theme.width};
});
