/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import type * as React from 'react';
import type { Override } from '../helpers/overrides';
import type { STATE_CHANGE_TYPE } from './constants';

export type AccordionState = {
  expanded: Array<React.Key>;
};

export type PanelState = {
  expanded: boolean;
};

export type StateChangeType = keyof typeof STATE_CHANGE_TYPE;

export type StateReducer = (
  stateChangeType: StateChangeType,
  nextState: AccordionState,
  currentState: AccordionState
) => AccordionState;

export type PanelStateReducer = (
  stateChangeType: StateChangeType,
  nextState: PanelState,
  currentState: PanelState
) => PanelState;

export type AccordionOverrides = {
  Content?: Override;
  ContentAnimationContainer?: Override;
  Header?: Override;
  PanelContainer?: Override;
  Root?: Override;
  ToggleIcon?: Override;
  ToggleIconGroup?: Override;
};

export type PanelOverrides = {
  PanelContainer?: Override;
  Header?: Override;
  ToggleIcon?: Override;
  ToggleIconGroup?: Override;
  Content?: Override;
  ContentAnimationContainer?: Override;
};

export type OnChangeHandler = (a: { expanded: boolean }) => unknown;

export type AccordionOnChangeHandler = (a: { expanded: Array<React.Key> }) => unknown;

export type AccordionProps = {
  /** Determines how many panels may be expanded at a time. If set to
   * true it will collapse a current panel when a new panel is expanded.
   * If set to false more than one panel may be expanded at a time. */
  accordion?: boolean;
  /** Accordion expandable items. See Panel API below for reference. */
  children: React.ReactNode;
  /** If set to true all its children panels will be disabled from toggling. */
  disabled?: boolean;
  initialState?: AccordionState;
  /** Handler called each time a panel is toggled. expanded prop is an array
   * of Panel keys that are currently expanded. */
  onChange?: AccordionOnChangeHandler;
  overrides?: AccordionOverrides;
  /** Handler called each time the component state changes.
   * Used to override default state-change functionality. */
  stateReducer: StateReducer;
  /**
   * Allows users to render all child content whether a panel is expanded or not
   * for SEO purposed
   */
  renderAll?: boolean;
};

export type StatelessAccordionOnChangeHandler = (a: {
  expanded: Array<React.Key>;
  key: React.Key;
}) => unknown;

export type StatelessAccordionProps = {
  /** Determines how many panels may be expanded at a time. If set to
   * true it will collapse a current panel when a new panel is expanded.
   * If set to false more than one panel may be expanded at a time. */
  accordion?: boolean;
  /** Accordion expandable items. See Panel API below for reference. */
  children: React.ReactNode;
  /** If set to true all its children panels will be disabled from toggling. */
  disabled?: boolean;
  /** List of Panel keys which are expanded. */
  expanded: Array<React.Key>;
  /** Handler called each time a panel is toggled. */
  onChange?: StatelessAccordionOnChangeHandler;
  overrides?: AccordionOverrides & PanelOverrides;
  /**
   * Allows users to render all child content whether a panel is expanded or not
   * for SEO purposed
   */
  renderPanelContent?: boolean;
  /**
   * Allows users to render all child content whether a panel is expanded or not
   * for SEO purposed
   */
  renderAll?: boolean;
};

type SharedPanelProps = {
  /** The content visible when Panel is expanded. */
  children?: React.ReactNode;
  /** Defaults to the disabled value provided by the parent Accordion component. */
  disabled?: boolean;
  /** Id for a panel, when provided populates aria-controls
   * attribute for panel button and content
   * */
  'aria-controls'?: string;
  /** The key of a Panel. Used to maintain list of expanded panels.
   * Must be unique across children of the Accordion. */
  key?: React.Key;
  /** Handler for individual Panel change events. */
  onChange?: OnChangeHandler;
  /** Handler for the Header's click events. */
  onClick?: (e: Event) => unknown;
  /** Handler for the Header's keyDown events. */
  onKeyDown?: (e: KeyboardEvent) => unknown;
  /** Handler for when the Panel is fully opened. */
  onPanelOpened?: () => unknown;
  overrides?: PanelOverrides;
  /** The title of an accordion panel. */
  title?: React.ReactNode;
  /**
   * Allows users to render all child content whether a panel is expanded or not
   * for SEO purposed
   */
  renderPanelContent?: boolean;
  /**
   * Allows users to render all child content whether a panel is expanded or not
   * for SEO purposed
   */
  renderAll?: boolean;
};

export type PanelProps = SharedPanelProps & {
  /** Defines if the panel is expanded. If set to true the panel is rendered expanded. */
  expanded?: boolean;
};

// Props for panel stateful container
type SharedStatefulPanelContainerProps = {
  /** Initial state of a stateful panel component.
   * The expanded prop indicates if the panel is initially expanded.
   * If set to true the panel will be expanded initially */
  initialState?: PanelState;
  onChange?: OnChangeHandler;
  stateReducer?: PanelStateReducer;
};

export type StatefulPanelContainerProps = SharedStatefulPanelContainerProps & {
  children: (props: Omit<PanelProps, 'children'>) => React.ReactNode;
};

// Props for stateful panel
export type StatefulPanelProps = SharedStatefulPanelContainerProps & SharedPanelProps;

export type SharedStylePropsArg = {
  $color?: string;
  $disabled: boolean | undefined | null;
  $expanded?: boolean | null;
  $size?: string | number;
  $isFocusVisible: boolean;
};
