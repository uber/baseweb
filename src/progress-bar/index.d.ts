import * as React from 'react';
import {StyletronComponent} from 'styletron-react';
import {Override} from '../overrides';

export interface SIZE {
  small: 'small';
  medium: 'medium';
  large: 'large';
}
export interface ProgressBarOverrides {
  Root?: Override<any>;
  Bar?: Override<any>;
  BarProgress?: Override<any>;
  Label?: Override<any>;
}
export interface ProgressBarProps {
  children?: React.ReactNode;
  getProgressLabel?: (value: number, successValue: number) => React.ReactNode;
  infinite?: boolean;
  overrides?: ProgressBarOverrides;
  size?: keyof SIZE;
  showLabel?: boolean;
  successValue?: number;
  value?: number;
}
export class ProgressBar extends React.Component<ProgressBarProps> {}

export const SIZE: SIZE;
export const StyledRoot: StyletronComponent<any>;
export const StyledBar: StyletronComponent<any>;
export const StyledBarProgress: StyletronComponent<any>;
export const StyledLabel: StyletronComponent<any>;
