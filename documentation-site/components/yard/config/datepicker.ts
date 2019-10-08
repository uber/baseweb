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
      value: new Date().toISOString(),
      type: PropTypes.Date,
      description: 'Currently selected date (Date object).',
      stateful: true,
    },
    onChange: {
      value: '({ date }) => setValue(date)',
      type: PropTypes.Function,
      description: 'Event handler that is called when a new date is selected.',
      propHook: {
        what: 'date.toISOString()',
        into: 'value',
      },
    },
    autoFocusCalendar: {
      value: undefined,
      type: PropTypes.Function,
      description:
        'Defines if the calendar is set to be focused on an initial render.',
      hidden: true,
    },
    excludeDates: {
      value: undefined,
      type: PropTypes.Array,
      description: 'A list of dates to disable. Array<Date>',
    },
    quickSelect: {
      value: undefined,
      type: PropTypes.Boolean,
      description:
        'Display select for quickly choosing date ranges. range must be true as well.',
    },
    quickSelectOptions: {
      value: undefined,
      type: PropTypes.Array,
      description:
        'Array of custom options (Array<{ id: string; beginDate: Date }>) displayed in the quick select. Overrides default options if provided.',
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
