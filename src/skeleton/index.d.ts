import * as React from 'react';
import {Override} from '../overrides';

export type OverridesT = {
  Root?: Override<any>;
  Row?: Override<any>;
};

export type SkeletonPropsT = {
  overrides?: OverridesT;
  rows?: number;
  animation?: boolean;
  height?: string;
  width?: string;
};
export class Skeleton extends React.Component<SkeletonPropsT> {}
