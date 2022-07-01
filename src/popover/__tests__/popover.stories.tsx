/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';
import { Scenario as PopoverClick } from './popover-click.scenario';
import { Scenario as PopoverDynamicTriggerType } from './popover-dynamic-triggertype.scenario';
import { Scenario as PopoverFocusLoop } from './popover-focus-loop.scenario';
import { Scenario as PopoverHover } from './popover-hover.scenario';
import { Scenario as PopoverLargeMargin } from './popover-large-margin.scenario';
import { Scenario as PopoverPosition } from './popover-position.scenario';
import { Scenario as PopoverRenderAll } from './popover-render-all.scenario';
import { Scenario as PopoverReposition } from './popover-reposition.scenario';
import { Scenario as PopoverSelect } from './popover-select.scenario';
import { Scenario as PopoverDefault } from './popover.scenario';
import { Scenario as PopoverProgressBar } from './popover-progress-bar.scenario';
import { Scenario as PopoverRepositionWithAnchorUpdate } from './popover-reposition-with-anchor-update.scenario';
import { Scenario as PopoverScroll } from './popover-scroll.scenario';
import { Scenario as PopoverAutoFocusWithoutFocusLock } from './popover-autofocus.scenario';
import { Scenario as PopoverPreventScrollOnFocus } from './popover-preventScroll-on-focus.scenario';

export const Click = () => <PopoverClick />;
export const DynamicTriggerType = () => <PopoverDynamicTriggerType />;
export const FocusLoop = () => <PopoverFocusLoop />;
export const Hover = () => <PopoverHover />;
export const LargeMargin = () => <PopoverLargeMargin />;
export const Position = () => <PopoverPosition />;
export const RenderAll = () => <PopoverRenderAll />;
export const Reposition = () => <PopoverReposition />;
export const Select = () => <PopoverSelect />;
export const Popover = () => <PopoverDefault />;
export const ProgressBar = () => <PopoverProgressBar />;
export const PreventScrollOnFocus = () => <PopoverPreventScrollOnFocus />;
export const RepositionWithAnchorUpdate = () => <PopoverRepositionWithAnchorUpdate />;
export const Scroll = () => <PopoverScroll />;
export const AutoFocusWithoutFocusLock = () => <PopoverAutoFocusWithoutFocusLock />;
