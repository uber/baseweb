/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import StatefulContainer from './stateful-radiogroup-container';
import RadioGroup from './radiogroup';
import type { RadioGroupProps, StatefulRadioGroupProps } from './types';

const StatefulRadioGroup = function (
  props: StatefulRadioGroupProps &
    Omit<RadioGroupProps, keyof StatefulRadioGroupProps>,
) {
  const { children, ...restProps } = props;
  return (
    <StatefulContainer {...restProps}>
      {(childrenProps: RadioGroupProps) => (
        <RadioGroup {...childrenProps}>{children}</RadioGroup>
      )}
    </StatefulContainer>
  );
};

export default StatefulRadioGroup;
