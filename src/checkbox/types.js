// @flow

export type Placement = 'top' | 'right' | 'bottom' | 'left';

export type Components = {
  Checkmark: any,
  Label: any,
};

export type Props = {
  components: Components,
  checked?: boolean,
  disabled?: boolean,
  $error?: boolean,
  $isFocused?: boolean,
  $isIndeterminate?: boolean,
  $placement?: Placement,
  onChange?: Function,
  onMouseEnter?: Function,
  onMouseLeave?: Function,
  onFocus?: Function,
  onBlur?: Function,
};

export type DefaultProps = {
  checked: boolean,
  disabled: boolean,
  $error: boolean,
  $isFocused: boolean,
  $isIndeterminate: boolean,
  $placement: Placement,
  $inputRef: any,
  onChange: Function,
  onMouseEnter: Function,
  onMouseLeave: Function,
  onFocus: Function,
  onBlur: Function,
};

export type StateType = 'change' | 'focus' | 'blur' | 'hover';

export type State = {
  checked?: string,
  $isFocused?: boolean,
};

export type StateReducer = (
  stateType: string,
  nextState: State,
  currentState: State,
  event: any
) => State;

export type StatefulProps = {
  children: Function,
  initialState?: State,
  stateReducer?: StateReducer,
  onChange?: Function,
  onMouseEnter?: Function,
  onMouseLeave?: Function,
  onFocus?: Function,
  onBlur?: Function,
};

export type DefaultStatefulProps = {
  initialState: State,
  stateReducer: StateReducer,
  onChange: Function,
  onMouseEnter: Function,
  onMouseLeave: Function,
  onFocus: Function,
  onBlur: Function,
};
