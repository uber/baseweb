/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {Body as StyledBody, Root as StyledRoot} from './styled-components.js';
import {getOverride, getOverrideProps} from '../helpers/overrides.js';
import type {AspectRatioBoxPropsT} from './types.js';

const AspectRatioBox = ({
  aspectRatio,
  children,
  overrides,
  ...restProps
}: AspectRatioBoxPropsT) => {
  const {Body: BodyOverride, Root: RootOverride} = overrides;

  const Body = getOverride(BodyOverride) || StyledBody;
  const Root = getOverride(RootOverride) || StyledRoot;

  return (
    <Root
      data-baseweb="aspect-ratio-box"
      $aspectRatio={aspectRatio}
      {...restProps}
      {...getOverrideProps(RootOverride)}
    >
      <Body {...getOverrideProps(BodyOverride)}>{children}</Body>
    </Root>
  );
};

AspectRatioBox.defaultProps = {
  children: null,
  aspectRatio: 1,
  overrides: {},
};

export default AspectRatioBox;
