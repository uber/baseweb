/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';
import StatefulPhoneInputContainer from './stateful-phone-input-container';
import PhoneInput from './phone-input';
import defaultProps from './default-props';
import type { PhoneInputProps, StatefulPhoneInputProps } from './types';

StatefulPhoneInput.defaultProps = defaultProps;

export default function StatefulPhoneInput(props: StatefulPhoneInputProps) {
  return (
    // @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete
    <StatefulPhoneInputContainer {...props}>
      {(childrenProps: PhoneInputProps) => <PhoneInput {...childrenProps} />}
    </StatefulPhoneInputContainer>
  );
}
