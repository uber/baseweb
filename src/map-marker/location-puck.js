/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import { useStyletron, type ThemeT } from '../styles/index.js';
import { getOverrides } from '../helpers/overrides.js';
import { LOCATION_PUCK_SIZES, LOCATION_PUCK_TYPES } from './constants.js';
import type {
  LocationPuckPropsT,
  ConsumerLocationPuckPropsT,
  EarnerLocationPuckPropsT,
} from './types.js';
import {
  LocationPuckContainer,
  StyledConsumerLocationPuckCore,
  StyledLocationPuckApproximation,
  consumerLocationShadow,
} from './styled-components.js';

const ConsumerLocationPuckHeading = ({ bearing }) => {
  const [css, theme] = useStyletron();
  return (
    <svg
      className={css({
        height: `${6}px`,
        width: `${11}px`,
        position: 'absolute',
        color: theme.colors.contentAccent,
        transform: `rotate(${bearing}deg) translateY(-16px)`,
        transition: `${theme.animation.timing300} ${theme.animation.easeOutCurve} all`,
        ...consumerLocationShadow,
      })}
      width="11"
      height="6"
      viewBox="0 0 11 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.5 0L0 6L5.5 5L11 6L5.5 0Z"
        fill="currentColor"
      />
    </svg>
  );
};

const ConsumerLocationPuck = ({ bearing, confidence, overrides }: ConsumerLocationPuckPropsT) => {
  const [, theme] = useStyletron();
  const [ConsumerLocationPuckCore, consuserLocationPuckCoreProps] = getOverrides(
    overrides.LocationPuckCore,
    StyledConsumerLocationPuckCore
  );

  const [LocationPuckApproximation, locationPuckApproximationProps] = getOverrides(
    overrides.LocationPuckApproximation,
    StyledLocationPuckApproximation
  );

  const color = theme.colors.contentAccent;

  //do color
  return (
    <LocationPuckContainer>
      <LocationPuckApproximation $color={color} {...locationPuckApproximationProps} />
      <ConsumerLocationPuckCore {...consuserLocationPuckCoreProps} />
      <ConsumerLocationPuckHeading bearing={bearing} />
    </LocationPuckContainer>
  );
};

const EarnerLocationPuck = ({ bearing, confidence, size, overrides }: EarnerLocationPuckPropsT) => {
  return <LocationPuckContainer></LocationPuckContainer>;
};

/* Ensure bearing is between 0 and 360 */
function correctBearing(bearing) {
  if (bearing < 0) {
    return bearing + 360;
  } else if (bearing > 360) {
    return bearing - 360;
  } else {
    return bearing;
  }
}

const LocationPuck = ({
  size = LOCATION_PUCK_SIZES.medium,
  bearing = 0,
  confidence = 1,
  type = LOCATION_PUCK_TYPES.consumer,
  overrides = {},
}: LocationPuckPropsT) => {
  const correctedBearing = correctBearing(bearing);

  if (__DEV__) {
    if (size !== LOCATION_PUCK_SIZES.medium && type === LOCATION_PUCK_TYPES.consumer) {
      console.warn(`Location puck size can only be applied to type === LOCATION_PUCK_TYPES.earner`);
    }
  }

  if (type === LOCATION_PUCK_TYPES.consumer) {
    return (
      <ConsumerLocationPuck
        bearing={correctedBearing}
        confidence={confidence}
        overrides={overrides}
      />
    );
  } else if (type === LOCATION_PUCK_TYPES.earner) {
    return (
      <EarnerLocationPuck
        bearing={correctedBearing}
        confidence={confidence}
        size={size}
        overrides={overrides}
      />
    );
  } else {
    return null;
  }
};

export default LocationPuck;
