import * as React from 'react';
import { StyletronComponent } from 'styletron-react';
import { Override } from '../overrides';

export declare const KIND: {
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
};

export declare const VARIANT: {
  solid: 'solid';
  light: 'light';
  outlined: 'outlined';
};

export declare const SIZE: {
  small: 'small';
  medium: 'medium';
  large: 'large';
};

export interface TagOverrides {
  Root?: Override<any>;
  Action?: Override<any>;
  ActionIcon?: Override<any>;
  StartEnhancerContainer?: Override<any>;
  Text?: Override<any>;
}

export interface TagProps {
  overrides?: TagOverrides;
  closeable?: boolean;
  disabled?: boolean;
  isFocused?: boolean;
  isHovered?: boolean;
  kind?: typeof KIND[keyof typeof KIND];
  variant?: typeof VARIANT[keyof typeof VARIANT];
  children?: React.ReactNode;
  title?: string;
  color?: string;
  size?: typeof SIZE[keyof typeof SIZE];
  onActionClick?: (e: Event, children?: React.ReactNode) => any;
  onActionKeyDown?: (e: Event, children?: React.ReactNode) => any;
  onClick?: (event: Event) => any;
  onKeyDown?: (event: Event) => any;
  startEnhancer?: () => React.ReactNode;
}

export class Tag extends React.Component<TagProps> {
  handleKeyDown(event: KeyboardEvent): void;
  handleActionKeyDown(event: KeyboardEvent): void;
}

export declare const StyledRoot: StyletronComponent<any>;
export declare const StyledAction: StyletronComponent<any>;
export declare const StyledText: StyletronComponent<any>;
