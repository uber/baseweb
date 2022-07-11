import * as React from 'react';
import { Override } from '../overrides';

import { SIZE, InputProps, InputOverrides, STATE_CHANGE_TYPE } from '../input';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export { SIZE };

export type PinCodeOverrides = InputOverrides & {
  Root?: Override<any>;
  Input?: Override<any>;
};

export type PinCodeProps = Omit<InputProps, 'onChange' | 'value'> & {
  overrides?: PinCodeOverrides;
  values: string[];
  manageFocus?: boolean;
  mask?: boolean | string;
  onChange: (args: { values: string[]; event: React.FormEvent<HTMLInputElement> }) => void;
};

export type State = {
  values: string[];
};

export interface StatefulContainerProps {
  children?: React.ReactNode;
  initialState?: State;
  stateReducer?: (
    type: typeof STATE_CHANGE_TYPE[keyof typeof STATE_CHANGE_TYPE],
    nextState: State,
    currentState: State
  ) => State;
  onChange?: (args: { values: string[]; event: React.FormEvent<HTMLInputElement> }) => void;
}

export type StatefulPinCodeProps = Partial<PinCodeProps> &
  StatefulContainerProps & { children?: never; overrides?: PinCodeOverrides };

export declare const StatefulPinCode: React.FC<StatefulPinCodeProps>;
export declare const StatefulContainer: React.FC<StatefulContainerProps>;
export class PinCode extends React.Component<PinCodeProps> {}
