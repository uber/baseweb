/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import React from 'react';
// eslint-disable-next-line import/no-named-default
import {default as StatefulContainer} from './stateful-checkbox-container';
// eslint-disable-next-line import/no-named-default
import {default as Checkbox} from './checkbox';
import type {PropsT, StatefulCheckboxPropsT} from './types';
// Styled elements

const StatefulCheckbox = function(props: StatefulCheckboxPropsT) {
  return (
    <StatefulContainer {...props}>
      {(childrenProps: PropsT) => (
        <Checkbox {...childrenProps}>{props.children}</Checkbox>
      )}
    </StatefulContainer>
  );
};
StatefulCheckbox.displayName = 'StatefulCheckbox';
export default StatefulCheckbox;
