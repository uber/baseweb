/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import SkeletonAnimation from './skeleton-animation.scenario.js';
import SkeletonLoading from './skeleton-loading.scenario.js';
import SkeletonDefault from './skeleton.scenario.js';

export const Animation = () => <SkeletonAnimation />;
export const Loading = () => <SkeletonLoading />;
export const Skeleton = () => <SkeletonDefault />;
