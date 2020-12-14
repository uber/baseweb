/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import defaultProps from './default-props.js';
import PinCode from './pin-code.js';
import StatefulPinCodeContainer from './stateful-pin-code-container.js';
import type {PropsT, StatefulPinCodePropsT} from './types.js';

StatefulPinCode.defaultProps = defaultProps;

export default function StatefulPinCode(props: StatefulPinCodePropsT) {
  return (
    <StatefulPinCodeContainer {...props}>
      {(childrenProps: PropsT) => <PinCode {...childrenProps} />}
    </StatefulPinCodeContainer>
  );
}
