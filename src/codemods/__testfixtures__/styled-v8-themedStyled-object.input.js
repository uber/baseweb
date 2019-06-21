// @flow
import {styled} from 'baseui';

const Component = styled<{}, {color: string}>('div', props => {
  return {color: props.$theme.color};
});
