/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* eslint-disable flowtype/generic-spacing */
import * as React from 'react';
import type {OverrideT} from '../helpers/overrides.js';
import {STATE_CHANGE_TYPE} from './constants.js';

export type AccordionStateT = {
  expanded: Array<React.Key>,
};

export type PanelStateT = {
  expanded: boolean,
};

export type StateChangeTypeT = $Keys<typeof STATE_CHANGE_TYPE>;

export type StateReducerT = (
  stateChangeType: StateChangeTypeT,
  nextState: AccordionStateT,
  currentState: AccordionStateT,
) => AccordionStateT;

export type PanelStateReducerT = (
  stateChangeType: StateChangeTypeT,
  nextState: PanelStateT,
  currentState: PanelStateT,
) => PanelStateT;

export type AccordionOverridesT<T> = {
  Root?: OverrideT<T>,
};

export type PanelOverridesT<T> = {
  PanelContainer?: OverrideT<T>,
  Header?: OverrideT<T>,
  ToggleIcon?: OverrideT<T>,
  Content?: OverrideT<T>,
};

export type OnChangeHandlerT = ({expanded: boolean}) => mixed;

export type AccordionOnChangeHandlerT = ({
  expanded: Array<React.Key>,
}) => mixed;

type ChildrenT = React.ChildrenArray<React.Element<*>>;

export type AccordionPropsT = {
  /** Determines how many panels may be expanded at a time. If set to
   * true it will collapse a current panel when a new panel is expanded.
   * If set to false more than one panel may be expanded at a time. */
  accordion?: boolean,
  /** Accordion expandable items. See Panel API below for reference. */
  children: ChildrenT,
  /** If set to true all its children panels will be disabled from toggling. */
  disabled?: boolean,
  initialState?: AccordionStateT,
  /** Handler called each time a panel is toggled. expanded prop is an array
   * of Panel keys that are currently expanded. */
  onChange?: AccordionOnChangeHandlerT,
  overrides?: AccordionOverridesT<
    $Diff<SharedStylePropsArgT, {$expanded?: ?boolean}>,
  >,
  /** Handler called each time the component state changes.
   * Used to override default state-change functionality. */
  stateReducer: StateReducerT,
  /**
   * Allows users to render all child content whether a panel is expanded or not
   * for SEO purposed
   */
  renderPanelContent?: boolean,
  /**
   * Allows users to render all child content whether a panel is expanded or not
   * for SEO purposed
   */
  renderAll?: boolean,
};

type SharedPanelPropsT = {
  /** The content visible when Panel is expanded. */
  children: React.Node,
  /** Defaults to the disabled value provided by the parent Accordion component. */
  disabled?: boolean,
  /** Id for a panel, when provided populates aria-controls
   * attribute for panel button and content
   * */
  'aria-controls'?: string,
  /** The key of a Panel. Used to maintain list of expanded panels.
   * Must be unique across children of the Accordion. */
  key?: React.Key,
  /** Handler for individual Panel change events. */
  onChange?: OnChangeHandlerT,
  /** Handler for the Header's click events. */
  onClick?: (e: Event) => mixed,
  /** Handler for the Header's keyDown events. */
  onKeyDown?: (e: KeyboardEvent) => mixed,
  overrides?: PanelOverridesT<SharedStylePropsArgT>,
  /** The title of an accordion panel. */
  title?: React.Node,
  /**
   * Allows users to render all child content whether a panel is expanded or not
   * for SEO purposed
   */
  renderPanelContent?: boolean,
  /**
   * Allows users to render all child content whether a panel is expanded or not
   * for SEO purposed
   */
  renderAll?: boolean,
};

export type PanelPropsT = SharedPanelPropsT & {
  /** Defines if the panel is expanded. If set to true the panel is rendered expanded. */
  expanded?: boolean,
};

// Props for panel stateful container
type SharedStatefulPanelContainerPropsT = {
  /** Initial state of a stateful panel component.
   * The expanded prop indicates if the panel is initially expanded.
   * If set to true the panel will be expanded initially */
  initialState?: PanelStateT,
  onChange?: OnChangeHandlerT,
  stateReducer?: PanelStateReducerT,
};
export type StatefulPanelContainerPropsT = SharedStatefulPanelContainerPropsT & {
  children: (props: $Diff<PanelPropsT, {children: React.Node}>) => React.Node,
};

// Props for stateful panel
export type StatefulPanelPropsT = SharedStatefulPanelContainerPropsT &
  SharedPanelPropsT;

export type SharedStylePropsArgT = {
  $color?: string,
  $disabled: ?boolean,
  $expanded?: ?boolean,
  $size?: string | number,
};
