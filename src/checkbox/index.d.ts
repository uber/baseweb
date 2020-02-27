import * as React from 'react';
import {StyletronComponent} from 'styletron-react';
import {Override} from '../overrides';

export interface STATE_TYPE {
  change: 'CHANGE';
}
export interface STYLE_TYPE {
  default: 'default';
  toggle: 'toggle';
  toggle_round: 'toggle_round';
}

export interface LABEL_PLACEMENT {
  top: 'top';
  right: 'right';
  bottom: 'bottom';
  left: 'left';
}

type initialState = {
  checked?: boolean;
  isIndeterminate?: boolean;
};

export const StyledRoot: StyletronComponent<any>;
export const StyledCheckmark: StyletronComponent<any>;
export const StyledLabel: StyletronComponent<any>;
export const StyledInput: StyletronComponent<any>;
export const StyledToggle: StyletronComponent<any>;
export const StyledToggleInner: StyletronComponent<any>;
export const StyledToggleTrack: StyletronComponent<any>;

export type StateReducer = (
  stateType: string,
  nextState: CheckboxState,
  currentState: CheckboxState,
  event: React.SyntheticEvent<HTMLInputElement>,
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

export const StatefulContainer: React.FC<StatefulContainerProps>;

export interface StatefulCheckboxProps {
  overrides?: CheckboxOverrides;
  disabled?: boolean;
  isError?: boolean;
  labelPlacement?: 'top' | 'right' | 'bottom' | 'left';
  inputRef?: React.Ref<HTMLInputElement>;
  isIndeterminate?: boolean;
  children?: React.ReactNode;
  initialState?: initialState;
  autoFocus?: boolean;
  checkmarkType?: STYLE_TYPE[keyof STYLE_TYPE];
  onChange?: React.FormEventHandler<HTMLInputElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLInputElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

export const StatefulCheckbox: React.FC<StatefulCheckboxProps>;

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
  overrides?: CheckboxOverrides;
  checked?: boolean;
  disabled?: boolean;
  required?: boolean;
  isError?: boolean;
  inputRef?: React.Ref<HTMLInputElement>;
  autoFocus?: boolean;
  type?: string;
  name?: string;
  value?: string;
  isIndeterminate?: boolean;
  labelPlacement?: 'top' | 'right' | 'bottom' | 'left';
  checkmarkType?: STYLE_TYPE[keyof STYLE_TYPE];
  title?: string;
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

export const STATE_TYPE: STATE_TYPE;
export const STYLE_TYPE: STYLE_TYPE;
export const LABEL_PLACEMENT: LABEL_PLACEMENT;
