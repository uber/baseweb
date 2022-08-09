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
  LocationPuckProps,
  ConsumerLocationPuckProps,
  EarnerLocationPuckProps,
} from './types';
import {
  LocationPuckContainer,
  StyledConsumerLocationPuckCore,
  StyledLocationPuckApproximation,
  StyledEarnerLocationPuckCore,
} from './styled-components';

const ConsumerLocationPuckHeading = ({ heading }) => {
  const [css, theme] = useStyletron();
  return (
    <svg
      className={css({
        height: `${6}px`,
        width: `${11}px`,
        position: 'absolute',
        color: theme.colors.contentAccent,
        transition: `${theme.animation.timing300} ${theme.animation.easeOutCurve} all`,
      })}
      style={{
        transform: `rotate(${heading}deg) translateY(-16px)`,
      }}
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
  heading,
  showHeading,
  confidenceRadius,
  overrides,
}: ConsumerLocationPuckProps) => {
  const [, theme] = useStyletron();

  const [Root, rootProps] = getOverrides(overrides.Root, LocationPuckContainer);

  const [ConsumerLocationPuckCore, consumerLocationPuckCoreProps] = getOverrides(
    overrides.ConsumerLocationPuckCore,
    StyledConsumerLocationPuckCore
  );

  const [LocationPuckApproximation, locationPuckApproximationProps] = getOverrides(
    overrides.LocationPuckApproximation,
    StyledLocationPuckApproximation
  );

  return (
    <Root {...rootProps}>
      <LocationPuckApproximation
        $color={theme.colors.contentAccent}
        $radius={confidenceRadius}
        {...locationPuckApproximationProps}
      />
      <ConsumerLocationPuckCore {...consumerLocationPuckCoreProps} />
      {showHeading && <ConsumerLocationPuckHeading heading={heading} />}
    </Root>
  );
};

const EarnerLocationPuckHeading = ({ size, color, heading }) => {
  const [css, theme] = useStyletron();
  return (
    <svg
      className={css({
        position: 'absolute',
        transition: `${theme.animation.timing300} ${theme.animation.easeOutCurve} all`,
      })}
      style={{
        transform: `rotate(${heading}deg) scale(${EARNER_LOCATION_PUCK_CORE_SCALES[size]})`,
      }}
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
  heading,
  confidenceRadius,
  size,
  overrides,
}: EarnerLocationPuckProps) => {
  const [, theme] = useStyletron();
  const color = theme.colors.contentPrimary;

  const [Root, rootProps] = getOverrides(overrides.Root, LocationPuckContainer);
  const [LocationPuckApproximation, locationPuckApproximationProps] = getOverrides(
    overrides.LocationPuckApproximation,
    StyledLocationPuckApproximation
  );
  const [EarnerLocationPuckCore, earnerLocationPuckCoreProps] = getOverrides(
    overrides.EarnerLocationPuckCore,
    StyledEarnerLocationPuckCore
  );

  return (
    <Root {...rootProps}>
      <LocationPuckApproximation
        $color={color}
        $radius={confidenceRadius}
        {...locationPuckApproximationProps}
      />
      <EarnerLocationPuckCore $color={color} $size={size} {...earnerLocationPuckCoreProps} />
      <EarnerLocationPuckHeading size={size} color={color} heading={heading} />
    </Root>
  );
};

const LocationPuck = ({
  size = LOCATION_PUCK_SIZES.medium,
  heading = 0,
  showHeading = true,
  confidenceRadius = 0,
  type = LOCATION_PUCK_TYPES.consumer,
  overrides = {},
}: LocationPuckProps) => {
  if (__DEV__) {
    if (size !== LOCATION_PUCK_SIZES.medium && type === LOCATION_PUCK_TYPES.consumer) {
      console.warn(`Location puck size can only be applied to type === LOCATION_PUCK_TYPES.earner`);
    }

    if (!showHeading && type === LOCATION_PUCK_TYPES.earner) {
      console.warn(`Earner location puck must show the heading indicator`);
    }
  }

  const sharedProps = {
    heading,
    confidenceRadius,
    overrides,
  };

  return type === LOCATION_PUCK_TYPES.consumer ? (
    <ConsumerLocationPuck {...sharedProps} showHeading={showHeading} />
  ) : (
    <EarnerLocationPuck {...sharedProps} size={size} />
  );
};

export default LocationPuck;
