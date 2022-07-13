/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-disable flowtype/generic-spacing */
import type {
  AccessibilityTypeT,
  BasePopoverPropsT,
  ChildT,
  ChildrenT,
  ContentRenderPropT,
  OverridesT,
  PopoverPlacementT,
  PopoverPropsT,
  PopoverPropsWithoutChildrenT,
  StateChangeTypeT,
  StateT,
  StatefulContentRenderPropT,
  StatefulPopoverPropsT,
  StatefulPopoverContainerPropsT,
  StateReducerT,
  TriggerTypeT,
} from '../popover';

type BaseTooltipPropsT = BasePopoverPropsT;
type TooltipPlacementT = PopoverPlacementT;
type TooltipPropsT = PopoverPropsT;
type TooltipPropsWithoutChildrenT = PopoverPropsWithoutChildrenT;
type StatefulTooltipPropsT = StatefulPopoverPropsT;
type StatefulTooltipContainerPropsT = StatefulPopoverContainerPropsT;

export type {
  AccessibilityTypeT,
  BaseTooltipPropsT,
  ChildT,
  ChildrenT,
  ContentRenderPropT,
  OverridesT,
  TooltipPropsT,
  StateT,
  StateChangeTypeT,
  StateReducerT,
  StatefulContentRenderPropT,
  StatefulTooltipPropsT,
  StatefulTooltipContainerPropsT,
  TooltipPlacementT,
  TooltipPropsWithoutChildrenT,
  TriggerTypeT,
};
