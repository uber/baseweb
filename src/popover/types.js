/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* eslint-disable flowtype/generic-spacing */
import * as React from 'react';
import type { OverrideT } from '../helpers/overrides.js';
import type { TetherPlacementT } from '../layer/types.js';
import { ACCESSIBILITY_TYPE, STATE_CHANGE_TYPE, TRIGGER_TYPE } from './constants.js';

export type { PopperDataObjectT, PopperOffsetT, PopperOptionsT } from '../layer/types.js';

export type PopoverPlacementT = TetherPlacementT;
export type TriggerTypeT = $Keys<typeof TRIGGER_TYPE>;
export type AccessibilityTypeT = $Keys<typeof ACCESSIBILITY_TYPE>;
export type ReactRefT<T> = {| current: null | T |};

export type StateT = {
  isOpen: boolean,
};

export type StateChangeTypeT = $Keys<typeof STATE_CHANGE_TYPE>;

export type StateReducerT = (
  stateChangeType: StateChangeTypeT,
  nextState: StateT,
  currentState: StateT
) => StateT;

export type ContentRenderPropT = () => React.Node;

export type StatefulContentRenderPropT = ({
  close: () => void,
}) => React.Node;

export type OverridesT = {
  Body?: OverrideT,
  Arrow?: OverrideT,
  Inner?: OverrideT,
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
  /** How long should be fade out animation in ms, default 0ms */
  animateOutTime?: number,
  /** If true, focus will shift to the first interactive element within the popover.
   * If false, the popover container itself will receive focus.
   * Moving focus into a newly opened popover is important for accessibility purposes, so please be careful!
   */
  autoFocus?: boolean,
  /** If true, focus will be locked to elements within the popover.
   */
  focusLock?: boolean,
  'data-baseweb'?: string,
  id?: string,
  /** If true, popover element will not avoid element boundaries. */
  ignoreBoundary?: boolean,
  /** Where to mount the popover */
  mountNode?: HTMLElement,
  /** Handler for blur events on trigger element. */
  onBlur?: (e: Event) => mixed,
  /** Handler for click events on trigger element. */
  onClick?: (e: Event) => mixed,
  /** Handler for 'Esc' keypress events */
  onFocus?: (e: Event) => mixed,
  /** Pass FocusOptions for focusing (used as `HtmlElement.focus(focusOptions)`) */
  focusOptions?: FocusOptions,
  /** Handler for mouseenter events on trigger element. */
  onMouseEnter?: (e: Event) => mixed,
  /** Number of milliseconds to wait before showing the popover after mouse enters the trigger element (for triggerType `hover`). */
  onMouseEnterDelay?: number,
  /** Handler for mouseleave events on trigger element. */
  onMouseLeave?: (e: Event) => mixed,
  /** Number of milliseconds to wait before showing the popover after mouse leaves the trigger element (for triggerType `hover`). */
  onMouseLeaveDelay?: number,
  overrides?: OverridesT,
  /** How to position the popover relative to the target. */
  placement: TetherPlacementT,
  /** Popper options override
   * https://github.com/popperjs/popper.js/blob/v1.x/docs/_includes/popper-documentation.md
   */
  // flowlint-next-line unclear-type:off
  popperOptions?: any,
  /** Renders all popover content for SEO purposes regardless of popover isOpen state */
  renderAll?: boolean,
  /** If true, focus will shift back to the original element that triggered the popover
   * Be careful with elements that open the popover on focus (e.g. input) this will cause the popover to reopen on close!
   */
  returnFocus?: boolean | FocusOptions | ((returnTo: Element) => boolean | FocusOptions),
  /** Whether or not to show the arrow pointing from the popover to the trigger. */
  showArrow?: boolean,
  /** Whether to toggle the popover when trigger is clicked or hovered. */
  triggerType: TriggerTypeT,
  /** Margin of the popover */
  popoverMargin?: number,
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
  /** Handler for clicks outside the anchor/popover elements. */
  onClickOutside?: (event: MouseEvent) => mixed,
  /** Handler for click events on trigger element. */
  onEsc?: () => mixed,
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
  { children: React.Node }
> & {
  children: (props: $Diff<PopoverPropsT, { children: React.Node }>) => React.Node,
};

export type PopoverPropsWithoutChildrenT = $Diff<PopoverPropsT, { children: React.Node }>;

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
  autoFocusAfterPositioning: boolean,
};

export type ArrowStylePropsArgT = {
  $arrowOffset: OffsetT,
  $placement: TetherPlacementT,
};

export type BodyStylePropsArgT = {
  $isAnimating: boolean,
  $isHoverTrigger: boolean,
  $isOpen: boolean,
  $popoverOffset: OffsetT,
  $placement: TetherPlacementT,
  $showArrow: boolean,
  $popoverMargin: number,
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
  onBlur?: (e: Event) => mixed,
  onClick?: (e: Event) => mixed,
  onFocus?: (e: Event) => mixed,
  onMouseEnter?: (e: Event) => mixed,
  onMouseLeave?: (e: Event) => mixed,
  ref?: ReactRefT<HTMLElement>,
  tabIndex?: number,
};
