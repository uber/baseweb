/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import InputMask from 'react-input-mask';

import Input from './input';
import { Input as StyledInput } from './styled-components';
import type { MaskedInputProps } from './types';

const MaskOverride = React.forwardRef<HTMLInputElement, MaskedInputProps>(
  (
    {
      // do nothing with these - we just don't want to pass it to the InputMask, as
      // it does not have these properties
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      startEnhancer,

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      endEnhancer,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      error,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      positive,

      // below are props that are used by the masked-input
      onChange,

      onFocus,
      onBlur,
      value,
      disabled,
      readOnly,
      ...restProps
    }: MaskedInputProps,
    ref
  ) => {
    return (
      <InputMask
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        value={value}
        disabled={disabled}
        readOnly={readOnly}
        {...restProps}
      >
        {(props) => (
          <StyledInput
            ref={ref}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            value={value}
            disabled={disabled}
            readOnly={readOnly}
            {...props}
          />
        )}
      </InputMask>
    );
  }
);
MaskOverride.displayName = 'MaskOverride';

export default function MaskedInput({
  mask,
  maskChar,
  overrides: { Input: inputOverride = {}, ...restOverrides } = {},
  ...restProps
}: MaskedInputProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let componentOverride: any = MaskOverride;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let propsOverride: any = {};
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let styleOverride: any = {};

  if (typeof inputOverride === 'function') {
    componentOverride = inputOverride;
  } else if (typeof inputOverride === 'object') {
    componentOverride = inputOverride.component || componentOverride;
    propsOverride = inputOverride.props || {};
    styleOverride = inputOverride.style || {};
  }

  if (typeof propsOverride === 'object') {
    propsOverride = {
      ...propsOverride,
      mask: propsOverride.mask || mask,
      maskChar: propsOverride.maskChar || maskChar,
    };
  }

  const nextOverrides = {
    Input: {
      component: componentOverride,
      props: propsOverride,
      style: styleOverride,
    },
    ...restOverrides,
  };
  return <Input {...restProps} overrides={nextOverrides} />;
}

MaskedInput.defaultProps = {
  maskChar: ' ',
};
