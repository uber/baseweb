/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* eslint-disable flowtype/generic-spacing */
import * as React from 'react';
import type {ThemeT} from '../styles/types.js';
import type {OverrideT} from '../helpers/overrides.js';
import {
  ACCESSIBILITY_TYPE,
  PLACEMENT,
  STATE_CHANGE_TYPE,
  TRIGGER_TYPE,
} from './constants.js';

export type PopoverPlacementT = $Keys<typeof PLACEMENT>;

export type TriggerTypeT = $Keys<typeof TRIGGER_TYPE>;

export type AccessibilityTypeT = $Keys<typeof ACCESSIBILITY_TYPE>;

export type StateT = {
  isOpen: boolean,
};

export type StateChangeTypeT = $Keys<typeof STATE_CHANGE_TYPE>;

export type StateReducerT = (
  stateChangeType: StateChangeTypeT,
  nextState: StateT,
  currentState: StateT,
) => StateT;

export type ContentRenderPropT = () => React.Node;

export type StatefulContentRenderPropT = ({
  close: () => void,
}) => React.Node;

export type OverridesT = {
  Body?: OverrideT<SharedStylePropsArgT>,
  Arrow?: OverrideT<SharedStylePropsArgT>,
  Inner?: OverrideT<SharedStylePropsArgT>,
};

// re-exports to maintain same public interface
export type ChildT = React.Node;
export type ChildrenT = React.ChildrenArray<ChildT>;

// Props shared by all flavors of popover
export type BasePopoverPropsT = {
  /** Controls how this popover behaves for screen readers and other assistive devices.
   * See the A11Y section at the bottom of this document for more details.
   */
  accessibilityType?: AccessibilityTypeT,
  'data-baseweb'?: string,
  id?: string,
  /** If true, popover element will not avoid element boundaries. */
  ignoreBoundary?: boolean,
  /** Number of milliseconds to wait before showing the popover after mouse enters the trigger element (for triggerType `hover`). */
  onMouseEnterDelay?: number,
  /** Number of milliseconds to wait before showing the popover after mouse leaves the trigger element (for triggerType `hover`). */
  onMouseLeaveDelay?: number,
  overrides?: OverridesT,
  /** How to position the popover relative to the target. */
  placement: PopoverPlacementT,
  /** Whether or not to show the arrow pointing from the popover to the trigger. */
  showArrow?: boolean,
  /** Whether to toggle the popover when trigger is clicked or hovered. */
  triggerType: TriggerTypeT,
  /** Where to mount the popover */
  mountNode?: HTMLElement,
};

// Props for stateless render logic
export type PopoverPropsT = BasePopoverPropsT & {
  /** Content that should trigger the popover to be shown (also acts as the anchor against
   * which the popover will be positioned).
   */
  children: React.Node,
  /** Content to render within the popover when it's shown. */
  content: React.Node | ContentRenderPropT,
  /** Whether or not to show the popover. */
  isOpen: boolean,
  /** Handler for blur events on trigger element. */
  onBlur?: () => mixed,
  /** Handler for click events on trigger element. */
  onClick?: (e: Event) => mixed,
  /** Handler for clicks outside the anchor/popover elements. */
  onClickOutside?: (event: MouseEvent) => mixed,
  /** Handler for click events on trigger element. */
  onEsc?: () => mixed,
  /** Handler for 'Esc' keypress events */
  onFocus?: () => mixed,
  /** Handler for mouseenter events on trigger element. */
  onMouseEnter?: () => mixed,
  /** Handler for mouseleave events on trigger element. */
  onMouseLeave?: () => mixed,
};

// Props for stateful wrapper
export type StatefulPopoverPropsT = BasePopoverPropsT & {
  /** Content that should trigger the popover to be shown (also acts as the anchor against
   * which the popover will be positioned).
   */
  children: React.Node,
  /** Content to render within the popover when it's shown. */
  content: React.Node | StatefulContentRenderPropT,
  /** Whether to hide the popover when the user clicks anywhere outside the trigger/popover. */
  dismissOnClickOutside: boolean,
  /** Whether to hide the popover when the user presses the escape key. */
  dismissOnEsc: boolean,
  /** Initial state populated into the component */
  initialState?: StateT,
  /** Event handler when popover is hidden. */
  onClose?: () => mixed,
  /** Event handler when popover is shown. */
  onOpen?: () => mixed,
  /** Reducer function to manipulate internal state updates. */
  stateReducer?: StateReducerT,
};

// Props for state container
export type StatefulPopoverContainerPropsT = $Diff<
  StatefulPopoverPropsT,
  {children: React.Node},
> & {
  children: (props: $Diff<PopoverPropsT, {children: React.Node}>) => React.Node,
};

export type PopoverPropsWithoutChildrenT = $Diff<
  PopoverPropsT,
  {children: React.Node},
>;

export type OffsetT = {
  top: number,
  left: number,
};

export type PopperOffsetT = {
  top?: number | null,
  left?: number | null,
};

export type PopperDataObjectT = {
  offsets: {
    arrow?: PopperOffsetT,
    popper: PopperOffsetT,
  },
  placement: string,
};

export type PopperOptionsT = {
  placement: string,
  modifiers: {
    arrow: {},
    computeStyle: {},
    applyStyle: {},
    applyReactStyle: {
      fn: (data: PopperDataObjectT) => void,
    },
  },
};

export type PopoverPrivateStateT = {
  isAnimating: boolean,
  arrowOffset: OffsetT,
  popoverOffset: OffsetT,
  placement: PopoverPlacementT,
  isMounted: boolean,
};

export type SharedStylePropsArgT = {
  $arrowOffset: OffsetT,
  $isAnimating: boolean,
  $isOpen: boolean,
  $popoverOffset: OffsetT,
  $placement: PopoverPlacementT,
  $showArrow: boolean,
  children?: React.Node,

  // Styletron stuff
  $as?: string,
  // styled function wrapper related
  $style?: ?{},
  $ref?: React.Ref<*>,
};

export type SharedStylePropsT = SharedStylePropsArgT & {
  $theme: ThemeT,
};

export type AnchorPropsT = {
  'aria-controls'?: string | null,
  'aria-describedby'?: string | null,
  'aria-expanded'?: string,
  'aria-haspopup'?: string,
  'aria-owns'?: string | null,
  id?: string | null,
  onBlur?: () => mixed,
  onClick?: (e: Event) => mixed,
  onFocus?: () => mixed,
  onMouseEnter?: (e: Event) => mixed,
  onMouseLeave?: (e: Event) => mixed,
  ref?: React.Ref<*>,
  $ref?: React.Ref<*>,
  tabIndex?: '0',
};
