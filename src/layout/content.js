/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import {getOverrides} from '../helpers/overrides.js';

import {StyledContent} from './styled-components.js';
import type {ContentPropsT} from './types.js';

export default function Content(props: ContentPropsT) {
  const {overrides = {}} = props;
  const [OverridedContent, contentProps] = getOverrides(
    overrides,
    StyledContent,
  );

  return (
    <OverridedContent {...contentProps}>{props.children}</OverridedContent>
  );
}
