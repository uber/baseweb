/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import type { BlockPropsT } from '../block';

export type HeadingPropsT = {
  /** Set and fix the style level independently on the hierarchy context. */
  styleLevel?: 1 | 2 | 3 | 4 | 5 | 6;
} & BlockPropsT<'h1'>; // using just h1 because other heading elements effectivelly have the same type

export type HeadingLevelPropsT = {
  /** Content to be rendered in the HeadingLevel. */
  children: React.ReactNode;
};
