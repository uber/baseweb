import { StyletronComponent } from 'styletron-react';
import { Sizing } from '../theme';

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

export declare const Spinner: StyletronComponent<any, SpinnerProps>;
