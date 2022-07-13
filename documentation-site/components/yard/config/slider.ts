/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { Slider } from 'baseui/slider';
import { PropTypes } from 'react-view';
import { TConfig } from '../types';

const sliderProps = require('!!extract-react-types-loader!../../../../src/slider/slider');

const SliderConfig: TConfig = {
  componentName: 'Slider',
  imports: {
    'baseui/slider': { named: ['Slider'] },
  },
  scope: {
    Slider,
  },
  theme: [
    'sliderTrackFill',
    'sliderHandleFill',
    'sliderHandleFillDisabled',
    'sliderHandleInnerFill',
  ],
  props: {
    value: {
      value: '[10]',
      type: PropTypes.Array,
      description: 'Slider value.',
      stateful: true,
    },
    onChange: {
      value: '({value}) => value && setValue(value)',
      type: PropTypes.Function,
      description: 'Called when slider value is changed.',
      propHook: {
        what: 'JSON.stringify(value)',
        into: 'value',
      },
    },
    onFinalChange: {
      value: '({value}) => console.log(value)',
      type: PropTypes.Function,
      description: 'Called when slider value is done changing.',
    },
    min: {
      value: undefined,
      type: PropTypes.Number,
      placeholder: '0',
      description: 'The minimum allowed value of the slider. Cannot not be bigger than max.',
    },
    max: {
      value: undefined,
      placeholder: '100',
      type: PropTypes.Number,
      description: 'The maximum allowed value of the slider. Cannot not be smaller than min.',
    },
    step: {
      value: undefined,
      placeholder: '1',
      type: PropTypes.Number,
      description: 'The granularity the slider can step through value. Default step is 1.',
    },
    marks: {
      value: false,
      type: PropTypes.Boolean,
      description: 'Display a mark at each step.',
    },
    disabled: {
      value: false,
      type: PropTypes.Boolean,
      description: 'True when all tabs are disabled.',
    },
    persistentThumb: {
      value: false,
      type: PropTypes.Boolean,
      description: 'Causes the value/thumb to always display.',
    },
    valueToLabel: {
      value: undefined,
      placeholder: '(value) => `${value}:00 AM',
      type: PropTypes.Function,
      description: 'Used to transform the thumb value/min/max labels into a user-friendly label.',
    },
    overrides: {
      value: undefined,
      type: PropTypes.Custom,
      description: 'Lets you customize all aspects of the component.',
      custom: {
        names: [
          'InnerThumb',
          'InnerTrack',
          'Root',
          'Thumb',
          'ThumbValue',
          'Tick',
          'TickBar',
          'Track',
          'Mark',
        ],
        sharedProps: {
          $disabled: 'disabled',
          $isDragged: {
            type: PropTypes.Boolean,
            description: 'True when the handler is being dragged.',
          },
          $max: 'max',
          $min: 'min',
          $thumbIndex: {
            type: PropTypes.Number,
            description: 'The index of the handler that is being rendered.',
          },
          $value: 'value',
        },
      },
    },
  },
  mapTokensToProps: {
    Slider: sliderProps,
  },
};

export default SliderConfig;
