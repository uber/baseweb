import * as React from 'react';
import { StyletronComponent } from 'styletron-react';
import { Override } from '../overrides';

export interface KIND {
  primary: 'primary';
  secondary: 'secondary';
  tertiary: 'tertiary';
}

export interface SIZE {
  compact: 'compact';
  default: 'default';
  large: 'large';
  mini: 'mini';
}

export interface SHAPE {
  default: 'default';
  pill: 'pill';
  round: 'round';
  circle: 'circle';
  square: 'square';
}

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
  kind?: KIND[keyof KIND];
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => any;
  overrides?: ButtonOverrides;
  shape?: SHAPE[keyof SHAPE];
  size?: SIZE[keyof SIZE];
  startEnhancer?: React.ReactNode;
  type?: 'submit' | 'reset' | 'button';
}

export declare const StyledBaseButton: StyletronComponent<any>;
export declare const StyledStartEnhancer: StyletronComponent<any>;
export declare const StyledEndEnhancer: StyletronComponent<any>;
export declare const StyledLoadingSpinner: StyletronComponent<any>;
export declare const StyledLoadingSpinnerContainer: StyletronComponent<any>;

export declare const Button: StyletronComponent<ButtonProps>;

export declare const KIND: KIND;
export declare const SHAPE: SHAPE;
export declare const SIZE: SIZE;
