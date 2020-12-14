/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import React from 'react';
import StatefulPhoneInputContainer from './stateful-phone-input-container.js';
import PhoneInput from './phone-input.js';
import defaultProps from './default-props.js';
import type {PropsT, StatefulPhoneInputPropsT} from './types.js';

StatefulPhoneInput.defaultProps = defaultProps;

export default function StatefulPhoneInput(props: StatefulPhoneInputPropsT) {
  return (
    <StatefulPhoneInputContainer {...props}>
      {(childrenProps: PropsT) => <PhoneInput {...childrenProps} />}
    </StatefulPhoneInputContainer>
  );
}
