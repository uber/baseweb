// @flow

import * as React from 'react';

export type LabelPlacementT = 'top' | 'right' | 'bottom' | 'left';

export type ComponentsT = {
  Checkmark?: React.ComponentType<*>,
  Label?: React.ComponentType<*>,
  Root?: React.ComponentType<*>,
  Input?: React.ComponentType<*>,
};

export type RequiredComponentsT = {
  Checkmark?: React.ComponentType<*>,
  Label?: React.ComponentType<*>,
  Root?: React.ComponentType<*>,
  Input?: React.ComponentType<*>,
};

export type DefaultPropsT = {
  checked: boolean,
  disabled: boolean,
  isError: boolean,
  autoFocus: boolean,
  isIndeterminate: boolean,
  labelPlacement: LabelPlacementT,
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
  required?: boolean,
  isError?: boolean,
  inputRef: {current: ?HTMLInputElement},
  autoFocus?: boolean,
  label?: string,
  isIndeterminate?: boolean,
  labelPlacement?: LabelPlacementT,
  $theme?: *,
  onChange?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onMouseEnter: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onMouseLeave: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onFocus: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onBlur: (e: SyntheticInputEvent<HTMLInputElement>) => void,
};

export type StatelessStateT = {
  isFocused: boolean,
  isHovered: boolean,
};

export type StateT = {
  checked?: boolean,
  isIndeterminate?: boolean,
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

export type StatefulContainerPropsT = {
  components?: ComponentsT,
  children?: (*) => React.Node,
  initialState?: StateT,
  stateReducer: StateReducerT,
  onChange?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onMouseEnter?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onMouseLeave?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onFocus?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onBlur?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  autoFocus?: boolean,
};

export type StatefulCheckboxPropsT = {
  components?: ComponentsT,
  children?: React.ComponentType<*>,
  initialState?: StateT,
  autoFocus?: boolean,
  onChange?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onMouseEnter?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onMouseLeave?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onFocus?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onBlur?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
};
