import * as React from 'react';
import {StyletronComponent} from 'styletron-react';
import {Override} from '../overrides';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

import {
  SIZE,
  StatefulContainer,
  InputProps,
  InputOverrides,
  StatefulContainerProps,
} from '../input';

export {SIZE, StatefulContainer};

export type PinCodeOverrides = InputOverrides & {
  Root?: Override<any>;
  Input?: Override<any>;
};

export type PinCodeProps = Omit<InputProps, 'onChange' | 'value'> & {
  overrides?: PinCodeOverrides;
  values: string[];
  manageFocus?: boolean;
  onChange: (
    args: {values: string[]; event: React.FormEvent<HTMLInputElement>},
  ) => void;
};

export type StatefulPinCodeProps = Partial<PinCodeProps> &
  StatefulContainerProps & {children?: never; overrides?: PinCodeOverrides};

export const StatefulPinCode: React.FC<StatefulPinCodeProps>;
export class PinCode extends React.Component<PinCodeProps> {}
