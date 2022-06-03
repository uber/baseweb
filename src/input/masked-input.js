/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
// $FlowFixMe
import { IMaskMixin } from 'react-imask';

import Input from './input.js';
import MaskedInputDeprecated from './masked-input-deprecated.js';
import type { MaskedInputPropsT } from './types.js';

// converts react-input-mask (RIM) templates to imask (IM) templates
// RIM specifies numerical digits as '9' characters and IM uses '0'
// '9' characters escaped by a backslash are interpreted as literals
// https://github.com/sanniassin/react-input-mask#mask
// https://imask.js.org/guide.html#masked-pattern
function transformMask(input) {
  let output = '';
  let index = 0;

  while (index < input.length) {
    const char = input[index];
    const next = input[index + 1];

    if (char === '\\' && next === '9') {
      output += '9';
      index += 1;
    } else if (char === '9') {
      output += '0';
    } else if (char === '0') {
      output += '\\0';
    } else {
      output += char;
    }

    index += 1;
  }

  return output;
}

const MaskedInputInner = IMaskMixin(({ inputRef, ...props }) => {
  return <Input inputRef={inputRef} {...props} />;
});

export default function MaskedInput(props: MaskedInputPropsT) {
  if (props.maskChar) {
    if (__DEV__) {
      console.error("[baseui] 'maskChar' prop is deprecated from the MaskedInput component");
    }
    return <MaskedInputDeprecated {...props} />;
  }

  const { mask, maskChar, onChange, ...restProps } = props;

  function handleAccept(value, maskRef, event) {
    if (event && onChange) {
      onChange(event);
    }
  }

  return (
    <MaskedInputInner
      mask={mask ? transformMask(mask) : undefined}
      // mask={'\\a\\000'}
      // mask="\a\000"
      onAccept={handleAccept}
      {...restProps}
    />
  );
}
