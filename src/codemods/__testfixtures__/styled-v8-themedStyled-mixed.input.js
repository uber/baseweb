// @flow
import {styled} from 'baseui';

type CustomTheme1 = {height: string};
type CustomTheme2 = {width: string};

const A = styled<{}, CustomTheme1>('div', props => {
  return {height: props.$theme.height};
});

const B = styled<{}, {color: string}>('div', props => {
  return {color: props.$theme.color};
});

const C = styled<{}, CustomTheme2>('div', props => {
  return {width: props.$theme.width};
});

const D = styled<{}, {color: string}>('div', props => {
  return {color: props.$theme.color};
});

const E = styled<{}, CustomTheme2>('div', props => {
  return {width: props.$theme.width};
});
