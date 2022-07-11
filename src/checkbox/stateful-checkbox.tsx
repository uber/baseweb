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
import type { StatefulContainerChildPropsT, StatefulCheckboxPropsT } from './types';
// Styled elements

const StatefulCheckbox = function (props: StatefulCheckboxPropsT) {
  return (
    <StatefulContainer {...props}>
      {(childrenProps: StatefulContainerChildPropsT) => (
        <Checkbox {...childrenProps}>{props.children}</Checkbox>
      )}
    </StatefulContainer>
  );
};
StatefulCheckbox.displayName = 'StatefulCheckbox';
export default StatefulCheckbox;
