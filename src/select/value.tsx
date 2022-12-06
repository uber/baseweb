/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { StyledSingleValue } from './styled-components';
import { getOverrides } from '../helpers/overrides';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Value(props: any) {
  const { overrides = {}, ...restProps } = props;
  const [SingleValue, singleValueProps] = getOverrides(overrides.SingleValue, StyledSingleValue);
  return (
    // @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete
    <SingleValue {...restProps} {...singleValueProps}>
      {props.children}
    </SingleValue>
  );
}
