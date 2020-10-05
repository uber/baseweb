import * as React from 'react';
import {StyletronComponent} from 'styletron-react';
import {Override} from '../overrides';

export interface ARTWORK_SIZES {
  SMALL: 'SMALL';
  MEDIUM: 'MEDIUM';
  LARGE: 'LARGE';
}
export const ARTWORK_SIZES: ARTWORK_SIZES;
export type ArtworkSizesT =
  | ARTWORK_SIZES['SMALL']
  | ARTWORK_SIZES['MEDIUM']
  | ARTWORK_SIZES['LARGE'];

export interface StyledArtworkContainerPropsT {
  $artworkSize: ArtworkSizesT;
  $sublist?: boolean;
}
export interface StyledContentPropsT {
  $mLeft: boolean;
  $sublist: boolean;
}

export interface ListOverrides {
  Root?: Override<{}>;
  ArtworkContainer?: Override<StyledArtworkContainerPropsT>;
  Content?: Override<StyledContentPropsT>;
  EndEnhancerContainer?: Override<{}>;
}

export interface PropsT {
  artwork?: React.ReactNode;
  artworkSize?: ArtworkSizesT | number;
  children: React.ReactNode;
  endEnhancer?: React.ReactNode;
  overrides?: ListOverrides;
  sublist?: boolean;
}

export interface LabelPropsT {
  children: React.ReactNode;
  description?: React.ReactNode;
  sublist?: boolean;
}

export interface MenuAdapterPropsT extends PropsT {
  // eslint-disable-next-line flowtype/no-weak-types
  item: any;
  onMouseEnter: (event: React.MouseEvent<HTMLLIElement>) => any;
  onClick: (event: React.MouseEvent<HTMLLIElement>) => any;
  $size: string;
  $isHighlighted: boolean;
  $disabled: boolean;
}

export const ListItem: React.ForwardRefExoticComponent<
  PropsT & React.RefAttributes<HTMLLIElement>
>;
export const ListItemLabel: React.FC<LabelPropsT>;
export const MenuAdapter: React.FC<MenuAdapterPropsT>;

export const StyledRoot: StyletronComponent<{}>;
export const StyledContent: StyletronComponent<StyledContentPropsT>;
export const StyledEndEnhancerContainer: StyletronComponent<{}>;
export const StyledArtworkContainer: StyletronComponent<
  StyledArtworkContainerPropsT
>;
