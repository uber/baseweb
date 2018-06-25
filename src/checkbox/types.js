// @flow

import * as React from 'react';

export type Placement = 'top' | 'right' | 'bottom' | 'left';

export type Components = {
  Checkmark?: React.ComponentType<>,
  Label?: React.ComponentType<>,
  Root?: React.ComponentType<>,
  Input?: React.ComponentType<>,
};

export type RequiredComponents = {
  Checkmark: React.ComponentType<>,
  Label: React.ComponentType<>,
  Root: React.ComponentType<>,
  Input: React.ComponentType<>,
};

export type DefaultProps = {
  checked: boolean,
  disabled: boolean,
  $error: boolean,
  $isFocused: boolean,
  $isIndeterminate: boolean,
  $placement: Placement,
  $inputRef: React.Node,
  $label: string,
  onChange: (e: Event) => {},
  onMouseEnter: (e: Event) => {},
  onMouseLeave: (e: Event) => {},
  onFocus: (e: Event) => {},
  onBlur: (e: Event) => {},
};

export type Props = {
  components: RequiredComponents,
  checked?: boolean,
  disabled?: boolean,
  $error?: boolean,
  $inputRef: React.Node,
  $isFocused?: boolean,
  $label?: string,
  $isIndeterminate?: boolean,
  $placement?: Placement,
  onChange?: (e: Event) => {},
  onMouseEnter?: (e: Event) => {},
  onMouseLeave?: (e: Event) => {},
  onFocus?: (e: Event) => {},
  onBlur?: (e: Event) => {},
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
  event: Event,
) => State;

export type DefaultStatefulProps = {
  initialState: State,
  stateReducer: StateReducer,
  onChange: (e: Event) => {},
  onMouseEnter: (e: Event) => {},
  onMouseLeave: (e: Event) => {},
  onFocus: (e: Event) => {},
  onBlur: (e: Event) => {},
};

export type StatefulProps = {
  components?: Components,
  children?: React.ComponentType<>,
  initialState?: State,
  stateReducer: StateReducer,
  onChange?: (e: Event) => {},
  onMouseEnter?: (e: Event) => {},
  onMouseLeave?: (e: Event) => {},
  onFocus?: (e: Event) => {},
  onBlur?: (e: Event) => {},
};

export type StatefulCheckboxProps = {
  components?: Components,
  children?: React.ComponentType<>,
  initialState?: State,
  onChange?: (e: Event) => {},
  onMouseEnter?: (e: Event) => {},
  onMouseLeave?: (e: Event) => {},
  onFocus?: (e: Event) => {},
  onBlur?: (e: Event) => {},
};
