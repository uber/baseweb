import { StyletronComponent } from 'styletron-react';
import { Sizing } from '../theme.ts';

export enum SIZE {
  small = 'small',
  medium = 'medium',
  large = 'large',
}

export interface SpinnerProps {
  [key: string]: any;
  $color?: string;
  $borderWidth?: number | string | SIZE | Sizing;
  $size?: number | string | SIZE | Sizing;
}

export const Spinner: StyletronComponent<SpinnerProps>;
