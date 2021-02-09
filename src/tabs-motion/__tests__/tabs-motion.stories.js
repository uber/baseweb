/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import TabsMotionAlign from './tabs-motion-align.scenario.js';
import TabsMotionArtwork from './tabs-motion-artwork.scenario.js';
import TabsMotionConditional from './tabs-motion-conditional.scenario.js';
import TabsMotionDisabled from './tabs-motion-disabled.scenario.js';
import TabsMotionFixedVertical from './tabs-motion-fixed-vertical.scenario.js';
import TabsMotionFixed from './tabs-motion-fixed.scenario.js';
import TabsMotionFocus from './tabs-motion-focus.scenario.js';
import TabsMotionManual from './tabs-motion-manual.scenario.js';
import TabsMotionOverrides from './tabs-motion-overrides.scenario.js';
import TabsMotionRefs from './tabs-motion-refs.scenario.js';
import TabsMotionRenderAll from './tabs-motion-renderAll.scenario.js';
import TabsMotionScrollSafe from './tabs-motion-scroll-safe.scenario.js';
import TabsMotionScrollVertical from './tabs-motion-scroll-vertical.scenario.js';
import TabsMotionScroll from './tabs-motion-scroll.scenario.js';
import TabsMotionStateful from './tabs-motion-stateful.scenario.js';
import TabsMotionVerticalPageScroll from './tabs-motion-vertical-pageScroll.scenario.js';
import TabsMotionVertical from './tabs-motion-vertical.scenario.js';
import TabsMotionDefault from './tabs-motion.scenario.js';

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
