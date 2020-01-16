/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import InputMask from 'react-input-mask';

import Input from './input.js';
import {Input as StyledInput} from './styled-components.js';
import type {MaskedInputPropsT} from './types.js';

const MaskOverride = React.forwardRef<MaskedInputPropsT, HTMLElement>(
  (
    {
      // do nothing with these - we just don't want to pass it to the InputMask, as
      // it does not have these properties
      startEnhancer,
      endEnhancer,
      error,
      positive,
      // below are props that are used by the masked-input
      onChange,
      onFocus,
      onBlur,
      value,
      disabled,
      ...restProps
    }: MaskedInputPropsT,
    ref,
  ) => {
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
            ref={ref}
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
  },
);

export default function MaskedInput({
  mask,
  maskChar,
  overrides: {Input: inputOverride = {}, ...restOverrides} = {},
  ...restProps
}: MaskedInputPropsT) {
  const nextOverrides = {
    Input: {
      component: MaskOverride,
      props: {
        mask,
        maskChar,
        ...(inputOverride.props || {}),
      },
      style: {
        ...(inputOverride.style || {}),
      },
    },
    ...restOverrides,
  };

  return <Input {...restProps} overrides={nextOverrides} />;
}

MaskedInput.defaultProps = {
  maskChar: ' ',
};
