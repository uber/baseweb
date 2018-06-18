// @flow

export type Placement = 'top' | 'right' | 'bottom' | 'left';

export type Components = {
  Checkmark?: any,
  Label?: any,
  Root?: any,
  Input?: any,
};

export type DefaultProps = {
  checked: boolean,
  disabled: boolean,
  $error: boolean,
  $isFocused: boolean,
  $isIndeterminate: boolean,
  $placement: Placement,
  $inputRef: any,
  $label: string,
  onChange: Function,
  onMouseEnter: Function,
  onMouseLeave: Function,
  onFocus: Function,
  onBlur: Function,
};

export type Props = {
  components: Components,
  checked?: boolean,
  disabled?: boolean,
  $error?: boolean,
  $inputRef: any,
  $isFocused?: boolean,
  $label?: string,
  $isIndeterminate?: boolean,
  $placement?: Placement,
  onChange?: Function,
  onMouseEnter?: Function,
  onMouseLeave?: Function,
  onFocus?: Function,
  onBlur?: Function,
  onKeyPress?: Function,
};

export type StateType = 'change' | 'focus' | 'blur' | 'hover';

export type State = {
  checked?: string,
  $isFocused?: boolean,
  $isHovered?: boolean,
};

export type StateReducer = (
  stateType: string,
  nextState: State,
  currentState: State,
  event: any
) => State;

export type DefaultStatefulProps = {
  initialState: State,
  stateReducer: StateReducer,
  onChange: Function,
  onMouseEnter: Function,
  onMouseLeave: Function,
  onFocus: Function,
  onBlur: Function,
};

export type StatefulProps = {
  components?: Components,
  children?: Function,
  initialState?: State,
  stateReducer?: StateReducer,
  onChange?: Function,
  onMouseEnter?: Function,
  onMouseLeave?: Function,
  onFocus?: Function,
  onBlur?: Function,
};
