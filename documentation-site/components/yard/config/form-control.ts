/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import { PropTypes } from 'react-view';
import { TConfig } from '../types';

const formControlProps = require('!!extract-react-types-loader!../../../../src/form-control/form-control.js');
const inputProps = require('!!extract-react-types-loader!../../../../src/input/input.js');

const TextareaConfig: TConfig = {
  componentName: 'FormControl',
  imports: {
    'baseui/form-control': { named: ['FormControl'] },
  },
  scope: {
    FormControl,
    Input,
  },
  theme: [],
  props: {
    children: {
      value: '<Input />',
      type: PropTypes.ReactNode,
      description: 'Content wrapped by FormControl.',
      imports: { 'baseui/input': { named: ['Input'] } },
    },
    label: {
      value: `() => 'label'`,
      type: PropTypes.Function,
      description: 'A label rendered above the input field.',
    },
    caption: {
      value: `() => 'caption'`,
      type: PropTypes.Function,
      description: 'A caption rendered below the input field.',
    },
    positive: {
      value: undefined,
      type: PropTypes.Function,
      description:
        'Positive state of the input. If an error prop passed it will be rendered in place of positive as an error message.',
    },
    error: {
      value: undefined,
      type: PropTypes.Function,
      description:
        'Error state of the input. If an error prop passed it will be rendered in place of caption as an error message.',
    },
    disabled: {
      value: false,
      type: PropTypes.Boolean,
      description: 'Displays label in light gray color if true.',
    },
    htmlFor: {
      value: undefined,
      type: PropTypes.String,
      description:
        'The id of the related form element. Defaults to the id property of the child, if any.',
    },
    overrides: {
      value: undefined,
      type: PropTypes.Custom,
      description: 'Lets you customize all aspects of the component.',
      custom: {
        names: ['Label', 'Caption', 'ControlContainer'],
        sharedProps: {
          $disabled: 'disabled',
          $error: {
            type: PropTypes.Boolean,
            description: 'True if error message provided.',
          },
          $positive: {
            type: PropTypes.Boolean,
            description: 'True if positive message provided.',
          },
        },
      },
    },
  },
  mapTokensToProps: {
    FormControl: formControlProps,
    Input: inputProps,
  },
};

export default TextareaConfig;
