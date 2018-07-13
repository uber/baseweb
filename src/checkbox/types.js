// @flow

import * as React from 'react';

export type PlacementT = 'top' | 'right' | 'bottom' | 'left';

export type ComponentsT = {
  Checkmark?: React.ComponentType<*>,
  Label?: React.ComponentType<*>,
  Root?: React.ComponentType<*>,
  Input?: React.ComponentType<*>,
};

export type RequiredComponentsT = {
  Checkmark: React.ComponentType<*>,
  Label: React.ComponentType<*>,
  Root: React.ComponentType<*>,
  Input: React.ComponentType<*>,
};

export type DefaultPropsT = {
  checked: boolean,
  disabled: boolean,
  error: boolean,
  isFocused: boolean,
  isIndeterminate: boolean,
  placement: PlacementT,
  inputRef: {current: ?HTMLInputElement},
  label: string,
  onChange: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onMouseEnter: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onMouseLeave: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onFocus: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onBlur: (e: SyntheticInputEvent<HTMLInputElement>) => void,
};

export type PropsT = {
  components: RequiredComponentsT,
  checked?: boolean,
  disabled?: boolean,
  error?: boolean,
  inputRef: {current: ?HTMLInputElement},
  isFocused?: boolean,
  label?: string,
  isIndeterminate?: boolean,
  placement?: PlacementT,
  $theme?: *,
  onChange?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onMouseEnter?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onMouseLeave?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onFocus?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onBlur?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
};

export type StateT = {
  checked?: boolean,
  isFocused?: boolean,
  $isHovered?: boolean,
};

export type StateReducerT = (
  stateType: string,
  nextState: StateT,
  currentState: StateT,
  event: SyntheticInputEvent<HTMLInputElement>,
) => StateT;

export type DefaultStatefulPropsT = {
  initialState: StateT,
  children?: (*) => React.Node,
  stateReducer: StateReducerT,
  onChange: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onMouseEnter: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onMouseLeave: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onFocus: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onBlur: (e: SyntheticInputEvent<HTMLInputElement>) => void,
};

export type StatefulPropsT = {
  components?: ComponentsT,
  children?: (*) => React.Node,
  initialState?: StateT,
  stateReducer: StateReducerT,
  onChange?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onMouseEnter?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onMouseLeave?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onFocus?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onBlur?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
};

export type StatefulCheckboxPropsT = {
  components?: ComponentsT,
  children?: React.ComponentType<*>,
  initialState?: StateT,
  onChange?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onMouseEnter?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onMouseLeave?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onFocus?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onBlur?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
};
