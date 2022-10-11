/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
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
  StyledContentItem,
  StyledFloatingRouteMarkerPointerContainer,
  StyledFloatingRouteMarkerPointer,
} from './styled-components';
import type { FloatingRouteMarkerProps } from './types';

const FloatingRouteMarker = ({
  label,
  secondaryLabel,
  startEnhancer: StartEnhancer = null,
  endEnhancer: EndEnhancer = null,
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
    StyledContentItem
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
    <Root
      data-baseweb="floating-route-map-marker"
      {...rootProps}
      $background={backgroundColor}
      $gridTemplateColumns={gridTemplateColumns}
    >
      {StartEnhancer && (
        <IconContainer $color={color} $size={size} {...iconContainerProps}>
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
          <PrimaryLabel $color={color} {...primaryLabelProps}>
            {label}
          </PrimaryLabel>
          <SecondaryLabel $color={secondaryLabelColor} {...secondaryLabelProps}>
            {secondaryLabel}
          </SecondaryLabel>
        </div>
      )}
      {EndEnhancer && (
        <IconContainer $color={color} $size={size} {...iconContainerProps}>
          <EndEnhancer size={icon} />
        </IconContainer>
      )}
      <PointerContainer
        $position={anchorPosition}
        xmlns="http://www.w3.org/2000/svg"
        {...FLOATING_ROUTE_MARKER_POINTER_TYPE_WRAPPER_SIZES[
          FLOATING_ROUTE_MARKER_POINTERS[anchorPosition].type
        ]}
        {...pointerContainerProps}
      >
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
