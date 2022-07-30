/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import * as React from 'react';
import { useStyletron } from '../styles';
import { getOverrides } from '../helpers/overrides';
import {
  LOCATION_PUCK_SIZES,
  LOCATION_PUCK_TYPES,
  EARNER_LOCATION_PUCK_CORE_SCALES,
} from './constants';
import type {
  LocationPuckPropsT,
  ConsumerLocationPuckPropsT,
  EarnerLocationPuckPropsT,
} from './types';
import {
  LocationPuckContainer,
  StyledConsumerLocationPuckCore,
  StyledLocationPuckApproximation,
  StyledEarnerLocationPuckCore,
} from './styled-components';

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

const ConsumerLocationPuck = ({
  bearing,
  showBearing,
  confidenceRadius,
  overrides,
}: ConsumerLocationPuckPropsT) => {
  const [, theme] = useStyletron();
  const [ConsumerLocationPuckCore, consumerLocationPuckCoreProps] = getOverrides(
    overrides.ConsumerLocationPuckCore,
    StyledConsumerLocationPuckCore
  );

  const [LocationPuckApproximation, locationPuckApproximationProps] = getOverrides(
    overrides.LocationPuckApproximation,
    StyledLocationPuckApproximation
  );

  return (
    <LocationPuckContainer>
      <LocationPuckApproximation
        $color={theme.colors.contentAccent}
        $radius={confidenceRadius}
        {...locationPuckApproximationProps}
      />
      <ConsumerLocationPuckCore {...consumerLocationPuckCoreProps} />
      {showBearing && <ConsumerLocationPuckHeading bearing={bearing} />}
    </LocationPuckContainer>
  );
};

const EarnerLocationPuckHeading = ({ size, color, bearing }) => {
  const [css, theme] = useStyletron();
  return (
    <svg
      className={css({
        position: 'absolute',
        transition: `${theme.animation.timing300} ${theme.animation.easeOutCurve} all`,
        transform: `rotate(${bearing}deg) scale(${EARNER_LOCATION_PUCK_CORE_SCALES[size]})`,
      })}
      width="72"
      height="72"
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M36 20L52 52L36 42.8571L20 52L36 20Z"
        fill={color}
      />
    </svg>
  );
};

const EarnerLocationPuck = ({
  bearing,
  confidenceRadius,
  size,
  overrides,
}: EarnerLocationPuckPropsT) => {
  const [, theme] = useStyletron();
  const color = theme.colors.contentPrimary;
  const [LocationPuckApproximation, locationPuckApproximationProps] = getOverrides(
    overrides.LocationPuckApproximation,
    StyledLocationPuckApproximation
  );
  const [EarnerLocationPuckCore, earnerLocationPuckCoreProps] = getOverrides(
    overrides.EarnerLocationPuckCore,
    StyledEarnerLocationPuckCore
  );

  return (
    <LocationPuckContainer>
      <LocationPuckApproximation
        $color={color}
        $radius={confidenceRadius}
        {...locationPuckApproximationProps}
      />
      <EarnerLocationPuckCore $color={color} $size={size} {...earnerLocationPuckCoreProps} />
      <EarnerLocationPuckHeading size={size} color={color} bearing={bearing} />
    </LocationPuckContainer>
  );
};

const LocationPuck = ({
  size = LOCATION_PUCK_SIZES.medium,
  bearing = 0,
  showBearing = true,
  confidenceRadius = 0,
  type = LOCATION_PUCK_TYPES.consumer,
  overrides = {},
}: LocationPuckPropsT) => {
  if (__DEV__) {
    if (size !== LOCATION_PUCK_SIZES.medium && type === LOCATION_PUCK_TYPES.consumer) {
      console.warn(`Location puck size can only be applied to type === LOCATION_PUCK_TYPES.earner`);
    }

    if (!showBearing && type === LOCATION_PUCK_TYPES.earner) {
      console.warn(`Earner location puck must show the bearing indicator`);
    }
  }

  const sharedProps = {
    bearing,
    confidenceRadius,
    overrides,
  };

  return type === LOCATION_PUCK_TYPES.consumer ? (
    <ConsumerLocationPuck {...sharedProps} showBearing={showBearing} />
  ) : (
    <EarnerLocationPuck {...sharedProps} size={size} />
  );
};

export default LocationPuck;
