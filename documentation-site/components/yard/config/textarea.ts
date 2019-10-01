import omit from 'just-omit';
import {Textarea, SIZE, ADJOINED} from 'baseui/textarea';
import {PropTypes} from '../const';
import {TConfig} from '../types';
import {theme, inputProps} from './input';

const TextareaConfig: TConfig = {
  scope: {
    Textarea,
    SIZE,
    ADJOINED,
  },
  theme,
  props: {
    ...omit(inputProps, ['type', 'startEnhancer', 'endEnhancer']),
    overrides: {
      value: undefined,
      type: PropTypes.Overrides,
      description: 'Lets you customize all aspects of the component.',
      names: ['Input', 'InputContainer'],
      sharedProps: {
        $isFocused: {
          type: PropTypes.Boolean,
          description: 'True when the component is focused.',
        },
        $disabled: 'disabled',
        $error: 'error',
        $positive: 'positive',
        $adjoined: 'adjoined',
        $size: 'size',
        $required: 'required',
      },
    },
  },
};

export default TextareaConfig;
