import * as React from 'react';
import {StyletronComponent} from 'styletron-react';
import {Override} from '../overrides';

export interface SpinnerProps {
  'aria-label'?: string;
  size?: number | string;
  color?: string;
  title?: string;
  overrides?: {
    Svg?: Override<any>;
    ActivePath?: Override<any>;
    TrackPath?: Override<any>;
  };
}
export class Spinner extends React.Component<SpinnerProps> {}

export const StyledSvg: StyletronComponent<any>;
export const StyledTrackPath: StyletronComponent<any>;
export const StyledActivePath: StyletronComponent<any>;
export const StyledSpinnerNext: StyletronComponent<any>;

export enum SIZE {
  small = 'small',
  medium = 'medium',
  large = 'large',
}
