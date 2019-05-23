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

function MaskOverride({
  startEnhancer,
  endEnhancer,
  error,
  onChange,
  onFocus,
  onBlur,
  value,
  disabled,
  ...restProps
}: MaskedInputPropsT) {
  return (
    <InputMask
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      value={value}
      disabled={disabled}
      {...restProps}
    >
      {props => (
        <StyledInput
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          value={value}
          disabled={disabled}
          {...props}
        />
      )}
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
