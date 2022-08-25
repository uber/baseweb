/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type {
  AccessibilityType,
  BasePopoverProps,
  Child,
  Children,
  ContentRenderProp,
  PopoverOverrides,
  PopoverPlacement,
  PopoverProps,
  PopoverPropsWithoutChildren,
  StateChangeType,
  State,
  StatefulContentRenderProp,
  StatefulPopoverProps,
  StatefulPopoverContainerProps,
  StateReducer,
  TriggerType,
} from '../popover';

type BaseTooltipProps = BasePopoverProps;
type TooltipPlacement = PopoverPlacement;
type TooltipProps = PopoverProps;
type TooltipPropsWithoutChildren = PopoverPropsWithoutChildren;
type StatefulTooltipProps = StatefulPopoverProps;
type StatefulTooltipContainerProps = StatefulPopoverContainerProps;

export type {
  AccessibilityType,
  BaseTooltipProps,
  Child,
  Children,
  ContentRenderProp,
  PopoverOverrides,
  TooltipProps,
  State,
  StateChangeType,
  StateReducer,
  StatefulContentRenderProp,
  StatefulTooltipProps,
  StatefulTooltipContainerProps,
  TooltipPlacement,
  TooltipPropsWithoutChildren,
  TriggerType,
};
