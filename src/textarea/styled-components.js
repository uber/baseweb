// @flow
import {styled} from '../styles';
import {
  getInputStyles,
  getInputContainerStyles,
} from '../input/styled-components';

export const TextareaContainer = styled('div', props => {});

export const Textarea = styled('textarea', props => {
  return {
    ...getInputStyles(props),
    ...getInputContainerStyles(props),
  };
});
