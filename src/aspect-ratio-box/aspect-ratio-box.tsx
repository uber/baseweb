/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { Block } from '../block';
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

const AspectRatioBox: React.FC<AspectRatioBoxPropsT & { forwardedRef: React.Ref<HTMLElement> }> = ({
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
      // flowlint-next-line unclear-type:off
      ref={forwardedRef as any}
      overrides={blockOverrides}
      // @ts-expect-error
      $aspectRatio={aspectRatio}
      data-baseweb="aspect-ratio-box"
      {...restProps}
    />
  );
};

const AspectRatioBoxComponent = React.forwardRef<HTMLElement, AspectRatioBoxPropsT>(
  (props: AspectRatioBoxPropsT, ref) => <AspectRatioBox {...props} forwardedRef={ref} />
);
AspectRatioBoxComponent.displayName = 'AspectRatioBox';
export default AspectRatioBoxComponent;
