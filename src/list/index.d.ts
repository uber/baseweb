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

export interface PropsT {
  artwork?: React.ReactNode;
  artworkSize?: ArtworkSizesT;
  children: React.ReactNode;
  endEnhancer?: React.ReactNode;
  overrides?: {};
  sublist?: boolean;
}

export interface LabelPropsT {
  children: React.ReactNode;
  description?: React.ReactNode;
  sublist?: boolean;
}

export const ListItem: React.FC<PropsT>;
export const ListItemLabel: React.FC<LabelPropsT>;

export const StyledRoot: StyletronComponent<any>;
export const StyledContent: StyletronComponent<any>;
export const StyledEndEnhancerContainer: StyletronComponent<any>;
export const StyledArtworkContainer: StyletronComponent<any>;
