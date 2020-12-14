/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {Block} from '../block/index.js';
import {mergeOverrides} from '../helpers/overrides.js';
import type {AspectRatioBoxPropsT} from './types.js';

const aspectRatioBoxStyle = ({$aspectRatio}) => ({
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

const AspectRatioBox = ({
  forwardedRef,
  aspectRatio = 1,
  overrides = {},
  ...restProps
}): React.Node => {
  const aspectRatioBoxOverrides = {
    Block: {
      style: aspectRatioBoxStyle,
    },
  };
  const blockOverrides = mergeOverrides(aspectRatioBoxOverrides, overrides);
  return (
    <Block
      // coerced to any because because of how react components are typed.
      // cannot guarantee an html element
      // eslint-disable-next-line flowtype/no-weak-types
      ref={(forwardedRef: any)}
      overrides={blockOverrides}
      $aspectRatio={aspectRatio}
      data-baseweb="aspect-ratio-box"
      {...restProps}
    />
  );
};

const AspectRatioBoxComponent = React.forwardRef<
  AspectRatioBoxPropsT,
  HTMLElement,
>((props: AspectRatioBoxPropsT, ref) => (
  <AspectRatioBox {...props} forwardedRef={ref} />
));
AspectRatioBoxComponent.displayName = 'AspectRatioBox';
export default AspectRatioBoxComponent;
