import * as React from 'react';
import {StyletronComponent} from 'styletron-react';
import {Override} from '../overrides';

export interface STATE_CHANGE_TYPE {
  change: 'change';
}
export interface ADJOINED {
  none: 'none';
  left: 'left';
  right: 'right';
  both: 'both';
}
export interface SIZE {
  mini: 'mini';
  default: 'default';
  compact: 'compact';
  large: 'large';
}

export interface CUSTOM_INPUT_TYPE {
  textarea: 'textarea';
}

export interface ENHANCER_POSITION {
  start: 'start';
  end: 'end';
}

export interface BaseInputOverrides<T> {
  InputContainer?: Override<T>;
  Input?: Override<T>;
  Before?: Override<T>;
  After?: Override<T>;
}

export interface BaseInputProps<T> {
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  adjoined?: ADJOINED[keyof ADJOINED];
  autoComplete?: string;
  autoFocus?: boolean;
  clearable?: boolean;
  disabled?: boolean;
  error?: boolean;
  positive?: boolean;
  id?: string;
  'data-baseweb'?: string;
  inputMode?: string;
  inputRef?: React.Ref<T>;
  name?: string;
  onBlur?: React.FocusEventHandler<T>;
  onChange?: React.FormEventHandler<T>;
  onKeyDown?: React.KeyboardEventHandler<T>;
  onKeyPress?: React.KeyboardEventHandler<T>;
  onKeyUp?: React.KeyboardEventHandler<T>;
  onFocus?: React.FocusEventHandler<T>;
  overrides?: BaseInputOverrides<SharedProps>;
  placeholder?: string;
  required?: boolean;
  size?: SIZE[keyof SIZE];
  type?: string;
  value?: string | number;
  rows?: number;
  min?: number;
  max?: number;
}

export interface State {
  value?: string | number;
}

export type InputOverrides = BaseInputOverrides<SharedProps> & {
  Root?: Override<SharedProps>;
  StartEnhancer?: Override<SharedProps>;
  EndEnhancer?: Override<SharedProps>;
  ClearIcon?: Override<SharedProps>;
  ClearIconContainer?: Override<SharedProps>;
  MaskToggleButton?: Override<SharedProps>;
  MaskToggleHideIcon?: Override<SharedProps>;
  MaskToggleShowIcon?: Override<SharedProps>;
};

export type SharedProps = {
  /** Renders UI in 'focus' state */
  $isFocused: boolean;
  /** Renders UI in 'disabled' state */
  $disabled: boolean;
  /** Renders UI in 'error' state */
  $error: boolean;
  /** Renders UI in 'positive' state */
  $positive: boolean;
  /** Defines styles for inputs that are grouped with other controls. */
  $adjoined: keyof ADJOINED;
  /** Renders UI in provided size. */
  $size: keyof SIZE;
  /** Renders UI in 'required' state */
  $required: boolean;
  $position: keyof ENHANCER_POSITION;
};

export interface InputProps extends BaseInputProps<HTMLInputElement> {
  startEnhancer?: ((args: SharedProps) => React.ReactNode) | React.ReactNode;
  endEnhancer?: ((args: SharedProps) => React.ReactNode) | React.ReactNode;
  overrides?: InputOverrides;
}

export interface InternalState {
  isFocused?: boolean;
  isMasked?: boolean;
}

export class Input extends React.Component<InputProps, InternalState> {
  onFocus(e: React.FocusEvent<HTMLInputElement>): void;
  onBlur(e: React.FocusEvent<HTMLInputElement>): void;
}

export class BaseInput extends React.Component<
  BaseInputProps<HTMLInputElement>,
  InternalState
> {
  onFocus(e: React.FocusEvent<HTMLInputElement>): void;
  onBlur(e: React.FocusEvent<HTMLInputElement>): void;
}

export interface MaskedInputProps extends InputProps {
  mask?: string;
  maskChar?: string;
}

export const MaskedInput: React.FC<MaskedInputProps>;

export interface StatefulContainerProps {
  children?: React.ReactNode;
  initialState?: State;
  stateReducer?: (
    stateType: STATE_CHANGE_TYPE[keyof STATE_CHANGE_TYPE],
    nextState: State,
    currentState: State,
  ) => State;
  onChange?: React.FormEventHandler<HTMLInputElement>;
}

export type StatefulInputProps = InputProps &
  StatefulContainerProps & {children?: never};

export const StatefulInput: React.FC<StatefulInputProps>;
export const StatefulContainer: React.FC<StatefulContainerProps>;

export const StyledRoot: StyletronComponent<any>;
export const StyledInputEnhancer: StyletronComponent<any>;
export const StyledStartEnhancer: StyletronComponent<any>;
export const StyledEndEnhancer: StyletronComponent<any>;
export const StyledInputContainer: StyletronComponent<any>;
export const StyledInput: StyletronComponent<any>;

export const STATE_CHANGE_TYPE: STATE_CHANGE_TYPE;
export const CUSTOM_INPUT_TYPE: CUSTOM_INPUT_TYPE;
export const ADJOINED: ADJOINED;
export const SIZE: SIZE;
export const ENHANCER_POSITION: ENHANCER_POSITION;
