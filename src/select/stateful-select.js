/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import React from 'react';
// eslint-disable-next-line import/no-named-default
import {default as StatefulContainer} from './stateful-select-container';
// eslint-disable-next-line import/no-named-default
import {default as Select} from './select';
import type {PropsT, StatefulSelectPropsT} from './types';
// Styled elements

const StatefulSelect = function(props: StatefulSelectPropsT) {
  return (
    <StatefulContainer {...props}>
      {(childrenProps: PropsT) => <Select {...childrenProps} />}
    </StatefulContainer>
  );
};
StatefulSelect.displayName = 'StatefulSelect';
export default StatefulSelect;
