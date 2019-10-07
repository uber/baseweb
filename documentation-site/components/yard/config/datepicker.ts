import {Datepicker} from 'baseui/datepicker';
import {PropTypes} from '../const';
import {TConfig} from '../types';

const DatepickerConfig: TConfig = {
  imports: {
    'baseui/datepicker': {
      named: ['Datepicker'],
    },
  },
  scope: {Datepicker},
  theme: [],
  props: {
    value: {
      value: '1995-12-17T03:24:00',
      type: PropTypes.Date,
      description: 'Currently selected date.',
      stateful: true,
    },
    onChange: {
      value: '({ date }) => setValue(date)',
      type: PropTypes.Function,
      description: 'Event handler that is called when a new date is selected.',
      propHook: {
        what: 'date.toString()',
        into: 'value',
      },
    },
    overrides: {
      value: undefined,
      type: PropTypes.Overrides,
      description: 'Lets you customize all aspects of the component.',
      names: ['Root', 'Avatar', 'Initials'],
      sharedProps: {},
    },
  },
};

export default DatepickerConfig;
