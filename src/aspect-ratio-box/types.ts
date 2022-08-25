/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type * as React from 'react';
import type { BlockProps } from '../block';

export type AspectRatioBoxProps<T extends React.ElementType = React.ElementType> = {
  /** Aspect ratio is width divided by height. */
  readonly aspectRatio?: number;
} & BlockProps<T>;
