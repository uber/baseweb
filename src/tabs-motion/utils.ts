/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import * as React from 'react';
import { ORIENTATION, FILL } from './constants';

import type { Fill, Orientation } from './types';

export const getTabId = (uid: string, key: React.Key) => `tabs-${uid}-tab-${key}`;
export const getTabPanelId = (uid: string, key: React.Key) => `tabs-${uid}-tabpanel-${key}`;
export const isHorizontal = (orientation: Orientation) => orientation === ORIENTATION.horizontal;
export const isVertical = (orientation: Orientation) => orientation === ORIENTATION.vertical;
export const isRTL = (direction: string) => direction === 'rtl';
export const isIntrinsic = (fill: Fill) => fill === FILL.intrinsic;
export const isFixed = (fill: Fill) => fill === FILL.fixed;
