import * as React from 'react';
import { StyletronComponent } from 'styletron-react';
import { Override } from '../overrides';

export declare const STATE_TYPE: {
  change: 'CHANGE';
};
export declare const STYLE_TYPE: {
  default: 'default';
  toggle: 'toggle';
  toggle_round: 'toggle';
};

export declare const LABEL_PLACEMENT: {
  top: 'top';
  right: 'right';
  bottom: 'bottom';
  left: 'left';
};

type initialState = {
  checked?: boolean;
  isIndeterminate?: boolean;
};

export declare const StyledRoot: StyletronComponent<any>;
export declare const StyledCheckmark: StyletronComponent<any>;
export declare const StyledLabel: StyletronComponent<any>;
export declare const StyledInput: StyletronComponent<any>;
export declare const StyledToggle: StyletronComponent<any>;
export declare const StyledToggleInner: StyletronComponent<any>;
export declare const StyledToggleTrack: StyletronComponent<any>;

export type StateReducer = (
  stateType: string,
  nextState: CheckboxState,
  currentState: CheckboxState,
  event: React.SyntheticEvent<HTMLInputElement>
) => CheckboxState;

export interface StatefulContainerProps {
  overrides?: CheckboxOverrides;
  children?: React.ReactNode;
  initialState?: CheckboxState;
  stateReducer?: StateReducer;
  onChange?: React.FormEventHandler<HTMLInputElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLInputElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  autoFocus?: boolean;
}

export declare const StatefulContainer: React.FC<StatefulContainerProps>;

export interface StatefulCheckboxProps {
  overrides?: CheckboxOverrides;
  disabled?: boolean;
  error?: boolean;
  containsInteractiveElement?: boolean;
  labelPlacement?: 'top' | 'right' | 'bottom' | 'left';
  inputRef?: React.Ref<HTMLInputElement>;
  isIndeterminate?: boolean;
  children?: React.ReactNode;
  initialState?: initialState;
  autoFocus?: boolean;
  checkmarkType?: typeof STYLE_TYPE[keyof typeof STYLE_TYPE];
  onChange?: React.FormEventHandler<HTMLInputElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLInputElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

export declare const StatefulCheckbox: React.FC<StatefulCheckboxProps>;

export interface CheckboxOverrides {
  Checkmark?: Override<any>;
  Label?: Override<any>;
  Root?: Override<any>;
  Input?: Override<any>;
  Toggle?: Override<any>;
  ToggleInner?: Override<any>;
  ToggleTrack?: Override<any>;
}

export interface CheckboxProps {
  'aria-describedby'?: string;
  'aria-errormessage'?: string;
  children?: React.ReactNode;
  containsInteractiveElement?: boolean;
  overrides?: CheckboxOverrides;
  checked?: boolean;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  inputRef?: React.Ref<HTMLInputElement>;
  autoFocus?: boolean;
  type?: string;
  name?: string;
  value?: string;
  isIndeterminate?: boolean;
  labelPlacement?: 'top' | 'right' | 'bottom' | 'left';
  checkmarkType?: typeof STYLE_TYPE[keyof typeof STYLE_TYPE];
  title?: string;
  ariaLabel?: string;
  'aria-label'?: string;
  onChange?: React.FormEventHandler<HTMLInputElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLInputElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onMouseDown?: React.MouseEventHandler<HTMLInputElement>;
  onMouseUp?: React.MouseEventHandler<HTMLInputElement>;
}

export interface CheckboxState {
  isFocused: boolean;
  isHovered: boolean;
  isActive: boolean;
}

export class Checkbox extends React.Component<CheckboxProps, CheckboxState> {
  onMouseEnter(event: React.MouseEvent<HTMLInputElement>): void;
  onMouseLeave(event: React.MouseEvent<HTMLInputElement>): void;
  onMouseDown(event: React.MouseEvent<HTMLInputElement>): void;
  onMouseUp(event: React.MouseEvent<HTMLInputElement>): void;
  onFocus(event: React.FocusEvent<HTMLInputElement>): void;
  onBlur(event: React.FocusEvent<HTMLInputElement>): void;
}
