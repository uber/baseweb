/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { Scenario as FixedMarkerStory } from './fixed-marker.scenario';
import { Scenario as FloatingMarkerStory } from './floating-marker.scenario';
import { Scenario as LocationPuckStory } from './location-puck.scenario';
import { Scenario as LocationPuckMapStory } from './location-puck-map.scenario';
import { Scenario as FloatingMarkerMapStory } from './floating-marker-map.scenario';
import { Scenario as FixedMarkerMapStory } from './fixed-marker-map.scenario';
import { Scenario as EatsPickupMarkerStory } from './eats-pickup-marker.scenario';
import { Scenario as FloatingRouteMarkerStory } from './floating-route-marker.scenario.js';
import { Scenario as FloatingRouteMarkerMapStory } from './floating-route-marker-map.scenario.js';

export const FixedMarker = () => <FixedMarkerStory />;
export const FloatingMarker = () => <FloatingMarkerStory />;
export const LocationPuck = () => <LocationPuckStory />;
export const LocationPuckMap = () => <LocationPuckMapStory />;
export const FloatingMarkerMap = () => <FloatingMarkerMapStory />;
export const FixedMarkerMap = () => <FixedMarkerMapStory />;
export const EatsPickupMarker = () => <EatsPickupMarkerStory />;
export const FloatingRouteMarker = () => <FloatingRouteMarkerStory />;
export const FloatingRouteMarkerMap = () => <FloatingRouteMarkerMapStory />;
