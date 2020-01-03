/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* eslint-disable flowtype/generic-spacing */
import * as React from 'react';
import type {OverrideT} from '../helpers/overrides.js';
import type {TetherPlacementT} from '../layer/types.js';
import {
  ACCESSIBILITY_TYPE,
  STATE_CHANGE_TYPE,
  TRIGGER_TYPE,
} from './constants.js';

export type {
  PopperDataObjectT,
  PopperOffsetT,
  PopperOptionsT,
} from '../layer/types.js';

export type PopoverPlacementT = TetherPlacementT;

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
  /** Handler for click events on trigger element. */
  onClick?: (e: Event) => mixed,
  overrides?: OverridesT,
  /** How to position the popover relative to the target. */
  placement: TetherPlacementT,
  /** Whether or not to show the arrow pointing from the popover to the trigger. */
  showArrow?: boolean,
  /** Whether to toggle the popover when trigger is clicked or hovered. */
  triggerType: TriggerTypeT,
  /** Where to mount the popover */
  mountNode?: HTMLElement,
  /** How long should be fade out animation in ms, default 0ms */
  animateOutTime?: number,
  /** Popper options override
   * https://popper.js.org/popper-documentation.html#Popper.Defaults
   */
  // eslint-disable-next-line flowtype/no-weak-types
  popperOptions?: any,
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

export type PopoverPrivateStateT = {
  isAnimating: boolean,
  arrowOffset: OffsetT,
  popoverOffset: OffsetT,
  placement: TetherPlacementT,
  isLayerMounted: boolean,
  isMounted: boolean,
};

export type ArrowStylePropsArgT = {
  $arrowOffset: OffsetT,
  $placement: TetherPlacementT,
};

export type BodyStylePropsArgT = {
  $isAnimating: boolean,
  $isOpen: boolean,
  $popoverOffset: OffsetT,
  $placement: TetherPlacementT,
  $showArrow: boolean,
};

export type InnerStylePropsArgT = {};
/*
 * Can't use Intersection types because of https://github.com/facebook/flow/issues/7946
 * export type SharedStylePropsArgT = ArrowStylePropsArgT & BodyStylePropsArgT & InnerStylePropsArgT;
 */
export type SharedStylePropsArgT = {
  ...$Exact<ArrowStylePropsArgT>,
  ...$Exact<BodyStylePropsArgT>,
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
  tabIndex?: number,
};
