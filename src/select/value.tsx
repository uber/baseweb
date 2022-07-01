/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import { StyledSingleValue } from './styled-components.js';
import { getOverrides } from '../helpers/overrides.js';

// flowlint-next-line unclear-type:off
export default function Value(props: any) {
  const { overrides = {}, ...restProps } = props;
  const [SingleValue, singleValueProps] = getOverrides(overrides.SingleValue, StyledSingleValue);
  return (
    <SingleValue aria-selected="true" {...restProps} {...singleValueProps}>
      {props.children}
    </SingleValue>
  );
}
