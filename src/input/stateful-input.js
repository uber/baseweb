/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import React from 'react';
import StatefulContainer from './stateful-container';
import Input from './input';
import type {StatefulInputPropsT} from './types';

export default function StatefulInput(props: StatefulInputPropsT) {
  return (
    <StatefulContainer {...props}>
      {(childrenProps: *) => <Input {...childrenProps} />}
    </StatefulContainer>
  );
}
