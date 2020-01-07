import * as React from 'react';
import {Option} from '../select';
import {SIZE} from '../input';
import {Override} from '../overrides';

export interface Timezone {
  id: string;
  label: string;
  offset: number;
}

export interface TimezonePickerProps {
  date?: Date;
  disabled?: boolean;
  positive?: boolean;
  error?: boolean;
  mapLabels?: (args: Option) => React.ReactNode;
  onChange?: (value: Timezone) => any;
  overrides?: {Select?: Override<any>};
  value?: string;
  size?: SIZE[keyof SIZE];
}
export interface TimezonePickerState {
  timezones: Option[];
  value?: string;
}
export class TimezonePicker extends React.Component<
  TimezonePickerProps,
  TimezonePickerState
> {
  buildTimezones(compareDate: Date): string[];
}
