import * as React from 'react';
import { StyletronComponent } from 'styletron-react';
import { Override } from '../overrides';

export interface CardOverrides {
  Action?: Override<any>;
  Body?: Override<any>;
  Contents?: Override<any>;
  HeaderImage?: Override<any>;
  Root?: Override<any>;
  Thumbnail?: Override<any>;
  Title?: Override<any>;
}
export interface CardProps {
  readonly action?: React.ReactNode;
  readonly children?: React.ReactNode;
  readonly hasThumbnail?: (props: { readonly thumbnail?: string }) => boolean;
  readonly headerImage?:
    | string
    | React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;
  readonly overrides?: CardOverrides;
  readonly thumbnail?: string;
  readonly title?: React.ReactNode;
}
export declare const Card: React.FC<CardProps>;
export type hasThumbnail = (props: { readonly thumbnail?: string }) => boolean;

export declare const StyledAction: StyletronComponent<any, any>;
export declare const StyledBody: StyletronComponent<any, any>;
export declare const StyledContents: StyletronComponent<any, any>;
export declare const StyledHeaderImage: StyletronComponent<any, any>;
export declare const StyledThumbnail: StyletronComponent<any, any>;
export declare const StyledTitle: StyletronComponent<any, any>;
export declare const StyledRoot: StyletronComponent<any, any>;
export declare const StyledWrapper: StyletronComponent<any, any>;
