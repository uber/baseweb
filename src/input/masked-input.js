/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import InputMask from 'react-input-mask';

import Input from './input.js';
import {Input as StyledInput} from './styled-components.js';
import type {MaskedInputPropsT} from './types.js';

function MaskOverride(props: MaskedInputPropsT) {
  return (
    <InputMask {...props}>
      {({startEnhancer, endEnhancer, error, ...maskProps}) => {
        return <StyledInput {...maskProps} />;
      }}
    </InputMask>
  );
}

export default function MaskedInput(props: MaskedInputPropsT) {
  const {
    overrides: {Input: inputOverride, ...restOverrides} = {},
    ...restProps
  } = props;
  const nextOverrides = {
    Input: {
      component: MaskOverride,
      props: restProps,
      ...(typeof inputOverride === 'object' ? inputOverride : {}),
    },
    ...restOverrides,
  };

  return <Input {...props} overrides={nextOverrides} />;
}

MaskedInput.defaultProps = {
  ...Input.defaultProps,
  maskChar: ' ',
};
