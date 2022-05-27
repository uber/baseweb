/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import type { OverrideT } from '../helpers/overrides';
import type { IconPropsT } from '../icon';
import { ARTWORK_SIZES, SHAPE } from './constants';

export type ArtworkSizesT =
  | typeof ARTWORK_SIZES.SMALL
  | typeof ARTWORK_SIZES.MEDIUM
  | typeof ARTWORK_SIZES.LARGE;

export type ShapeT = typeof SHAPE.DEFAULT | typeof SHAPE.ROUND;

export type StyledRootPropsT = {
  $shape: ShapeT;
};
export type StyledArtworkContainerPropsT = {
  $artworkSize: ArtworkSizesT | number;
  $sublist?: boolean;
};
export type StyledContentPropsT = {
  $mLeft: boolean;
  $sublist: boolean;
};

export type OverridesT = {
  Root?: OverrideT;
  ArtworkContainer?: OverrideT;
  Content?: OverrideT;
  EndEnhancerContainer?: OverrideT;
};

export type PropsT = {
  artwork?: React.ComponentType<
    {
      size: IconPropsT['size'];
    } & IconPropsT
  >;
  artworkSize?: ArtworkSizesT | number;
  shape?: ShapeT;
  children: React.ReactNode;
  endEnhancer?: React.ComponentType<{}>;
  'aria-label'?: string;
  'aria-selected'?: boolean;
  id?: String;
  overrides?: OverridesT;
  role?: string;
  sublist?: boolean;
};

export type LabelOverrides = {
  LabelContent?: OverrideT;
  LabelDescription?: OverrideT;
  LabelSublistContent?: OverrideT;
};

export type LabelPropsT = {
  children: React.ReactNode;
  description?: React.ReactNode;
  sublist?: boolean;
  overrides?: LabelOverrides;
};

export type HeadingOverridesT = {
  Root?: OverrideT;
  Content?: OverrideT;
  HeadingContainer?: OverrideT;
  SubHeadingContainer?: OverrideT;
  EndEnhancerContainer?: OverrideT;
  EndEnhancerDescriptionContainer?: OverrideT;
};

export type HeadingPropsT = {
  heading: React.ReactNode | React.ComponentType<{}>;
  subHeading?: React.ReactNode | React.ComponentType<{}>;
  endEnhancer?: React.ReactNode | React.ComponentType<{}>;
  endEnhancerDescription?: React.ReactNode | React.ComponentType<{}>;
  overrides?: HeadingOverridesT;
  maxLines?: 1 | 2;
};

export type StyledHeadingHeadingPropsT = {
  $maxLines: number;
};

export type MenuAdapterPropsT = {
  // flowlint-next-line unclear-type:off
  item?: any;
  onMouseEnter?: (a: MouseEvent) => unknown;
  onClick?: (a: MouseEvent) => unknown;
  $size?: string;
  $isHighlighted?: boolean;
  $disabled?: boolean;
} & PropsT;
