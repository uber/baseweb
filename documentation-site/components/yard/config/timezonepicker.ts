import {TimezonePicker} from 'baseui/timezonepicker';
import {SIZE} from 'baseui/input';
import {PropTypes} from 'react-view';
import {TConfig} from '../types';
import inputConfig from './input';
import selectConfig from './select';

const timezonePickerProps = require('!!extract-react-types-loader!../../../../src/timezonepicker/timezone-picker.js');

const TimezonepickerConfig: TConfig = {
  imports: {
    'baseui/timezonepicker': {named: ['TimezonePicker']},
  },
  scope: {
    TimezonePicker,
    SIZE,
  },
  theme: selectConfig.theme,
  props: {
    value: {
      value: 'Europe/London',
      type: PropTypes.String,
      description:
        'Optional value that can be provided to fully control the component. If not provided, TimezonePicker will manage state internally.',
      stateful: true,
    },
    onChange: {
      value: '({ id }) => setValue(id)',
      type: PropTypes.Function,
      description: 'Callback for when the timezone selection changes.',
      propHook: {
        what: 'id',
        into: 'value',
      },
    },
    positive: inputConfig.props.positive,
    error: inputConfig.props.error,
    size: inputConfig.props.size,
    date: {
      value: new Date().toISOString(),
      type: PropTypes.Date,
      description:
        'If not provided, defaults to new Date(). Important to note that the timezone picker only displays options related to the provided date. Take Pacific Time for example. On March 9th, Pacific Time equates to the more specific Pacific Standard Time. On March 10th, it operates on Pacific Daylight Time. The timezone picker will never display PST and PDT together. If you need exact specificity, provide a date. Otherwise it will default to the relevant timezone at render.',
    },
    mapLabels: {
      value: undefined,
      type: PropTypes.Function,
      placeholder: '({ id, label }) => "Test"',
      description: `Customize the option's label. Useful for translations and optionally mapping from 'America/Los_Angeles' to 'Pacific Time'.`,
    },
    disabled: inputConfig.props.disabled,
    overrides: {
      value: undefined,
      type: PropTypes.Custom,
      description: 'Lets you customize all aspects of the component.',
      custom: {
        names: [],
        sharedProps: {},
      },
    },
  },
  mapTokensToProps: {
    TimezonePicker: timezonePickerProps,
  },
};

export default TimezonepickerConfig;
