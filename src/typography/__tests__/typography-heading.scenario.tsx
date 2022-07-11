/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import * as React from 'react';

import {
  HeadingXXLarge,
  HeadingXLarge,
  HeadingLarge,
  HeadingMedium,
  HeadingSmall,
  HeadingXSmall,
} from '../index';

const textString = 'We ignite opportunity by setting the world in motion.';

export function Scenario() {
  return (
    <React.Fragment>
      <HeadingXSmall>{`HeadingXSmall - ${textString}`}</HeadingXSmall>
      <HeadingSmall>{`HeadingSmall - ${textString}`}</HeadingSmall>
      <HeadingMedium>{`HeadingMedium - ${textString}`}</HeadingMedium>
      <HeadingLarge>{`HeadingLarge - ${textString}`}</HeadingLarge>
      <HeadingXLarge>{`HeadingXLarge - ${textString}`}</HeadingXLarge>
      <HeadingXXLarge>{`HeadingXXLarge - ${textString}`}</HeadingXXLarge>
    </React.Fragment>
  );
}
