/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import StatefulContainer from './stateful-select-container';
import Select from './select';
import defaultProps from './default-props';
import type { SelectProps, StatefulSelectProps } from './types';

export default function StatefulSelect(props: StatefulSelectProps) {
  return (
    // @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete
    <StatefulContainer {...props}>
      {(childrenProps: SelectProps) => <Select {...childrenProps} />}
    </StatefulContainer>
  );
}

StatefulSelect.defaultProps = defaultProps;
