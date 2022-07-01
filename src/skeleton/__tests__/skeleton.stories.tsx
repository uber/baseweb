/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';
import { Scenario as SkeletonAnimation } from './skeleton-animation.scenario';
import { Scenario as SkeletonLoading } from './skeleton-loading.scenario';
import { Scenario as SkeletonDefault } from './skeleton.scenario';

export const Animation = () => <SkeletonAnimation />;
export const Loading = () => <SkeletonLoading />;
export const Skeleton = () => <SkeletonDefault />;
