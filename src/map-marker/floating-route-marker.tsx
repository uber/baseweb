/*
Copyright (c) Uber Technologies, Inc.
This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import * as React from 'react';
import { useStyletron } from '../styles';
import { getOverrides } from '../helpers/overrides';
import { LabelSmall, LabelMedium } from '../typography';
import {
  FLOATING_ROUTE_MARKER_ANCHOR_POSITIONS,
  FLOATING_ROUTE_MARKER_POINTER_TYPE_WRAPPER_SIZES,
  FLOATING_ROUTE_MARKER_POINTERS,
  PINHEAD_SIZES_SHAPES,
  PINHEAD_DIMENSIONS,
} from './constants';
import {
  StyledFloatingRouteMarkerRoot,
  StyledLabelSlot,
  StyledFloatingRouteMarkerPointerContainer,
  StyledFloatingRouteMarkerPointer,
} from './styled-components';
import type { FloatingRouteMarkerProps } from './types';

const FloatingRouteMarker = ({
  label,
  secondaryLabel,
  startEnhancer: StartEnhancer,
  endEnhancer: EndEnhancer,
  selected = false,
  anchorPosition = FLOATING_ROUTE_MARKER_ANCHOR_POSITIONS.topLeft,
  overrides = {},
}: FloatingRouteMarkerProps) => {
  const [css, theme] = useStyletron();

  const backgroundColor = selected
    ? theme.colors.backgroundInversePrimary
    : theme.colors.backgroundPrimary;
  const color = selected ? theme.colors.contentInversePrimary : theme.colors.contentPrimary;
  const secondaryLabelColor = selected
    ? theme.colors.contentInverseSecondary
    : theme.colors.contentSecondary;

  const [Root, rootProps] = getOverrides(overrides.Root, StyledFloatingRouteMarkerRoot);
  const [IconContainer, iconContainerProps] = getOverrides(
    overrides.IconContainer,
    StyledLabelSlot
  );
  const [PrimaryLabel, primaryLabelProps] = getOverrides(overrides.Label, LabelMedium);
  const [SecondaryLabel, secondaryLabelProps] = getOverrides(overrides.SecondaryLabel, LabelSmall);
  const [Pointer, pointerProps] = getOverrides(overrides.Pointer, StyledFloatingRouteMarkerPointer);
  const [PointerContainer, pointerContainerProps] = getOverrides(
    overrides.PointerContainer,
    StyledFloatingRouteMarkerPointerContainer
  );

  const size = PINHEAD_SIZES_SHAPES.medium;
  const { icon } = PINHEAD_DIMENSIONS[size];
  const activeElements = [label, StartEnhancer, EndEnhancer].filter((x) => x);
  const gridTemplateColumns = activeElements.map(() => 'auto').join(' ');

  return (
    // @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete
    <Root
      data-baseweb="floating-route-map-marker"
      $background={backgroundColor}
      $gridTemplateColumns={gridTemplateColumns}
      {...rootProps}
    >
      {StartEnhancer && (
        // @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete
        <IconContainer $color={color} $size={size} {...iconContainerProps}>
          {/* @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete */}
          <StartEnhancer size={icon} />
        </IconContainer>
      )}
      {label && (
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
          })}
        >
          {/* @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete */}
          <PrimaryLabel $color={color} {...primaryLabelProps}>
            {label}
          </PrimaryLabel>
          {/* @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete */}
          <SecondaryLabel $color={secondaryLabelColor} {...secondaryLabelProps}>
            {secondaryLabel}
          </SecondaryLabel>
        </div>
      )}
      {EndEnhancer && (
        // @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete
        <IconContainer $color={color} $size={size} {...iconContainerProps}>
          {/* @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete */}
          <EndEnhancer size={icon} />
        </IconContainer>
      )}
      {/* @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete */}
      <PointerContainer
        $position={anchorPosition}
        xmlns="http://www.w3.org/2000/svg"
        {...FLOATING_ROUTE_MARKER_POINTER_TYPE_WRAPPER_SIZES[
          FLOATING_ROUTE_MARKER_POINTERS[anchorPosition].type
        ]}
        {...pointerContainerProps}
      >
        {/* @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete */}
        <Pointer
          d={FLOATING_ROUTE_MARKER_POINTERS[anchorPosition].path}
          $background={backgroundColor}
          {...pointerProps}
        />
      </PointerContainer>
    </Root>
  );
};

export default FloatingRouteMarker;
