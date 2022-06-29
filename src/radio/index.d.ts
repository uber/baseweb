import * as React from 'react';
import { StyletronComponent } from 'styletron-react';
import { Override } from '../overrides';

export declare const STATE_TYPE: {
  change: 'CHANGE';
};

export declare const ALIGN: {
  vertical: 'vertical';
  horizontal: 'horizontal';
};

export type StateReducer = (
  stateType: string,
  nextState: State,
  currentState: State,
  event: React.SyntheticEvent<HTMLInputElement>
) => State;

export interface State {
  value?: string;
}

export interface StatefulContainerProps {
  overrides?: RadioOverrides & RadioGroupOverrides;
  children?: React.ReactNode;
  initialState?: State;
  stateReducer: StateReducer;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  autoFocus?: boolean;
}

export class StatefulContainer extends React.Component<StatefulContainerProps, State> {
  onChange(e: React.ChangeEventHandler<HTMLInputElement>): void;
  stateReducer(type: string, e: React.SyntheticEvent<HTMLInputElement>): void;
}

export interface StatefulRadioGroupProps {
  overrides?: RadioOverrides & RadioGroupOverrides;
  children?: React.ReactNode;
  initialState?: State;
  autoFocus?: boolean;
  name?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  align?: 'horizontal' | 'vertical';
}

export declare const StatefulRadioGroup: React.FC<StatefulRadioGroupProps>;

export interface RadioGroupProps {
  'aria-describedby'?: string;
  'aria-errormessage'?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  overrides?: RadioOverrides & RadioGroupOverrides;
  children?: React.ReactNode;
  value?: string;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  autoFocus?: boolean;
  align?: 'horizontal' | 'vertical';
  name?: string;
  labelPlacement?: 'top' | 'right' | 'bottom' | 'left';
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLInputElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

export class RadioGroup extends React.Component<RadioGroupProps> {}

export interface RadioOverrides {
  RadioMarkInner?: Override<any>;
  RadioMarkOuter?: Override<any>;
  Label?: Override<any>;
  Root?: Override<any>;
  Input?: Override<any>;
  Description?: Override<any>;
}

export interface RadioGroupOverrides {
  RadioGroupRoot?: Override<any>;
}

export interface RadioProps {
  autoFocus?: boolean;
  checked?: boolean;
  children?: React.ReactNode;
  containsInteractiveElement?: boolean;
  description?: string;
  disabled?: boolean;
  inputRef?: React.Ref<HTMLInputElement>;
  error?: boolean;
  isFocused?: boolean;
  isFocusVisible?: boolean;
  labelPlacement?: 'top' | 'right' | 'bottom' | 'left';
  name?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLInputElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onMouseDown?: React.MouseEventHandler<HTMLInputElement>;
  onMouseUp?: React.MouseEventHandler<HTMLInputElement>;
  overrides?: RadioOverrides & RadioGroupOverrides;
  required?: boolean;
  value?: string;
  tabIndex?: string;
}

export interface RadioState {
  isActive: boolean;
  isHovered: boolean;
}

export class Radio extends React.Component<RadioProps, RadioState> {
  onMouseEnter(event: React.MouseEvent<HTMLInputElement>): void;
  onMouseLeave(event: React.MouseEvent<HTMLInputElement>): void;
  onMouseDown(event: React.MouseEvent<HTMLInputElement>): void;
  onMouseUp(event: React.MouseEvent<HTMLInputElement>): void;
  onFocus(event: React.FocusEvent<HTMLInputElement>): void;
  onBlur(event: React.FocusEvent<HTMLInputElement>): void;
}

export declare const StyledRoot: StyletronComponent<any, any>;
export declare const StyledLabel: StyletronComponent<any, any>;
export declare const StyledInput: StyletronComponent<any, any>;
export declare const StyledDescription: StyletronComponent<any, any>;
export declare const StyledRadioMarkInner: StyletronComponent<any, any>;
export declare const StyledRadioMarkOuter: StyletronComponent<any, any>;
export declare const StyledRadioGroupRoot: StyletronComponent<any, any>;
