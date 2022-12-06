/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
// eslint-disable-next-line import/no-named-default
import { default as StatefulContainer } from './stateful-checkbox-container';
// eslint-disable-next-line import/no-named-default
import { default as Checkbox } from './checkbox';
import type { StatefulContainerChildProps, StatefulCheckboxProps } from './types';
// Styled elements

const StatefulCheckbox = function (props: StatefulCheckboxProps) {
  return (
    // @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete
    <StatefulContainer {...props}>
      {(childrenProps: StatefulContainerChildProps) => (
        <Checkbox {...childrenProps}>{props.children}</Checkbox>
      )}
    </StatefulContainer>
  );
};
StatefulCheckbox.displayName = 'StatefulCheckbox';
export default StatefulCheckbox;
