import * as React from 'react';
import {Option} from '../select';
import {SIZE} from '../input';
import {Override} from '../overrides';

export interface TimePickerProps {
  format?: '12' | '24';
  onChange?: (args: Date) => any;
  overrides?: {
    Select?: Override<any>;
  };
  positive?: boolean;
  error?: boolean;
  creatable?: boolean;
  disabled?: boolean;
  nullable?: boolean;
  placeholder?: string;
  step?: number;
  value?: Date | null;
  size?: SIZE[keyof SIZE];
}
export interface TimePickerState {
  steps: number[];
  value?: Option;
}
export class TimePicker extends React.Component<
  TimePickerProps,
  TimePickerState
> {
  handleChange(steps: number): void;
  buildSteps(): number[];
  buildSelectedOption(value: Date, format: string): object;
}
