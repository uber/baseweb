// @flow

export type Placement = 'top' | 'right' | 'bottom' | 'left';

export type Components = {
  Checkmark?: any,
  Label?: any,
};

export type Props = {
  components?: Components,
  checked?: boolean,
  disabled?: boolean,
  $error?: boolean,
  $isFocused?: boolean,
  $isIndeterminate?: boolean,
  $placement?: Placement,
  $theme?: any,
  $inputRef?: {current: any},
  onChange?: Function,
  onMouseEnter?: Function,
  onMouseLeave?: Function,
  onFocus?: Function,
  onBlur?: Function,
};

export type DefaultProps = {
  components?: Components,
  checked?: boolean,
  disabled?: boolean,
  $error?: boolean,
  $isFocused?: boolean,
  $isIndeterminate?: boolean,
  $placement?: Placement,
  $theme?: any,
  $inputRef?: {current: any},
  onChange?: Function,
  onMouseEnter?: Function,
  onMouseLeave?: Function,
  onFocus?: Function,
  onBlur?: Function,
};

export type StateType = 'change' | 'focus' | 'blur' | 'hover';

export type State = {
  checked?: string,
  $isFocused?: boolean,
  $isIndeterminate?: boolean,
  $error?: boolean,
};

export type StateReducer = (
  stateType: string,
  nextState: State,
  currentState: State,
  event: any
) => State;

export type StatefulProps = {
  children?: Function,
  initialState?: State,
  stateReducer?: StateReducer,
  disabled?: boolean,
  $placement?: Placement,
  $theme?: any,
  onChange?: Function,
  onMouseEnter?: Function,
  onMouseLeave?: Function,
  onFocus?: Function,
  onBlur?: Function,
};
