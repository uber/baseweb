/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {StyledSingleValue} from './styled-components';
import {getOverrides} from '../helpers/overrides';

// eslint-disable-next-line flowtype/no-weak-types
export default function Value(props: any) {
  const {overrides = {}, ...rest} = props;
  const [SingleValue, singleValueProps] = getOverrides(
    overrides.SingleValue,
    StyledSingleValue,
  );
  return (
    <SingleValue
      role="option"
      aria-selected="true"
      {...rest}
      {...singleValueProps}
    >
      {props.children}
    </SingleValue>
  );
}
