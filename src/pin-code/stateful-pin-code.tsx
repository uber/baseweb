/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';
import defaultProps from './default-props';
import PinCode from './pin-code';
import StatefulPinCodeContainer from './stateful-pin-code-container';
import type { PropsT, StatefulPinCodePropsT } from './types';

StatefulPinCode.defaultProps = defaultProps;

export default function StatefulPinCode(props: StatefulPinCodePropsT) {
  return (
    <StatefulPinCodeContainer {...props}>
      {(childrenProps: PropsT) => <PinCode {...childrenProps} />}
    </StatefulPinCodeContainer>
  );
}
