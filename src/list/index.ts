/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type {
  ArtworkSizes,
  Shape,
  StyledRootProps,
  StyledArtworkContainerProps,
  StyledContentProps,
  ListProps,
  LabelProps,
  MenuAdapterProps,
  HeadingProps,
  StyledHeadingHeadingProps,
} from './types';

export { default as ListItem } from './list-item';
export { default as ListItemLabel } from './list-item-label';
export { default as ListHeading } from './list-heading';
export { default as MenuAdapter } from './menu-adapter';

export { ARTWORK_SIZES, SHAPE } from './constants';
export * from './styled-components';
export * from './types';
/** @deprecated use ArtworkSizes instead. To be removed in future versions.*/
export type ArtworkSizesT = ArtworkSizes;
/** @deprecated use Shape instead. To be removed in future versions.*/
export type ShapeT = Shape;
/** @deprecated use StyledRootProps instead. To be removed in future versions.*/
export type StyledRootPropsT = StyledRootProps;
/** @deprecated use StyledArtworkContainerProps instead. To be removed in future versions.*/
export type StyledArtworkContainerPropsT = StyledArtworkContainerProps;
/** @deprecated use StyledContentProps instead. To be removed in future versions.*/
export type StyledContentPropsT = StyledContentProps;
/** @deprecated use ListProps instead. To be removed in future versions.*/
export type PropsT = ListProps;
/** @deprecated use LabelProps instead. To be removed in future versions.*/
export type LabelPropsT = LabelProps;
/** @deprecated use MenuAdapterProps instead. To be removed in future versions.*/
export type MenuAdapterPropsT = MenuAdapterProps;
/** @deprecated use HeadingProps instead. To be removed in future versions.*/
export type HeadingPropsT = HeadingProps;
/** @deprecated use StyledHeadingHeadingProps instead. To be removed in future versions.*/
export type StyledHeadingHeadingPropsT = StyledHeadingHeadingProps;
