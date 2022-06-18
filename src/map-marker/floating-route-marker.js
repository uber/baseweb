/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import { useStyletron, type ThemeT } from '../styles/index.js';
import { getOverrides } from '../helpers/overrides.js';
import {
  FLOATING_ROUTE_MARKER_STATES,
  FLOATING_ROUTE_MARKER_ANCHOR_POSITIONS,
  FLOATING_ROUTE_MARKER_POINTER_TYPE_WRAPPER_SIZES,
  FLOATING_ROUTE_MARKER_POINTER_TYPES,
  FLOATING_ROUTE_MARKER_POINTER_POSITIONS,
  PINHEAD_TYPES,
  PINHEAD_SIZES_SHAPES,
  PINHEAD_DIMENSIONS,
} from './constants.js';

import {
  StyledFloatingRouteMarkerRoot,
  StyledContentItem,
  StyledLabelContent,
  StyledLabel,
} from './styled-components.js';
import type { FixedMarkerPropsT, KindT } from './types.js';

const POINTERS = {
  [FLOATING_ROUTE_MARKER_ANCHOR_POSITIONS.topLeft]: {
    type: FLOATING_ROUTE_MARKER_POINTER_TYPES.diagonal,
    content: ({ background }) => <path d="M0 0L24 8L8 24L0 0Z" fill={background} />,
  },
  [FLOATING_ROUTE_MARKER_ANCHOR_POSITIONS.topRight]: {
    type: FLOATING_ROUTE_MARKER_POINTER_TYPES.diagonal,
    content: ({ background }) => <path d="M24 0L0 8L16 24L24 0Z" fill={background} />,
  },
  [FLOATING_ROUTE_MARKER_ANCHOR_POSITIONS.topCenter]: {
    type: FLOATING_ROUTE_MARKER_POINTER_TYPES.standard,
    content: ({ background }) => (
      <path d="M9.50131 10L0.5 0.998535L18.5 0.996582L9.50131 10Z" fill={background} />
    ),
  },
  [FLOATING_ROUTE_MARKER_ANCHOR_POSITIONS.bottomLeft]: {
    type: FLOATING_ROUTE_MARKER_POINTER_TYPES.diagonal,
    content: ({ background }) => <path d="M0 24L24 16L8 0L0 24Z" fill={background} />,
  },
  [FLOATING_ROUTE_MARKER_ANCHOR_POSITIONS.bottomRight]: {
    type: FLOATING_ROUTE_MARKER_POINTER_TYPES.diagonal,
    content: ({ background }) => <path d="M24 24L0 16L16 0L24 24Z" fill={background} />,
  },
  [FLOATING_ROUTE_MARKER_ANCHOR_POSITIONS.bottomCenter]: {
    type: FLOATING_ROUTE_MARKER_POINTER_TYPES.standard,
    content: ({ background }) => (
      <path d="M9.50131 10L0.5 0.998535L18.5 0.996582L9.50131 10Z" fill={background} />
    ),
  },
  [FLOATING_ROUTE_MARKER_ANCHOR_POSITIONS.leftCenter]: {
    type: FLOATING_ROUTE_MARKER_POINTER_TYPES.standard,
    content: ({ background }) => (
      <path d="M9.50131 10L0.5 0.998535L18.5 0.996582L9.50131 10Z" fill={background} />
    ),
  },
  [FLOATING_ROUTE_MARKER_ANCHOR_POSITIONS.rightCenter]: {
    type: FLOATING_ROUTE_MARKER_POINTER_TYPES.standard,
    content: ({ background }) => (
      <path d="M9.50131 10L0.5 0.998535L18.5 0.996582L9.50131 10Z" fill={background} />
    ),
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
        ...FLOATING_ROUTE_MARKER_POINTER_POSITIONS[position],
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
  anchor,
  ...restProps
}: FixedMarkerPropsT) => {
  const [, theme] = useStyletron();

  const backgroundColor = selected
    ? theme.colors.backgroundInversePrimary
    : theme.colors.backgroundPrimary;

  const color = selected ? theme.colors.contentInversePrimary : theme.colors.contentPrimary;
  const secondaryLabelColor = selected
    ? theme.colors.contentInverseSecondary
    : theme.colors.contentSecondary;
  const [Root, rootProps] = getOverrides(overrides.Root, StyledFloatingRouteMarkerRoot);

  const [ContentItem, contentItemProps] = getOverrides(overrides.ContentItem, StyledContentItem);

  const [LabelContent, labelContentProps] = getOverrides(
    overrides.LabelContent,
    StyledLabelContent
  );

  const [PrimaryLabel, primaryLabelProps] = getOverrides(overrides.PrimaryLabel, StyledLabel);
  const [SecondaryLabel, secondaryLabelProps] = getOverrides(overrides.SecondaryLabel, StyledLabel);

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
        <LabelContent $color={color} $size={size} {...labelContentProps}>
          <PrimaryLabel $color={color}>{label}</PrimaryLabel>
          <SecondaryLabel $color={secondaryLabelColor}>{secondaryLabel}</SecondaryLabel>
        </LabelContent>
      )}
      {EndEnhancer && (
        <ContentItem $color={color} $size={size} {...contentItemProps}>
          <EndEnhancer size={icon} />
        </ContentItem>
      )}

      {anchor && <Pointer background={backgroundColor} position={anchor} />}
    </Root>
  );
};

export default FloatingRouteMarker;
