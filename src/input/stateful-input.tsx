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
    // @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete
    <StatefulContainer {...props}>
      {(childrenProps: InputProps) => <Input {...childrenProps} />}
    </StatefulContainer>
  );
}
