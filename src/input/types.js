// @flow
export type Adjoined = 'none' | 'left' | 'right' | 'both';

export type Size = 'default' | 'compact';

export type StateType = 'change' | 'focus' | 'blur';

export type BaseComponents = {
  Root: any,
  Input: any,
  Before?: ?any,
  After?: ?any,
};

export type Components = {
  Label: any,
  Root: any,
  StartEnhancer: any,
  InputContainer: any,
  Before?: ?any,
  Input: any,
  After?: ?any,
  EndEnhancer: any,
  Caption: any,
};

export type Props = {
  components: BaseComponents,
  type?: string,
  value?: string,
  placeholder?: string,
  disabled?: boolean,
  // $inputRef?: any,
  $isFocused?: boolean,
  $error?: boolean,
  $adjoined?: Adjoined,
  $size?: Size,
  onChange?: Function,
  onFocus?: Function,
  onBlur?: Function,
};

export type DefaultProps = {
  type: string,
  value: string,
  placeholder: string,
  disabled: boolean,
  $inputRef: any,
  $isFocused: boolean,
  $error: boolean,
  $adjoined: Adjoined,
  $size: Size,
  onChange: Function,
  onFocus: Function,
  onBlur: Function,
};

export type State = {
  value?: string,
  $isFocused?: boolean,
};

export type StateReducer = (
  stateType: StateType,
  nextState: State,
  currentState: State,
  event: any
) => State;

export type StatefulProps = {
  children: Function,
  initialState?: State,
  stateReducer?: StateReducer,
  onChange?: Function,
  onFocus?: Function,
  onBlur?: Function,
};

export type DefaultStatefulProps = {
  initialState: State,
  stateReducer: StateReducer,
  onChange: Function,
  onFocus: Function,
  onBlur: Function,
};
