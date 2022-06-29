import { HeaderNavigationOverrides } from '../header-navigation';
import * as React from 'react';
import { StyletronComponent } from 'styletron-react';
import { Override } from '../overrides';

export declare const ARTWORK_SIZES: {
  SMALL: 'SMALL';
  MEDIUM: 'MEDIUM';
  LARGE: 'LARGE';
};
export type ArtworkSizesT = typeof ARTWORK_SIZES[keyof typeof ARTWORK_SIZES];

export declare const SHAPE: {
  DEFAULT: 'DEFAULT';
  ROUND: 'ROUND';
};
export type ShapeT = typeof SHAPE[keyof typeof SHAPE];

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

export declare const StyledRoot: StyletronComponent<any, {}>;
export declare const StyledContent: StyletronComponent<any, StyledContentPropsT>;
export declare const StyledEndEnhancerContainer: StyletronComponent<any, {}>;
export declare const StyledArtworkContainer: StyletronComponent<any, StyledArtworkContainerPropsT>;

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

export declare const StyledHeadingRoot: StyletronComponent<any, {}>;
export declare const StyledHeadingContent: StyletronComponent<any, {}>;
export declare const StyledHeadingContentRow: StyletronComponent<any, {}>;
export declare const StyledHeadingMainHeading: StyletronComponent<any, StyledHeadingHeadingPropsT>;
export declare const StyledHeadingSubHeading: StyletronComponent<any, StyledHeadingHeadingPropsT>;
export declare const StyledHeadingEndEnhancerContainer: StyletronComponent<
  any,
  StyledHeadingEndEnhancerContainerPropsT
>;
export declare const StyledHeadingEndEnhancerDescriptionContainer: StyletronComponent<any, {}>;
