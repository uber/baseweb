import { HeaderNavigationOverrides } from 'baseui/header-navigation';
import * as React from 'react';
import { StyletronComponent } from 'styletron-react';
import { Override } from '../overrides';

export interface ARTWORK_SIZES {
  SMALL: 'SMALL';
  MEDIUM: 'MEDIUM';
  LARGE: 'LARGE';
}
export declare const ARTWORK_SIZES: ARTWORK_SIZES;
export type ArtworkSizesT =
  | ARTWORK_SIZES['SMALL']
  | ARTWORK_SIZES['MEDIUM']
  | ARTWORK_SIZES['LARGE'];

export interface SHAPE {
  DEFAULT: 'DEFAULT';
  ROUND: 'ROUND';
}
export declare const SHAPE: SHAPE;
export type ShapeT = SHAPE['DEFAULT'] | SHAPE['ROUND'];

export interface StyledRootPropsT {
  $shape: ShapeT;
}
export interface StyledArtworkContainerPropsT {
  $artworkSize: ArtworkSizesT;
  $sublist?: boolean;
}
export interface StyledContentPropsT {
  $mLeft: boolean;
  $sublist: boolean;
}

export interface ListOverrides {
  Root?: Override<StyledRootPropsT>;
  ArtworkContainer?: Override<StyledArtworkContainerPropsT>;
  Content?: Override<StyledContentPropsT>;
  EndEnhancerContainer?: Override<{}>;
}

export interface LabelOverrides {
  LabelContent?: Override<any>;
  LabelDescription?: Override<any>;
  LabelSublistContent?: Override<any>;
}

export interface PropsT {
  artwork?: (args: { size: number }) => React.ReactNode;
  artworkSize?: ArtworkSizesT | number;
  shape?: ShapeT;
  children: React.ReactNode;
  endEnhancer?: () => React.ReactNode;
  overrides?: ListOverrides;
  sublist?: boolean;
}

export interface LabelPropsT {
  children: React.ReactNode;
  description?: React.ReactNode;
  sublist?: boolean;
  overrides?: LabelOverrides;
}

export interface MenuAdapterPropsT extends PropsT {
  item: any;
  onMouseEnter: (event: React.MouseEvent<HTMLLIElement>) => any;
  onClick: (event: React.MouseEvent<HTMLLIElement>) => any;
  $size: string;
  $isHighlighted: boolean;
  $disabled: boolean;
}

export declare const ListItem: React.ForwardRefExoticComponent<
  PropsT & React.RefAttributes<HTMLLIElement>
>;
export declare const ListItemLabel: React.FC<LabelPropsT>;
export declare const MenuAdapter: React.FC<MenuAdapterPropsT>;

export declare const StyledRoot: StyletronComponent<{}>;
export declare const StyledContent: StyletronComponent<StyledContentPropsT>;
export declare const StyledEndEnhancerContainer: StyletronComponent<{}>;
export declare const StyledArtworkContainer: StyletronComponent<StyledArtworkContainerPropsT>;

export interface HeadingPropsT {
  heading: React.ReactNode;
  subHeading?: React.ReactNode;
  endEnhancer?: React.ReactNode;
  endEnhancerDescription?: React.ReactNode;
  overrides?: HeaderNavigationOverrides;
  maxLines?: number;
}

export interface StyledHeadingEndEnhancerContainerPropsT {
  $isText: boolean;
}

export type StyledHeadingHeadingPropsT = {
  $maxLines: 1 | 2;
};

export declare const ListHeading: React.ForwardRefExoticComponent<
  HeadingPropsT & React.RefAttributes<HTMLLIElement>
>;

export declare const StyledHeadingRoot: StyletronComponent<{}>;
export declare const StyledHeadingContent: StyletronComponent<{}>;
export declare const StyledHeadingContentRow: StyletronComponent<{}>;
export declare const StyledHeadingMainHeading: StyletronComponent<StyledHeadingHeadingPropsT>;
export declare const StyledHeadingSubHeading: StyletronComponent<StyledHeadingHeadingPropsT>;
export declare const StyledHeadingEndEnhancerContainer: StyletronComponent<StyledHeadingEndEnhancerContainerPropsT>;
export declare const StyledHeadingEndEnhancerDescriptionContainer: StyletronComponent<{}>;
