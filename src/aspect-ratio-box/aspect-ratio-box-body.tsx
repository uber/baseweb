/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { Block, StyledBlockPropsT, BlockPropsT } from '../block';

interface AspectRatioBoxBodyComponentType<D extends React.ElementType> {
  <C extends React.ElementType = D>(
    props: BlockPropsT<C> & Omit<StyledBlockPropsT & React.ComponentProps<C>, keyof BlockPropsT>
  ): JSX.Element;
  displayName?: string;
}

export const AspectRatioBoxBody = (({ position, top, bottom, width, ...restProps }) => (
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
