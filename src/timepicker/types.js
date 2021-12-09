/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* eslint-disable flowtype/generic-spacing */
import type {OverrideT} from '../helpers/overrides.js';
import type {OptionT} from '../select/index.js';
import type {SizeT} from '../input/types.js';
import type {DateIOAdapter} from '../datepicker/utils/types.js';

export type TimePickerPropsT<T = Date> = {
  /** Render options in AM/PM format or 24 hour format. Defaults to 12 hour. */
  adapter: DateIOAdapter<T>,
  format?: '12' | '24',
  /** Callback for when time selection changes. */
  onChange?: (T | null) => mixed,
  overrides?: {
    Select?: OverrideT,
  },
  /** Set to true to allow times that aren't displayed in the options list to be entered manually. Defaults to false. */
  creatable?: boolean,
  /** Amount of seconds between each option time. Defaults to 900 (15 minutes). */
  step?: number,
  /**
   * Optional value that can be provided to fully control the component. If not provided, TimePicker
   * will manage state internally and default to the closest step to new Date().
   */
  value?: ?T,
  disabled?: boolean,
  error?: boolean,
  positive?: boolean,
  nullable?: boolean,
  placeholder?: string,
  size?: SizeT,
  minTime?: T,
  maxTime?: T,
  /**
   * There are two strategies available for setting min/max times. If the min/max datetimes are
   * beyond the start/end times of the current value's date, Timepicker could either clamp the
   * min/max time of the start/end of the day or it can ignore the min/max date components and
   * only apply the time components. Each strategy has the potential to save developer time in
   * avoiding the need to perform conversion before providing min/max datetimes to the component.
   * By default the component will clamp the time window and setting this flag will ignore dates.
   */
  ignoreMinMaxDateComponent?: boolean,
};
export type TimePickerStateT = {
  /** List of times (in seconds) displayed in the dropdown menu. */
  steps: number[],
  /** Internal value of the selected time as an integer since midnight (0) */
  value: ?OptionT,
};

export type TimePickerDefaultPropsT = {
  format: '12',
  step: 900,
  creatable: false,
  adapter: DateIOAdapter<Date>,
  ignoreMinMaxDateComponent: false,
};
