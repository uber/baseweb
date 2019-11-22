import omit from 'just-omit';
import {Textarea, SIZE, ADJOINED} from 'baseui/textarea';
import {PropTypes} from 'react-view';
import {TConfig} from '../types';
import {theme, inputProps} from './input';

const textareaProps = require('!!extract-react-types-loader!../../../../src/textarea/textarea.js');

const TextareaConfig: TConfig = {
  imports: {
    'baseui/textarea': {named: ['Textarea']},
  },
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
      type: PropTypes.Custom,
      description: 'Lets you customize all aspects of the component.',
      custom: {
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
  },
  mapTokensToProps: {
    Textarea: textareaProps,
  },
};

export default TextareaConfig;
