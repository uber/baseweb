/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import type * as React from 'react';
import { FILL } from './constants';

import type { Fill } from './types';

export const getSegmentId = (uid: string, key: React.Key) => `segments-${uid}-segment-${key}`;
export const getSegmentPanelId = (uid: string, key: React.Key) =>
  `segments-${uid}-segmentpanel-${key}`;
export const isRTL = (direction: string) => direction === 'rtl';
export const isIntrinsic = (fill: Fill) => fill === FILL.intrinsic;
export const isFixed = (fill: Fill) => fill === FILL.fixed;
