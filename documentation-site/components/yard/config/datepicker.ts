/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import {DatePicker, ORIENTATION} from 'baseui/datepicker';
import {SIZE} from 'baseui/input';
import {PropTypes} from 'react-view';
import {TConfig} from '../types';
import inputConfig from './input';
import menuConfig from './menu';
import popoverConfig from './popover';
import iconConfig from './icon';
import formControlConfig from './form-control';
import timepickerConfig from './timepicker';
import selectConfig from './select';

const datepickerProps = require('!!extract-react-types-loader!../../../../src/datepicker/datepicker.js');

const DatepickerConfig: TConfig = {
  componentName: 'DatePicker',
  imports: {
    'baseui/datepicker': {
      named: ['DatePicker'],
    },
  },
  scope: {DatePicker, ORIENTATION, SIZE},
  theme: [
    'datepickerBackground',
    'datepickerDayFont',
    'datepickerDayFontDisabled',
    'datepickerDayPseudoSelected',
    'datepickerDayPseudoHighlighted',
    'calendarBackground',
    'calendarForeground',
    'calendarForegroundDisabled',
    'calendarHeaderBackground',
    'calendarHeaderForeground',
    'calendarHeaderBackgroundActive',
    'calendarHeaderForegroundDisabled',
    'calendarDayBackgroundPseudoSelected',
    'calendarDayForegroundPseudoSelected',
    'calendarDayBackgroundPseudoSelectedHighlighted',
    'calendarDayForegroundPseudoSelectedHighlighted',
    'calendarDayBackgroundSelected',
    'calendarDayForegroundSelected',
    'calendarDayBackgroundSelectedHighlighted',
    'calendarDayForegroundSelectedHighlighted',
    ...inputConfig.theme,
  ],
  props: {
    value: {
      value: '[new Date()]',
      type: PropTypes.Array,
      description: 'Currently selected date (Date object).',
      stateful: true,
    },
    onChange: {
      value: '({ date }) => setValue(Array.isArray(date) ? date : [date])',
      type: PropTypes.Function,
      description: 'Event handler that is called when a new date is selected.',
      propHook: {
        // yikes, onChange can return Date, [Date] or [Date, Date] and we need to handle
        // them all
        what: `(Array.isArray(date) && (!date[0] || !date[1])) || !date ?
          "[new Date()]"
          :
            Array.isArray(date) && date.length === 2 ?
              "[new Date('" + date[0].toISOString() + "'), new Date('" + date[1].toISOString() + "')]"
            : (Array.isArray(date) ? "[new Date('" + date[0].toISOString() + "')]" : "[new Date('" + date.toISOString() + "')]")`,
        into: 'value',
      },
    },
    autoFocusCalendar: {
      value: false,
      type: PropTypes.Boolean,
      description:
        'Defines if the calendar is set to be focused on an initial render.',
      hidden: true,
    },
    excludeDates: {
      value: undefined,
      type: PropTypes.Array,
      description: 'A list of dates to disable. Array<Date>',
      hidden: true,
    },
    quickSelect: {
      value: undefined,
      type: PropTypes.Boolean,
      description:
        'Display select for quickly choosing date ranges. range must be true as well.',
    },
    formatString: {
      value: undefined,
      type: PropTypes.String,
      description: 'String format passed to date-fns.',
      placeholder: 'yyyy/MM/dd',
      hidden: true,
    },
    mask: {
      value: undefined,
      type: PropTypes.String,
      description: 'Mask used for the text input. Passed to react-input-mask.',
      placeholder: '9999/99/99',
      hidden: true,
    },
    quickSelectOptions: {
      value: undefined,
      type: PropTypes.Array,
      description:
        'Array of custom options (Array<{ id: string; beginDate: Date; endDate?: Date }>) displayed in the quick select. Overrides default options if provided.',
      hidden: true,
    },
    filterDate: {
      value: undefined,
      type: PropTypes.Function,
      description:
        'A filter function (Date => boolean) that is called to check the disabled state of a day. If false is returned the day is considered to be disabled.',
      hidden: true,
    },
    dateLabel: {
      value: undefined,
      type: PropTypes.Function,
      placeholder: "dateLabel={() => 'Aa'}",
      description:
        'A date label function (Date => Node) that is called with the current date to return a label to be used below the date. If a falsy response is returned, no label will be shown but the taller day will be rendered. ',
      hidden: true,
    },
    startDateLabel: {
      value: undefined,
      type: PropTypes.String,
      hidden: true,
      placeholder: 'Start Date',
      description: '',
    },
    endDateLabel: {
      value: undefined,
      type: PropTypes.String,
      placeholder: 'End Date',
      hidden: true,
      description: '',
    },
    highlightDate: {
      value: undefined,
      type: PropTypes.Date,
      description:
        'Indicates a highlighted date on hover and keyboard navigation',
      hidden: true,
    },
    includesDates: {
      value: undefined,
      type: PropTypes.Array,
      description: 'A list Array<Date> of selectable dates.',
      hidden: true,
    },
    range: {
      value: undefined,
      type: PropTypes.Boolean,
      description: 'Defines if a range of dates can be selected.',
    },
    separateRangeInputs: {
      value: undefined,
      type: PropTypes.Boolean,
      description:
        'Determines if startDate and endDate should be separated into two input fields. Ignored if `range` is not true.',
      hidden: true,
    },
    clearable: {
      value: undefined,
      type: PropTypes.Boolean,
      description:
        'Makes the datepicker clearable via a visual icon in the Input component.',
    },
    positive: inputConfig.props.positive,
    error: inputConfig.props.error,
    size: inputConfig.props.size,
    placeholder: {
      value: undefined,
      type: PropTypes.String,
      description:
        'Specifies a hint that describes the expected value of the date picker',
      placeholder: 'YYYY/MM/DD',
      hidden: true,
    },
    locale: {
      value: undefined,
      type: PropTypes.Object,
      description:
        'A locale object. See date-fns for more details https://github.com/date-fns/date-fns/tree/master/src/locale.',
      hidden: true,
    },
    maxDate: {
      value: undefined,
      type: PropTypes.Date,
      description: 'A max date that is selectable.',
      placeholder: '2020-10-17T07:00:00.000Z',
    },
    minDate: {
      value: undefined,
      type: PropTypes.Date,
      description: 'A min date that is selectable.',
      placeholder: '2018-10-17T07:00:00.000Z',
    },
    monthsShown: {
      value: undefined,
      type: PropTypes.Number,
      description: 'A number of months rendered in the calendar.',
      hidden: true,
    },
    onDayClick: {
      value: undefined,
      type: PropTypes.Function,
      placeholder: '({ date, event }) => {}',
      description: `Day's click event handler.`,
      hidden: true,
    },
    onDayMouseOver: {
      value: undefined,
      type: PropTypes.Function,
      placeholder: '({ date, event }) => {}',
      description: `Day's mouseover event handler.`,
      hidden: true,
    },
    onDayMouseLeave: {
      value: undefined,
      type: PropTypes.Function,
      placeholder: '({ date, event }) => {}',
      description: `Day's mouseleave event handler.`,
      hidden: true,
    },
    onMonthChange: {
      value: undefined,
      type: PropTypes.Function,
      placeholder: '({ date }) => {}',
      description:
        'Event handler that is called when the current rendered month is changed.',
      hidden: true,
    },
    onYearChange: {
      value: undefined,
      type: PropTypes.Function,
      placeholder: '({ date }) => {}',
      description: `Event handler that is called when the current rendered month's year is changed.`,
      hidden: true,
    },
    onClose: {
      value: undefined,
      type: PropTypes.Function,
      placeholder: '() => {}',
      description: `Event handler that is called when the calendar is closed.`,
      hidden: true,
    },
    orientation: {
      value: 'ORIENTATION.vertical',
      defaultValue: 'ORIENTATION.vertical',
      type: PropTypes.Enum,
      options: ORIENTATION,
      description:
        'Sets the orientation of the calendar when multiple months are displayed',
      imports: {
        'baseui/datepicker': {
          named: ['ORIENTATION'],
        },
      },
      hidden: true,
    },
    mountNode: {
      value: undefined,
      type: PropTypes.Ref,
      description: 'Where to mount the datepicker.',
      hidden: true,
    },
    peekNextMonth: {
      value: undefined,
      type: PropTypes.Boolean,
      description:
        'Defines if dates outside of the range of the current month are displayed.',
      hidden: true,
    },
    fixedHeight: {
      value: undefined,
      type: PropTypes.Boolean,
      description:
        'Defines if 6 rows should always be displayed for all the months.',
      hidden: true,
    },
    timeSelectStart: {
      value: undefined,
      type: PropTypes.Boolean,
      description:
        'Determines if TimePicker component will be enabled for start time',
    },
    timeSelectEnd: {
      value: undefined,
      type: PropTypes.Boolean,
      description:
        'Determines if TimePicker component will be enabled for end time',
    },
    disabled: inputConfig.props.disabled,
    displayValueAtRangeIndex: {
      value: 0,
      type: PropTypes.Number,
      description:
        'Determines whether the datepicker displays the start date or end date of the selected date range. Must be 0 or 1.',
      hidden: true,
    },
    trapTabbing: {
      value: undefined,
      type: PropTypes.Boolean,
      description:
        'Defines if tabbing inside the calendar is circled within it.',
      hidden: true,
    },
    overrides: {
      value: undefined,
      type: PropTypes.Custom,
      description: 'Lets you customize all aspects of the component.',
      custom: {
        names: [
          'Root',
          'CalendarContainer',
          'CalendarHeader',
          'Day',
          inputConfig,
          'InputWrapper',
          'Month',
          'MonthContainer',
          'MonthHeader',
          'MonthYearSelectButton',
          'MonthYearSelectIconContainer',
          {...popoverConfig, componentName: 'MonthYearSelectPopover'},
          {...menuConfig, componentName: 'MonthYearSelectStatefulMenu'},
          'NextButton',
          {...iconConfig, componentName: 'NextButtonIcon'},
          {...popoverConfig, componentName: 'Popover'},
          'PrevButton',
          {...iconConfig, componentName: 'PrevButtonIcon'},
          {...selectConfig, componentName: 'QuickSelect'},
          'QuickSelectContainer',
          {...formControlConfig, componentName: 'QuickSelectFormControl'},
          {...timepickerConfig, componentName: 'TimeSelect'},
          'TimeSelectContainer',
          {...formControlConfig, componentName: 'TimeSelectFormControl'},
          'Week',
          'WeekdayHeader',
        ],
        sharedProps: {
          $date: 'value',
          $disabled: {
            type: PropTypes.Boolean,
            description: '',
          },
          $endDate: {
            type: PropTypes.Boolean,
            description: '',
          },
          $endOfMonth: {
            type: PropTypes.Boolean,
            description: '',
          },
          $isHighlighted: {
            type: PropTypes.Boolean,
            description: '',
          },
          $isHovered: {
            type: PropTypes.Boolean,
            description: '',
          },
          $outsideMonth: {
            type: PropTypes.Boolean,
            description: '',
          },
          $peekNextMonth: 'peekNextMonth',
          $pseudoHighlighted: {
            type: PropTypes.Boolean,
            description: '',
          },
          $pseudoSelected: {
            type: PropTypes.Boolean,
            description: '',
          },
          $selected: {
            type: PropTypes.Boolean,
            description: '',
          },
          $startDate: {
            type: PropTypes.Boolean,
            description: '',
          },
          $startOfMonth: {
            type: PropTypes.Boolean,
            description: '',
          },
          $range: 'range',
          $hasRangeHighlighted: {
            type: PropTypes.Boolean,
            description: '',
          },
          $hasRangeOnRight: {
            type: PropTypes.Boolean,
            description: '',
          },
          $hasRangeSelected: {
            type: PropTypes.Boolean,
            description: '',
          },
        },
      },
    },
  },
  mapTokensToProps: {
    Datepicker: datepickerProps,
  },
};

export default DatepickerConfig;
