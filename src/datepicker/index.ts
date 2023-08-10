/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type { CalendarInternalState, SharedStyleProps, StatefulContainerProps } from './types';

export { default as StatefulContainer } from './stateful-container';
export { default as Calendar } from './calendar';
export { default as StatefulCalendar } from './stateful-calendar';
export { default as Datepicker, default as DatePicker } from './datepicker';
export {
  default as StatefulDatepicker,
  default as StatefulDatePicker,
} from './stateful-datepicker';
// Util functions
export { formatDate } from './utils';
// Constants
export { DENSITY, ORIENTATION, RANGED_CALENDAR_BEHAVIOR, STATE_CHANGE_TYPE } from './constants';
// Styled elements
export * from './styled-components';
// Dependency components and their types
export * from '../timepicker';
export * from '../timezonepicker';
// Flow
export * from './types';
export type { DatepickerLocale } from './locale';
/** @deprecated use SharedStyleProps instead. To be removed in future versions.*/
export type SharedStylePropsT = SharedStyleProps;
/** @deprecated To be removed in future versions */
// eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-explicit-any
type onChange = StatefulContainerProps<any>['onChange'];
/** @deprecated To be removed in future versions */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type CalendarState = CalendarInternalState<Date>;
