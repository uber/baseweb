// @ts-ignore
import omit from 'just-omit';

import {Textarea, SIZE, ADJOINED} from 'baseui/textarea';
import {PropTypes} from '../const';

import {themeConfig} from './input';
import {inputProps} from './input';

export default {
  scopeConfig: {
    Textarea,
    SIZE,
    ADJOINED,
  },
  themeConfig,
  propsConfig: {
    ...omit(inputProps, ['type', 'startEnhancer', 'endEnhancer']),
    overrides: {
      value: undefined,
      type: PropTypes.Overrides,
      description: 'Lets you customize all aspects of the component.',
      meta: {
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
};
