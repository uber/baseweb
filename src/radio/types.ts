/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import type { Override } from '../helpers/overrides';
import { ALIGN } from './constants';

import type { ReactNode, ChangeEvent } from 'react';

export type LabelPlacement = 'top' | 'right' | 'bottom' | 'left';
export type Align = keyof typeof ALIGN;

export type RadioOverrides = {
  RadioMarkInner?: Override;
  RadioMarkOuter?: Override;
  Label?: Override;
  Root?: Override;
  Input?: Override;
  Description?: Override;
};

export type RadioGroupOverrides = {
  RadioGroupRoot?: Override;
};

export type DefaultProps = Partial<RadioGroupProps>;

export type RadioGroupProps = {
  /** Id of element which contains a related caption */
  'aria-describedby'?: string;
  /** Id of element which contains a related error message */
  'aria-errormessage'?: string;
  /**
   * Used to define a string that labels the radio group. Use this prop if the label is not
   * visible on screen. If the label is visible, use the 'aria-labeledby' prop instead.
   */
  'aria-label'?: string;
  /**
   * Establishes a relationship between the radio group and its label. Screen readers use this
   * attribute to catalog the object on a page so that users can navigate between them.
   */
  'aria-labelledby'?: string;
  // This prop will be deprecated in the next major update. Pass overrides to the 'Radio' component instead.
  overrides?: RadioGroupOverrides;
  /** As `children` in React native approach represents radio buttons inside of Radio Group. Can use `Radio` from this package. */
  children?: Array<React.ReactNode>;
  /** The value of radio button, which is preselected. */
  value?: string;
  /** Disabled all radio group from being changed. To disable some of radios provide disabled flag in each of them. */
  disabled?: boolean;
  /** Set if the control is required to be checked. */
  required?: boolean;
  /** Sets radio group into error state. */
  error?: boolean;
  /** Set to be focused (active) on selected\checked radio. */
  autoFocus?: boolean;
  /** How to position radio buttons in the group. */
  align?: Align;
  /** String value for the name of RadioGroup, it is used to group buttons. If missed default is random ID string. */
  name?: string;
  /** How to position the label relative to the radio itself. */
  labelPlacement?: LabelPlacement;
  /** Unique id for RadioGroup, help ARIA to identify element */
  id?: string;
  /** Handler for change events on trigger element. */
  onChange?: (e: ChangeEvent<HTMLInputElement>) => unknown;
  /** Handler for mouseenter events on trigger element. */
  onMouseEnter?: (e: ChangeEvent<HTMLInputElement>) => unknown;
  /** Handler for mouseleave events on trigger element. */
  onMouseLeave?: (e: ChangeEvent<HTMLInputElement>) => unknown;
  /** Handler for focus events on trigger element. */
  onFocus?: (e: ChangeEvent<HTMLInputElement>) => unknown;
  /** Handler for blur events on trigger element. */
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => unknown;
};

export type State = {
  value?: string;
};

export type RadioProps = {
  /** Focus the radio on initial render. */
  autoFocus?: boolean;
  /** How the radio will be displayed along with its description. Controls spacing */
  align?: Align;
  /** Check or uncheck the control. */
  checked?: boolean;
  /** Label of radio. */
  children?: ReactNode;
  /** Indicates if this radio children contain an interactive element (prevents the label from moving focus from the child element to the radio button) */
  containsInteractiveElement?: boolean;
  /** Add more detail about a radio element. */
  description?: string;
  /** Disable the checkbox from being changed. */
  disabled?: boolean;
  /** Used to get a ref to the input element. Useful for programmatically focusing the input */
  inputRef?: React.RefObject<HTMLInputElement>;
  /** Renders checkbox in errored state. */
  error?: boolean;
  /** Is radio focused / active? */
  isFocused?: boolean;
  /** Is parent RadioGroup focused by keyboard? */
  isFocusVisible?: boolean;
  /** How to position the label relative to the checkbox itself. */
  labelPlacement?: 'top' | 'right' | 'bottom' | 'left';
  /** Passed to the input element name attribute */
  name?: string;
  /** handler for blur events on trigger element. */
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => unknown;
  /** Handler for change events on trigger element. */
  onChange?: (e: ChangeEvent<HTMLInputElement>) => unknown;
  /** handler for focus events on trigger element. */
  onFocus?: (e: ChangeEvent<HTMLInputElement>) => unknown;
  /** Handler for mouseenter events on trigger element. */
  onMouseEnter?: (e: ChangeEvent<HTMLInputElement>) => unknown;
  /** Handler for mouseleave events on trigger element. */
  onMouseLeave?: (e: ChangeEvent<HTMLInputElement>) => unknown;
  /** Handler for mousedown events on trigger element. */
  onMouseDown?: (e: ChangeEvent<HTMLInputElement>) => unknown;
  /** Handler for mouseup events on trigger element. */
  onMouseUp?: (e: ChangeEvent<HTMLInputElement>) => unknown;
  overrides?: RadioOverrides;
  /** Marks the checkbox as required. */
  required?: boolean;
  /** Passed to the input element value attribute */
  value?: string;
  /** Passed to the input element, typically managed by RadioGroup */
  tabIndex?: string;
};

export type RadioState = {
  isActive: boolean;
  isHovered: boolean;
};

export type StateReducer = (
  stateType: string,
  nextState: State,
  currentState: State,
  event: ChangeEvent<HTMLInputElement>
) => State;

export type StatelessState = {
  isFocusVisible: boolean;
  focusedRadioIndex: number;
};

export type DefaultStatefulProps = {
  initialState: State;
  children?: (props: RadioGroupProps) => React.ReactNode;
  stateReducer: StateReducer;
  onChange: (e: ChangeEvent<HTMLInputElement>) => unknown;
};

export type StatefulContainerProps = {
  overrides?: RadioGroupOverrides;
  /** Should return `RadioGroup` instance with standard or customized inner elements. */
  children?: (props: RadioGroupProps) => React.ReactNode;
  /** Initial state populated into the component */
  initialState?: State;
  /** Reducer function to manipulate internal state updates. */
  stateReducer: StateReducer;
  /** Handler for change events on trigger element. */
  onChange?: (e: ChangeEvent<HTMLInputElement>) => unknown;
  /** Set to be focused (active) on selected\checked radio. */
  autoFocus?: boolean;
};

export type StatefulRadioGroupProps = {
  overrides?: RadioGroupOverrides;
  /** A list of `Radio` components. */
  children?: Array<React.ReactNode>;
  /** Initial state populated into the component */
  initialState?: State;
  /** Set to be focused (active) on selected\checked radio. */
  autoFocus?: boolean;
  /** Handler for change events on trigger element. */
  onChange?: (e: ChangeEvent<HTMLInputElement>) => unknown;
};

export type StyleProps = {
  $align?: string; // todo(flow->ts): can be improved - 'horizontal'|'vertical' is expected (the values are coming from ALIGN constants)
  $checked: boolean;
  $disabled: boolean;
  $hasDescription: boolean;
  $isActive: boolean;
  $error: boolean;
  $isFocused: boolean;
  $isFocusVisible: boolean;
  $isHovered: boolean;
  $labelPlacement: LabelPlacement;
  $required: boolean;
  $value: string;
};
