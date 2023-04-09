/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import type { StyledBlockProps, BlockProps } from '../block';
import { Block } from '../block';

interface AspectRatioBoxBodyComponentType<D extends React.ElementType> {
  <C extends React.ElementType = D>(
    props: BlockProps<C> & Omit<StyledBlockProps & React.ComponentProps<C>, keyof BlockProps>
  ): JSX.Element;
  displayName?: string;
}

export const AspectRatioBoxBody = (({ position, top, bottom, width, ...restProps }) => (
  // @ts-expect-error todo(ts-migration) TS2322 Type '{ "data-baseweb": string; position: Responsive<Position>; top: string | 0 | Scale[]; bottom: string | 0 | Scale[]; width: string | Scale[]; } & Omit<...>' is not assignable to type 'IntrinsicAtt...
  <Block
    data-baseweb="aspect-ratio-box-body"
    position={position || 'absolute'}
    top={top || 0}
    bottom={bottom || 0}
    width={width || '100%'}
    {...restProps}
  />
)) as AspectRatioBoxBodyComponentType<'div'>;

export default AspectRatioBoxBody;
