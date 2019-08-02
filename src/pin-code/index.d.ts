import * as React from 'react';
import {StyletronComponent} from 'styletron-react';
import {Override} from '../overrides';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

import {SIZE, InputProps, InputOverrides, STATE_CHANGE_TYPE} from '../input';

export {SIZE};

export type PinCodeOverrides = InputOverrides & {
  Root?: Override<any>;
  Input?: Override<any>;
};

export type PinCodeProps = Omit<InputProps, 'onChange' | 'value'> & {
  overrides?: PinCodeOverrides;
  values: string[];
  manageFocus?: boolean;
  onChange: (args: {
    values: string[];
    event: React.FormEvent<HTMLInputElement>;
  }) => void;
};

export type State = {
  values: string[];
};

export interface StatefulContainerProps {
  children?: React.ReactNode;
  initialState?: State;
  stateReducer?: (
    type: STATE_CHANGE_TYPE[keyof STATE_CHANGE_TYPE],
    nextState: State,
    currentState: State,
  ) => State;
  onChange?: (args: {
    values: string[];
    event: React.FormEvent<HTMLInputElement>;
  }) => void;
}

export type StatefulPinCodeProps = Partial<PinCodeProps> &
  StatefulContainerProps & {children?: never; overrides?: PinCodeOverrides};

export const StatefulPinCode: React.FC<StatefulPinCodeProps>;
export const StatefulContainer: React.FC<StatefulContainerProps>;
export class PinCode extends React.Component<PinCodeProps> {}
