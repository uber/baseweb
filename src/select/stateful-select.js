/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';

import defaultProps from './default-props.js';
import Select from './select.js';
import StatefulContainer from './stateful-select-container.js';
import type {PropsT, StatefulSelectPropsT} from './types.js';

export default function StatefulSelect(props: StatefulSelectPropsT) {
  return (
    <StatefulContainer {...props}>
      {(childrenProps: PropsT) => <Select {...childrenProps} />}
    </StatefulContainer>
  );
}

StatefulSelect.defaultProps = defaultProps;
