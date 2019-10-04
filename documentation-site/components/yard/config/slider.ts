import {Slider} from 'baseui/slider';
import {PropTypes} from '../const';
import {TConfig} from '../types';

const SliderConfig: TConfig = {
  imports: {
    'baseui/slider': {named: ['Slider']},
  },
  scope: {
    Slider,
  },
  theme: [
    'sliderTrackFill',
    'sliderTrackFillHover',
    'sliderTrackFillActive',
    'sliderTrackFillSelected',
    'sliderTrackFillSelectedHover',
    'sliderTrackFillSelectedActive',
    'sliderTrackFillDisabled',
    'sliderHandleFill',
    'sliderHandleFillHover',
    'sliderHandleFillActive',
    'sliderHandleFillSelected',
    'sliderHandleFillSelectedHover',
    'sliderHandleFillSelectedActive',
    'sliderHandleFillDisabled',
    'sliderHandleInnerFill',
    'sliderHandleInnerFillDisabled',
    'sliderHandleInnerFillSelectedHover',
    'sliderHandleInnerFillSelectedActive',
    'sliderBorder',
    'sliderBorderHover',
    'sliderBorderDisabled',
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
    min: {
      value: undefined,
      type: PropTypes.Number,
      placeholder: '0',
      description:
        'The minimum allowed value of the slider. Cannot not be bigger than max.',
    },
    max: {
      value: undefined,
      placeholder: '100',
      type: PropTypes.Number,
      description:
        'The maximum allowed value of the slider. Cannot not be smaller than min.',
    },
    step: {
      value: undefined,
      placeholder: '1',
      type: PropTypes.Number,
      description:
        'The granularity the slider can step through value. Default step is 1.',
    },
    disabled: {
      value: false,
      type: PropTypes.Boolean,
      description: 'True when all tabs are disabled.',
    },
    overrides: {
      value: undefined,
      type: PropTypes.Overrides,
      description: 'Lets you customize all aspects of the component.',
      names: [
        'InnerThumb',
        'InnerTrack',
        'Root',
        'Thumb',
        'ThumbValue',
        'Tick',
        'TickBar',
        'Track',
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
};

export default SliderConfig;
