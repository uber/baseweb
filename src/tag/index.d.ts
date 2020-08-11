import * as React from 'react';
import {StyletronComponent} from 'styletron-react';
import {Override} from '../overrides';

export interface KIND {
  custom: 'custom';
  neutral: 'neutral';
  primary: 'primary';
  accent: 'accent';
  positive: 'positive';
  warning: 'warning';
  negative: 'negative';
  white: 'white';
  black: 'black';
  blue: 'blue';
  red: 'red';
  orange: 'orange';
  yellow: 'yellow';
  green: 'green';
  purple: 'purple';
  brown: 'brown';
}

export interface VARIANT {
  solid: 'solid';
  light: 'light';
  outlined: 'outlined';
}

export interface SIZE {
  small: 'small';
  medium: 'medium';
  large: 'large';
}

export interface TagOverrides {
  Root?: Override<any>;
  Action?: Override<any>;
  ActionIcon?: Override<any>;
  Text?: Override<any>;
}

export interface TagProps {
  overrides?: TagOverrides;
  closeable?: boolean;
  disabled?: boolean;
  isFocused?: boolean;
  isHovered?: boolean;
  kind?: KIND[keyof KIND];
  variant?: VARIANT[keyof VARIANT];
  children?: React.ReactNode;
  title?: string;
  color?: string;
  size?: SIZE[keyof SIZE];
  onActionClick?: (e: Event, children?: React.ReactNode) => any;
  onActionKeyDown?: (e: Event, children?: React.ReactNode) => any;
  onClick?: (event: Event) => any;
  onKeyDown?: (event: Event) => any;
}

export class Tag extends React.Component<TagProps> {
  handleKeyDown(event: KeyboardEvent): void;
  handleActionKeyDown(event: KeyboardEvent): void;
}

export const StyledRoot: StyletronComponent<any>;
export const StyledAction: StyletronComponent<any>;
export const StyledActionIcon: StyletronComponent<any>;
export const StyledText: StyletronComponent<any>;

export const KIND: KIND;
export const VARIANT: VARIANT;
export const SIZE: SIZE;
