// @flow
import {styled} from '../../styles';
import {getInputStyles} from '../input/styled-components';

export {InputContainer as TextareaContainer} from '../input/styled-components';

export const Textarea = styled('textarea', props => {
  return {
    ...getInputStyles(props),
  };
});
