/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import { useStyletron } from '../styles';
import { getOverrides } from '../helpers/overrides';
import { LabelSmall, LabelMedium } from 'src/typography';
import {
  FLOATING_ROUTE_MARKER_ANCHOR_POSITIONS,
  FLOATING_ROUTE_MARKER_POINTER_TYPE_WRAPPER_SIZES,
  FLOATING_ROUTE_MARKER_POINTER_TYPES,
  FLOATING_ROUTE_MARKER_POINTER_TRANSFORMS,
  PINHEAD_SIZES_SHAPES,
  PINHEAD_DIMENSIONS,
} from './constants';

import {
  StyledFloatingRouteMarkerRoot,
  StyledContentItem,
  StyledFloatingRouteMarkerPointer,
} from './styled-components';
import type { FloatingRouteMarkerProps } from './types';

const POINTERS = {
  [FLOATING_ROUTE_MARKER_ANCHOR_POSITIONS.topLeft]: {
    type: FLOATING_ROUTE_MARKER_POINTER_TYPES.diagonal,
    path: 'M0 0L24 8L8 24L0 0Z',
  },
  [FLOATING_ROUTE_MARKER_ANCHOR_POSITIONS.topRight]: {
    type: FLOATING_ROUTE_MARKER_POINTER_TYPES.diagonal,
    path: 'M24 0L0 8L16 24L24 0Z',
  },
  [FLOATING_ROUTE_MARKER_ANCHOR_POSITIONS.topCenter]: {
    type: FLOATING_ROUTE_MARKER_POINTER_TYPES.vertical,
    path: 'M9.49928 0L0.499411 9L18.5006 9L9.49928 0Z',
  },
  [FLOATING_ROUTE_MARKER_ANCHOR_POSITIONS.bottomLeft]: {
    type: FLOATING_ROUTE_MARKER_POINTER_TYPES.diagonal,
    path: 'M0 24L24 16L8 0L0 24Z',
  },
  [FLOATING_ROUTE_MARKER_ANCHOR_POSITIONS.bottomRight]: {
    type: FLOATING_ROUTE_MARKER_POINTER_TYPES.diagonal,
    path: 'M24 24L0 16L16 0L24 24Z',
  },
  [FLOATING_ROUTE_MARKER_ANCHOR_POSITIONS.bottomCenter]: {
    type: FLOATING_ROUTE_MARKER_POINTER_TYPES.vertical,
    path: 'M9.50131 10L0.5 0.998535L18.5 0.996582L9.50131 10Z',
  },
  [FLOATING_ROUTE_MARKER_ANCHOR_POSITIONS.leftCenter]: {
    type: FLOATING_ROUTE_MARKER_POINTER_TYPES.horizontal,
    path: 'M0 9L8.99988 0L8.99988 18L0 9Z',
  },
  [FLOATING_ROUTE_MARKER_ANCHOR_POSITIONS.rightCenter]: {
    type: FLOATING_ROUTE_MARKER_POINTER_TYPES.horizontal,
    path: 'M10 9L0.99762 0L0.998596 18L10 9Z',
  },
};

const Pointer = ({ background, position }) => {
  const [css, theme] = useStyletron();
  console.log(background);
  const PointerAnchor = POINTERS[position].content;
  return (
    <svg
      className={css({
        position: 'absolute',
        // ...FLOATING_ROUTE_MARKER_POINTER_POSITIONS[position],
        filter: `drop-shadow(${theme.lighting.shadow600})`,
      })}
      {...FLOATING_ROUTE_MARKER_POINTER_TYPE_WRAPPER_SIZES[POINTERS[position].type]}
      xmlns="http://www.w3.org/2000/svg"
    >
      <PointerAnchor background={background} />
    </svg>
  );
};

const FloatingRouteMarker = ({
  label,
  secondaryLabel,
  startEnhancer: StartEnhancer = null,
  endEnhancer: EndEnhancer,
  overrides = {},
  selected = false,
  anchorPosition,
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

  const [ContentItem, contentItemProps] = getOverrides(overrides.ContentItem, StyledContentItem);

  const [PrimaryLabel, primaryLabelProps] = getOverrides(overrides.PrimaryLabel, LabelMedium);
  const [SecondaryLabel, secondaryLabelProps] = getOverrides(overrides.SecondaryLabel, LabelSmall);

  const [Pointer, pointerProps] = getOverrides(overrides.Pointer, StyledFloatingRouteMarkerPointer);

  const height = 28;
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
        <ContentItem $color={color} $size={size} {...contentItemProps}>
          <StartEnhancer size={icon} />
        </ContentItem>
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
        <ContentItem $color={color} $size={size} {...contentItemProps}>
          <EndEnhancer size={icon} />
        </ContentItem>
      )}
      <Pointer
        {...pointerProps}
        $position={anchorPosition}
        xmlns="http://www.w3.org/2000/svg"
        {...FLOATING_ROUTE_MARKER_POINTER_TYPE_WRAPPER_SIZES[POINTERS[anchorPosition].type]}
      >
        <path d={POINTERS[anchorPosition].path} fill={'red'} />
      </Pointer>

      {/* {anchorPosition && <Pointer background={backgroundColor} position={anchorPosition} />} */}
    </Root>
  );
};

export default FloatingRouteMarker;
