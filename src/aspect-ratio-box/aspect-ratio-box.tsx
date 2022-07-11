/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { Block, type StyledBlockPropsT } from '../block';
import { mergeOverrides } from '../helpers/overrides';
import type { AspectRatioBoxPropsT } from './types';

const aspectRatioBoxStyle = ({ $aspectRatio }) => ({
  position: 'relative',
  '::before': {
    content: '""',
    width: '1px',
    marginLeft: '-1px',
    float: 'left',
    height: 0,
    paddingTop: `${100 / $aspectRatio}%`,
    pointerEvents: 'none',
  },
  '::after': {
    content: '""',
    display: 'table',
    clear: 'both',
  },
});

const AspectRatioBox: React.FC<any & { forwardedRef: React.Ref<any> }> = ({
  forwardedRef,
  aspectRatio = 1,
  overrides = {},
  ...restProps
}) => {
  const aspectRatioBoxOverrides = {
    Block: {
      style: aspectRatioBoxStyle,
    },
  };
  const blockOverrides = mergeOverrides(aspectRatioBoxOverrides, overrides);
  return (
    <Block
      // coerced to any because of how react components are typed.
      // cannot guarantee an html element
      ref={forwardedRef as any}
      overrides={blockOverrides}
      $aspectRatio={aspectRatio}
      data-baseweb="aspect-ratio-box"
      {...restProps}
    />
  );
};

interface AspectRatioCoxComponentType<D extends React.ElementType> {
  <C extends React.ElementType = D>(
    props: AspectRatioBoxPropsT<C> &
      (React.ComponentProps<C> extends { ref?: infer R } ? { ref?: R } : {}) &
      Omit<StyledBlockPropsT & React.ComponentProps<C>, keyof AspectRatioBoxPropsT>
  ): JSX.Element;
  displayName?: string;
}

const AspectRatioBoxComponent = React.forwardRef((props, ref) => (
  <AspectRatioBox {...props} forwardedRef={ref} />
)) as AspectRatioCoxComponentType<'div'>;
AspectRatioBoxComponent.displayName = 'AspectRatioBox';
export default AspectRatioBoxComponent;
