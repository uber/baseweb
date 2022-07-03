import * as React from 'react';
import { StyletronComponent } from 'styletron-react';
import { Override } from '../overrides';

export declare const KIND: {
  primary: 'primary';
  secondary: 'secondary';
  tertiary: 'tertiary';
};

export declare const SIZE: {
  compact: 'compact';
  default: 'default';
  large: 'large';
  mini: 'mini';
};

export declare const SHAPE: {
  default: 'default';
  pill: 'pill';
  round: 'round';
  circle: 'circle';
  square: 'square';
};

export interface ButtonOverrides {
  Root?: Override<any>;
  BaseButton?: Override<any>;
  StartEnhancer?: Override<any>;
  EndEnhancer?: Override<any>;
  LoadingSpinnerContainer?: Override<any>;
  LoadingSpinner?: Override<any>;
}

export interface CustomColorsT {
  backgroundColor: string;
  color: string;
}

export interface ButtonProps {
  ref?: React.Ref<HTMLButtonElement>;
  colors?: CustomColorsT;
  href?: string;
  target?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  endEnhancer?: React.ReactNode;
  isLoading?: boolean;
  isSelected?: boolean;
  kind?: typeof KIND[keyof typeof KIND];
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => any;
  overrides?: ButtonOverrides;
  shape?: typeof SHAPE[keyof typeof SHAPE];
  size?: typeof SIZE[keyof typeof SIZE];
  startEnhancer?: React.ReactNode;
  type?: 'submit' | 'reset' | 'button';
}

export declare const StyledBaseButton: StyletronComponent<any>;
export declare const StyledStartEnhancer: StyletronComponent<any>;
export declare const StyledEndEnhancer: StyletronComponent<any>;
export declare const StyledLoadingSpinner: StyletronComponent<any>;
export declare const StyledLoadingSpinnerContainer: StyletronComponent<any>;

export declare const Button: StyletronComponent<ButtonProps>;
