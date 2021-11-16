/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {Scenario as PopoverClick} from './popover-click.scenario.js';
import {Scenario as PopoverFocusLoop} from './popover-focus-loop.scenario.js';
import {Scenario as PopoverHover} from './popover-hover.scenario.js';
import {Scenario as PopoverLargeMargin} from './popover-large-margin.scenario.js';
import {Scenario as PopoverPosition} from './popover-position.scenario.js';
import {Scenario as PopoverRenderAll} from './popover-render-all.scenario.js';
import {Scenario as PopoverReposition} from './popover-reposition.scenario.js';
import {Scenario as PopoverSelect} from './popover-select.scenario.js';
import {Scenario as PopoverDefault} from './popover.scenario.js';
import {Scenario as PopoverRepositionWithAnchorUpdate} from './popover-reposition-with-anchor-update.scenario.js';

export const Click = () => <PopoverClick />;
export const FocusLoop = () => <PopoverFocusLoop />;
export const Hover = () => <PopoverHover />;
export const LargeMargin = () => <PopoverLargeMargin />;
export const Position = () => <PopoverPosition />;
export const RenderAll = () => <PopoverRenderAll />;
export const Reposition = () => <PopoverReposition />;
export const Select = () => <PopoverSelect />;
export const Popover = () => <PopoverDefault />;
export const RepositionWithAnchorUpdate = () => (
  <PopoverRepositionWithAnchorUpdate />
);
