/*
MIT License

Copyright (c) 2018 Uber Technologies, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
// @flow
/* eslint-disable flowtype/generic-spacing */
import * as React from 'react';
import type {ThemeT} from '../../styles/types';
import type {OverrideT} from '../../helpers/overrides';
import {
  ACCESSIBILITY_TYPE,
  PLACEMENT,
  STATE_CHANGE_TYPE,
  TRIGGER_TYPE,
} from './constants';

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

// Basically React.Node minus React.Portal and Iterable
export type ChildT =
  | void
  | null
  | boolean
  | number
  | string
  // eslint-disable-next-line flowtype/no-weak-types
  | React.Element<any>;

export type ChildrenT = React.ChildrenArray<ChildT>;

// Props shared by all flavors of popover
export type BasePopoverPropsT = {
  accessibilityType?: AccessibilityTypeT,
  id?: string,
  onMouseEnterDelay?: number,
  onMouseLeaveDelay?: number,
  overrides?: OverridesT,
  placement: PopoverPlacementT,
  showArrow?: boolean,
  triggerType: TriggerTypeT,
};

// Props for stateless render logic
export type PopoverPropsT = BasePopoverPropsT & {
  children: ChildrenT,
  content: React.Node | ContentRenderPropT,
  isOpen: boolean,
  onBlur?: () => void,
  onClick?: (e: Event) => void,
  onClickOutside?: () => void,
  onEsc?: () => void,
  onFocus?: () => void,
  onMouseEnter?: () => void,
  onMouseLeave?: () => void,
};

// Props for stateful wrapper
export type StatefulPopoverPropsT = BasePopoverPropsT & {
  children: ChildrenT,
  content: React.Node | StatefulContentRenderPropT,
  dismissOnClickOutside: boolean,
  dismissOnEsc: boolean,
  initialState?: StateT,
  onClose?: () => void,
  onOpen?: () => void,
  stateReducer?: StateReducerT,
};

// Props for state container
export type StatefulPopoverContainerPropsT = $Diff<
  StatefulPopoverPropsT,
  {children: ChildrenT},
> & {
  children: (props: $Diff<PopoverPropsT, {children: ChildrenT}>) => React.Node,
};

export type PopoverPropsWithoutChildrenT = $Diff<
  PopoverPropsT,
  {children: ChildrenT},
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
  // TODO: Get this to work without 'any'
  /* eslint-disable-next-line flowtype/no-weak-types */
  $ref?: React.Ref<any>,
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
  onBlur?: () => void,
  onClick?: (e: Event) => void,
  onFocus?: () => void,
  onMouseEnter?: (e: Event) => void,
  onMouseLeave?: (e: Event) => void,
  /* eslint-disable flowtype/no-weak-types */
  // TODO: Get this to work without 'any'
  ref?: React.Ref<any>,
  $ref?: React.Ref<any>,
  /* eslint-enable flowtype/no-weak-types */
  tabIndex?: '0',
};
