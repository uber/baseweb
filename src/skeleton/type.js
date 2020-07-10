 import * as React from 'react';
import type {OverrideT} from '../helpers/overrides.js';




export type SkeletonPropsT = {
  overrides?: OverrideT,

  children?: React.Node,

  rows: number,

  name?:string
};