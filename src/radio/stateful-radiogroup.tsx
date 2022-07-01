/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
// eslint-disable-next-line import/no-named-default
import StatefulContainer from './stateful-radiogroup-container';
// eslint-disable-next-line import/no-named-default
import RadioGroup from './radiogroup';
import type { PropsT, StatefulRadioGroupPropsT } from './types';
// Styled elements

const StatefulRadioGroup = function (props: StatefulRadioGroupPropsT) {
  const { children, ...restProps } = props;
  return (
    <StatefulContainer {...restProps}>
      {(childrenProps: PropsT) => <RadioGroup {...childrenProps}>{children}</RadioGroup>}
    </StatefulContainer>
  );
};
StatefulRadioGroup.displayName = 'StatefulRadioGroup';
export default StatefulRadioGroup;
