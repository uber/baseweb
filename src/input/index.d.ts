import * as React from 'react';
import { StyletronComponent } from 'styletron-react';
import { Override } from '../overrides';

export declare const STATE_CHANGE_TYPE: {
  change: 'change';
};
export declare const ADJOINED: {
  none: 'none';
  left: 'left';
  right: 'right';
  both: 'both';
};
export declare const SIZE: {
  mini: 'mini';
  default: 'default';
  compact: 'compact';
  large: 'large';
};

export declare const CUSTOM_INPUT_TYPE: {
  textarea: 'textarea';
};

export declare const ENHANCER_POSITION: {
  start: 'start';
  end: 'end';
};

export interface BaseInputOverrides<T> {
  InputContainer?: Override<T>;
  Input?: Override<T>;
  Before?: Override<T>;
  After?: Override<T>;
}

export interface BaseInputProps<T> {
  'aria-errormessage'?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  adjoined?: typeof ADJOINED[keyof typeof ADJOINED];
  autoComplete?: string;
  autoFocus?: boolean;
  clearable?: boolean;
  clearOnEscape?: boolean;
  maxLength?: number;
  disabled?: boolean;
  error?: boolean;
  positive?: boolean;
  id?: string;
  'data-baseweb'?: string;
  inputMode?: string;
  pattern?: string;
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
  size?: typeof SIZE[keyof typeof SIZE];
  type?: string;
  value?: string | number;
  rows?: number;
  min?: number;
  max?: number;
  step?: number | 'any';
  readOnly?: boolean;
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
  /** Renders UI in 'readOnly' state */
  $isReadOnly: boolean;
  /** Renders UI in 'disabled' state */
  $disabled: boolean;
  /** Renders UI in 'error' state */
  $error: boolean;
  /** Renders UI in 'positive' state */
  $positive: boolean;
  /** Defines styles for inputs that are grouped with other controls. */
  $adjoined: typeof ADJOINED[keyof typeof ADJOINED];
  /** Renders UI in provided size. */
  $size: typeof SIZE[keyof typeof SIZE];
  /** Renders UI in 'required' state */
  $required: boolean;
  $position: typeof ENHANCER_POSITION[keyof typeof ENHANCER_POSITION];
  /** Defines if has a clearable or MaskToggleButton at the end */
  $hasIconTrailing: boolean;
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

export class BaseInput extends React.Component<BaseInputProps<HTMLInputElement>, InternalState> {
  onFocus(e: React.FocusEvent<HTMLInputElement>): void;
  onBlur(e: React.FocusEvent<HTMLInputElement>): void;
}

export interface MaskedInputProps extends InputProps {
  mask?: string;
  maskChar?: string;
}

export declare const MaskedInput: React.FC<MaskedInputProps>;

export interface StatefulContainerProps {
  children?: React.ReactNode;
  initialState?: State;
  stateReducer?: (
    stateType: typeof STATE_CHANGE_TYPE[keyof typeof STATE_CHANGE_TYPE],
    nextState: State,
    currentState: State
  ) => State;
  onChange?: React.FormEventHandler<HTMLInputElement>;
}

export type StatefulInputProps = InputProps & StatefulContainerProps & { children?: never };

export declare const StatefulInput: React.FC<StatefulInputProps>;
export declare const StatefulContainer: React.FC<StatefulContainerProps>;

export declare const StyledRoot: StyletronComponent<any>;
export declare const StyledInputEnhancer: StyletronComponent<any>;
export declare const StyledStartEnhancer: StyletronComponent<any>;
export declare const StyledEndEnhancer: StyletronComponent<any>;
export declare const StyledInputContainer: StyletronComponent<any>;
export declare const StyledInput: StyletronComponent<any>;
