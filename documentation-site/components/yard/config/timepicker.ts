/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import {TimePicker} from 'baseui/timepicker';
import {SIZE} from 'baseui/input';
import {PropTypes} from 'react-view';
import {TConfig} from '../types';
import inputConfig from './input';
import selectConfig from './select';
import {startOfDay} from 'date-fns';

const timepickerProps = require('!!extract-react-types-loader!../../../../src/timepicker/timepicker.js');

const TimepickerConfig: TConfig = {
  componentName: 'TimePicker',
  imports: {
    'baseui/timepicker': {named: ['TimePicker']},
  },
  scope: {
    TimePicker,
    SIZE,
  },
  theme: selectConfig.theme,
  props: {
    value: {
      value: new Date().toISOString(),
      type: PropTypes.Date,
      description:
        'Optional value that can be provided to fully control the component. If not provided, TimePicker will manage state internally and default to the closest step to new Date().',
      stateful: true,
    },
    onChange: {
      value: 'date => setValue(date)',
      type: PropTypes.Function,
      description: 'Callback for when time selection changes.',
      propHook: {
        what: 'date.toISOString()',
        into: 'value',
      },
    },
    size: inputConfig.props.size,
    creatable: {
      value: undefined,
      type: PropTypes.Boolean,
      description: `Set to true to allow times that aren't displayed in the options list to be entered manually. Defaults to false.`,
    },
    nullable: {
      value: undefined,
      type: PropTypes.Boolean,
      description: `Set to true to allow the timepicker to have an undefined value. Defaults to false.`,
    },
    placeholder: {
      value: undefined,
      type: PropTypes.String,
      description: `If the value is undefined, the placeholder is shown. Defaults to HH:mm.`,
    },
    disabled: inputConfig.props.disabled,
    format: {
      value: undefined,
      type: PropTypes.String,
      placeholder: '12',
      description:
        '12 or 24. Render options in AM/PM format or 24 hour format. Defaults to 12 hour.',
    },
    step: {
      value: undefined,
      type: PropTypes.Number,
      placeholder: '900',
      description:
        'Amount of seconds between each option time. Defaults to 900 (15 minutes).',
    },
    minTime: {
      value: startOfDay(new Date()).toISOString(),
      type: PropTypes.Date,
      description: 'Earliest time to show on the time picker (ex. 09:30).',
    },
    maxTime: {
      value: undefined,
      type: PropTypes.Date,
      description: 'Latest time to show on the time picker (ex. 18:30).',
    },
    error: inputConfig.props.error,
    positive: inputConfig.props.positive,
    overrides: {
      value: undefined,
      type: PropTypes.Custom,
      description: 'Lets you customize all aspects of the component.',
      custom: {
        names: [selectConfig],
        sharedProps: {},
      },
    },
  },
  mapTokensToProps: {
    TimePicker: timepickerProps,
  },
};

export default TimepickerConfig;
