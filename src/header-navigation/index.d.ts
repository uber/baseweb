import * as React from 'react';
import { StyletronComponent } from 'styletron-react';
import { Override } from '../overrides';

export declare const ALIGN: {
  right: 'flex-end';
  left: 'flex-start';
  center: 'center';
};

export interface HeaderNavigationOverrides {
  Root?: Override<any>;
}

export interface HeaderNavigationProps {
  overrides?: HeaderNavigationOverrides;
  children?: React.ReactNode;
}

export class HeaderNavigation extends React.Component<HeaderNavigationProps> {}

export declare const StyledRoot: StyletronComponent<any>;
export declare const StyledNavigationItem: StyletronComponent<any>;
export declare const StyledNavigationList: StyletronComponent<any>;
