/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import {getOverrides} from '../helpers/overrides.js';

import {StyledHeader} from './styled-components.js';
import type {HeaderPropsT} from './types.js';

export default function Header(props: HeaderPropsT) {
  const {overrides = {}} = props;
  const [OverridedHeader, headerProps] = getOverrides(overrides, StyledHeader);

  return <OverridedHeader {...headerProps}>{props.children}</OverridedHeader>;
}
