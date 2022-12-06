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
import type { RadioGroupProps, StatefulRadioGroupProps } from './types';
// Styled elements

const StatefulRadioGroup = function (
  props: StatefulRadioGroupProps & Omit<RadioGroupProps, keyof StatefulRadioGroupProps>
) {
  const { children, ...restProps } = props;
  return (
    // @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete
    <StatefulContainer {...restProps}>
      {(childrenProps: RadioGroupProps) => <RadioGroup {...childrenProps}>{children}</RadioGroup>}
    </StatefulContainer>
  );
};
StatefulRadioGroup.displayName = 'StatefulRadioGroup';
export default StatefulRadioGroup;
