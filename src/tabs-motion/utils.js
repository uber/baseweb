/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import * as React from 'react';
import {ORIENTATION, FILL} from './constants.js';

import type {FillT, OrientationT} from './types.js';

export const getTabId = (uid: string, key: React.Key) =>
  `tabs-${uid}-tab-${key}`;
export const getTabPanelId = (uid: string, key: React.Key) =>
  `tabs-${uid}-tabpanel-${key}`;
export const isHorizontal = (orientation: OrientationT) =>
  orientation === ORIENTATION.horizontal;
export const isVertical = (orientation: OrientationT) =>
  orientation === ORIENTATION.vertical;
export const isRTL = (direction: string) => direction === 'rtl';
export const isIntrinsic = (fill: FillT) => fill === FILL.intrinsic;
export const isFixed = (fill: FillT) => fill === FILL.fixed;
