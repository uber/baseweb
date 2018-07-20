// @flow
/* eslint-disable flowtype/generic-spacing */
import * as React from 'react';
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

export type ContentRenderPropT = (arg?: {
  close?: () => void,
}) => React.Node;

export type ComponentsPropT = {|
  Body?: React.ComponentType<mixed>,
  Arrow?: React.ComponentType<mixed>,
  Inner?: React.ComponentType<mixed>,
|};

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
  components?: ComponentsPropT,
  content: React.Node | ContentRenderPropT,
  id?: string,
  onMouseEnterDelay?: number,
  onMouseLeaveDelay?: number,
  placement: PopoverPlacementT,
  showArrow?: boolean,
  triggerType: TriggerTypeT,
};

// Props for stateless render logic
export type PopoverPropsT = BasePopoverPropsT & {
  children: ChildrenT,
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

export type PositionStylesT = {
  top?: number | string,
  left?: number | string,
};

export type PopperDataObjectT = {
  arrowStyles?: {
    top?: number | string,
    left?: number | string,
  },
  styles?: {
    top?: number | string,
    left?: number | string,
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
  arrowStyles: PositionStylesT,
  positionStyles: PositionStylesT,
  placement: PopoverPlacementT,
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
