/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import type { Override } from '../helpers/overrides';
import { SIZE, STATE_CHANGE_TYPE } from '../input';

export type ChangeEvent = {
  values: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  event: any;
};

export type PinCodeOverrides = {
  Root?: Override;
  Input?: Override;
};
export type PinCodeProps = {
  /** Sets aria-label attribute for each input element. */
  'aria-label': string | undefined | null;
  /** Sets aria-labelledby attribute for each input element. */
  'aria-labelledby': string | undefined | null;
  /** Sets aria-describedby attribute for each input element. */
  'aria-describedby': string | undefined | null;
  /** Sets autocomplete attribute for each input element. */
  autoComplete: string | undefined | null;
  /** If true, the first input will be focused upon mounting. */
  autoFocus: boolean;
  /** Render the component in a disabled state. */
  disabled: boolean;
  /** Renders the component in an error state. */
  error: boolean;
  /** Sets the base id string that will be applied to the id attribute of each input element. The index of the input will be appended to this base string. Ex: `id="foo"` -> `id="foo-1"`, `id="foo-2",` etc... */
  id: string | undefined | null;
  /** Sets the name attribute of each input element. */
  name: string | undefined | null;
  /** A handler for when any pin code input changes value. */
  onChange: (a: ChangeEvent) => unknown;
  overrides: PinCodeOverrides;
  /** Sets the placeholder text for each pin code input element. */
  placeholder: string;
  /** Renders the component in a positive state. */
  positive: boolean;
  /** Sets the required attribute of each pin code input element. */
  required: boolean;
  /** Renders the component at a given size. */
  size: keyof typeof SIZE;
  /** If true, when a pin code input receives a valid value, focus will be transferred to the next pin code input (until the end of the inputs). */
  manageFocus: boolean;
  /** An array of values respective to each pin code input. */
  values: string[];
  /** Mask for pin code. Default is no mask. Set it true then mask is ".". Also accept string input as customized mask style. */
  mask: boolean | string;
};

// Stateful stuff below

export type State = {
  hasFocus: boolean;
};

export type StatefulPinCodeContainerState = {
  values: string[];
};

export type StateChange = keyof typeof STATE_CHANGE_TYPE;

export type StateReducer = (
  type: StateChange,
  nextState: StatefulPinCodeContainerState,
  currentState: StatefulPinCodeContainerState
) => StatefulPinCodeContainerState;

export type StatefulPinCodeProps = PinCodeProps & {
  initialState?: StatefulPinCodeContainerState;
  onChange?: (event: ChangeEvent) => unknown;
  stateReducer?: StateReducer;
};

export type StatefulPinCodeContainerProps = PinCodeProps & {
  children: (a: PinCodeProps) => React.ReactNode;
  initialState: StatefulPinCodeContainerState;
  onChange: (event: ChangeEvent) => unknown;
  stateReducer: StateReducer;
};
