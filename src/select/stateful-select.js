/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import React from 'react';
import StatefulContainer from './stateful-select-container';
import Select from './select';
import type {PropsT, StatefulSelectPropsT} from './types';

export default function StatefulSelect(props: StatefulSelectPropsT) {
  return (
    <StatefulContainer {...props}>
      {(childrenProps: PropsT) => <Select {...childrenProps} />}
    </StatefulContainer>
  );
}
