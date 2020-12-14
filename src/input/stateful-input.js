/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import StatefulContainer from './stateful-container.js';
import Input from './input.js';
import type {StatefulInputPropsT} from './types.js';

export default function StatefulInput(props: StatefulInputPropsT) {
  return (
    <StatefulContainer {...props}>
      {(childrenProps: *) => <Input {...childrenProps} />}
    </StatefulContainer>
  );
}
