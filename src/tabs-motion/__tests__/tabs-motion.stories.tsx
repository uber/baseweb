/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';
import { Scenario as TabsMotionAlign } from './tabs-motion-align.scenario';
import { Scenario as TabsMotionArtwork } from './tabs-motion-artwork.scenario';
import { Scenario as TabsMotionConditional } from './tabs-motion-conditional.scenario';
import { Scenario as TabsMotionDisabled } from './tabs-motion-disabled.scenario';
import { Scenario as TabsMotionFixedVertical } from './tabs-motion-fixed-vertical.scenario';
import { Scenario as TabsMotionFixed } from './tabs-motion-fixed.scenario';
import { Scenario as TabsMotionFocus } from './tabs-motion-focus.scenario';
import { Scenario as TabsMotionManual } from './tabs-motion-manual.scenario';
import { Scenario as TabsMotionOverrides } from './tabs-motion-overrides.scenario';
import { Scenario as TabsMotionRefs } from './tabs-motion-refs.scenario';
import { Scenario as TabsMotionRenderAll } from './tabs-motion-renderAll.scenario';
import { Scenario as TabsMotionScrollSafe } from './tabs-motion-scroll-safe.scenario';
import { Scenario as TabsMotionScrollVertical } from './tabs-motion-scroll-vertical.scenario';
import { Scenario as TabsMotionScroll } from './tabs-motion-scroll.scenario';
import { Scenario as TabsMotionStateful } from './tabs-motion-stateful.scenario';
import { Scenario as TabsMotionVerticalPageScroll } from './tabs-motion-vertical-pageScroll.scenario';
import { Scenario as TabsMotionVertical } from './tabs-motion-vertical.scenario';
import { Scenario as TabsMotionDefault } from './tabs-motion.scenario';
import { Scenario as TabsMotionEndEnhancer } from './tabs-motion-end-enhancer.scenario';

export const Align = () => <TabsMotionAlign />;
export const Artwork = () => <TabsMotionArtwork />;
export const Conditional = () => <TabsMotionConditional />;
export const Disabled = () => <TabsMotionDisabled />;
export const FixedVertical = () => <TabsMotionFixedVertical />;
export const Fixed = () => <TabsMotionFixed />;
export const Focus = () => <TabsMotionFocus />;
export const Manual = () => <TabsMotionManual />;
export const Overrides = () => <TabsMotionOverrides />;
export const Refs = () => <TabsMotionRefs />;
export const RenderAll = () => <TabsMotionRenderAll />;
export const ScrollSafe = () => <TabsMotionScrollSafe />;
export const ScrollVertical = () => <TabsMotionScrollVertical />;
export const Scroll = () => <TabsMotionScroll />;
export const Stateful = () => <TabsMotionStateful />;
export const VerticalPageScroll = () => <TabsMotionVerticalPageScroll />;
export const Vertical = () => <TabsMotionVertical />;
export const TabsMotion = () => <TabsMotionDefault />;
export const EndEnhancer = () => <TabsMotionEndEnhancer />;
