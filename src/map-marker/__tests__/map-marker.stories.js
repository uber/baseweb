/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {Scenario as FixedMarkerStory} from './fixed-marker.scenario.js';
import {Scenario as FloatingMarkerDefault} from './floating-marker.scenario.js';

export const FixedMarker = () => <FixedMarkerStory />;
export const FloatingMarker = () => <FloatingMarkerDefault />;
