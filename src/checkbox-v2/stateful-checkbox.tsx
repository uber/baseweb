/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import StatefulContainer from './stateful-checkbox-container';
import Checkbox from './checkbox';
import type { StatefulContainerChildProps, StatefulCheckboxProps } from './types';
// Styled elements

const StatefulCheckbox = function (props: StatefulCheckboxProps) {
  return (
    <StatefulContainer {...props}>
      {(childrenProps: StatefulContainerChildProps) => (
        <Checkbox {...childrenProps}>{props.children}</Checkbox>
      )}
    </StatefulContainer>
  );
};
StatefulCheckbox.displayName = 'StatefulCheckbox';
export default StatefulCheckbox;
