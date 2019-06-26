// @flow
import {styled} from 'baseui';

type CustomTheme1 = {color: string};
type CustomTheme2 = {size: string};

const A = styled<{}, CustomTheme1>('div', props => {
  return {color: props.$theme.color};
});

const B = styled<{}, CustomTheme2>('div', props => {
  return {color: props.$theme.color};
});
