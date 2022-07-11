/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';
import StatefulPhoneInputContainer from './stateful-phone-input-container';
import PhoneInputNext from './phone-input-next';
import defaultProps from './default-props';
import type { PropsT, StatefulPhoneInputPropsT } from './types';

StatefulPhoneInputNext.defaultProps = { ...defaultProps, clearable: true };

export default function StatefulPhoneInputNext(props: StatefulPhoneInputPropsT) {
  return (
    <StatefulPhoneInputContainer {...props}>
      {(childrenProps: PropsT) => <PhoneInputNext {...childrenProps} />}
    </StatefulPhoneInputContainer>
  );
}
