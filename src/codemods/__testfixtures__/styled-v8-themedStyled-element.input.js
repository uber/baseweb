// @flow
import {styled} from 'baseui';

type CustomTheme = {color: string};

const Component = styled<{}, CustomTheme>('div', props => {
  return {color: props.$theme.color};
});
