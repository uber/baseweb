// @flow

import * as React from 'react';

export type Placement = 'top' | 'right' | 'bottom' | 'left';

export type Components = {
  Checkmark?: React.ComponentType<*>,
  Label?: React.ComponentType<*>,
  Root?: React.ComponentType<*>,
  Input?: React.ComponentType<*>,
};

export type RequiredComponents = {
  Checkmark: React.ComponentType<*>,
  Label: React.ComponentType<*>,
  Root: React.ComponentType<*>,
  Input: React.ComponentType<*>,
};

export type DefaultProps = {
  checked: boolean,
  disabled: boolean,
  $error: boolean,
  $isFocused: boolean,
  $isIndeterminate: boolean,
  $placement: Placement,
  $inputRef: {current: ?HTMLInputElement},
  $label: string,
  onChange: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onMouseEnter: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onMouseLeave: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onFocus: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onBlur: (e: SyntheticInputEvent<HTMLInputElement>) => void,
};

export type Props = {
  components: RequiredComponents,
  checked?: boolean,
  disabled?: boolean,
  $error?: boolean,
  $inputRef: {current: ?HTMLInputElement},
  $isFocused?: boolean,
  $label?: string,
  $isIndeterminate?: boolean,
  $placement?: Placement,
  onChange?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onMouseEnter?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onMouseLeave?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onFocus?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onBlur?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
};

export type StateType = 'change' | 'focus' | 'blur' | 'hover';

export type State = {
  checked?: boolean,
  $isFocused?: boolean,
  $isHovered?: boolean,
};

export type StateReducer = (
  stateType: string,
  nextState: State,
  currentState: State,
  event: SyntheticInputEvent<HTMLInputElement>,
) => State;

export type DefaultStatefulProps = {
  initialState: State,
  children?: (*) => React.Node,
  stateReducer: StateReducer,
  onChange: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onMouseEnter: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onMouseLeave: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onFocus: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onBlur: (e: SyntheticInputEvent<HTMLInputElement>) => void,
};

export type StatefulProps = {
  components?: Components,
  children?: (*) => React.Node,
  initialState?: State,
  stateReducer: StateReducer,
  onChange?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onMouseEnter?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onMouseLeave?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onFocus?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onBlur?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
};

export type StatefulCheckboxProps = {
  components?: Components,
  children?: React.ComponentType<*>,
  initialState?: State,
  onChange?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onMouseEnter?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onMouseLeave?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onFocus?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onBlur?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
};
