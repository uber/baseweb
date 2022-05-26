import * as React from 'react';
import { StyletronComponent } from 'styletron-react';
import { Override } from '../overrides';

export interface SIZE {
  small: 'small';
  medium: 'medium';
  large: 'large';
}
export interface ProgressBarOverrides {
  Root?: Override<any>;
  BarContainer?: Override<any>;
  Bar?: Override<any>;
  BarProgress?: Override<any>;
  InfiniteBar?: Override<any>;
  Label?: Override<any>;
}
export interface ProgressBarProps {
  ariaLabel?: string;
  'aria-label'?: string;
  children?: React.ReactNode;
  getProgressLabel?: (value: number, successValue: number) => React.ReactNode;
  infinite?: boolean;
  overrides?: ProgressBarOverrides;
  size?: keyof SIZE;
  showLabel?: boolean;
  steps?: number;
  successValue?: number;
  minValue?: number;
  maxValue?: number;
  value?: number;
}
export class ProgressBar extends React.Component<ProgressBarProps> {}

export interface ProgressBarRoundedOverrides {
  Root?: Override<any>;
  Svg?: Override<any>;
  TrackBackground?: Override<any>;
  TrackForeground?: Override<any>;
  Text?: Override<any>;
}

export interface ProgressBarRoundedProps {
  progress?: number;
  size?: SIZE[keyof SIZE];
  animate?: boolean;
  inline?: boolean;
  overrides?: ProgressBarRoundedOverrides;
}
export declare const ProgressBarRounded: React.FC<ProgressBarRoundedProps>;

export declare const SIZE: SIZE;
export declare const StyledRoot: StyletronComponent<any>;
export declare const StyledBarContainer: StyletronComponent<any>;
export declare const StyledBar: StyletronComponent<any>;
export declare const StyledBarProgress: StyletronComponent<any>;
export declare const StyledInfiniteBar: StyletronComponent<any>;
export declare const StyledLabel: StyletronComponent<any>;
