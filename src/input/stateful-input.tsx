/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import StatefulContainer from './stateful-container';
import Input from './input';
import type { InputProps, StatefulInputProps } from './types';

export default function StatefulInput(props: StatefulInputProps) {
  return (
    <StatefulContainer {...props}>
      {(childrenProps: InputProps) => <Input {...childrenProps} />}
    </StatefulContainer>
  );
}
