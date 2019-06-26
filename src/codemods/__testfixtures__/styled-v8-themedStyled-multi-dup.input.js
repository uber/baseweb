// @flow
import {styled} from 'baseui';

type CustomTheme = {color: string};

const A = styled<{}, CustomTheme>('div', props => {
  return {color: props.$theme.color};
});

const B = styled<{}, CustomTheme>('div', props => {
  return {color: props.$theme.color};
});
