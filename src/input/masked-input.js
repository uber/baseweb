/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import InputMask from 'react-input-mask';

import Input from './input.js';
import {Input as StyledInput} from './styled-components.js';
import type {InputPropsT} from './types.js';

type PropsT = {
  ...InputPropsT,
  /** See pattern examples here: https://github.com/sanniassin/react-input-mask */
  mask?: string,
  /** Character to render for unfilled mask element. */
  maskChar?: string,
};

function MaskOverride(props: PropsT) {
  return (
    <InputMask {...props}>
      {({startEnhancer, endEnhancer, error, ...maskProps}) => {
        return <StyledInput {...maskProps} />;
      }}
    </InputMask>
  );
}

export default function MaskedInput(props: PropsT) {
  const {overrides = {}} = props;
  const nextOverrides = {
    // seems similar to the issue described in overrides.js
    // https://github.com/uber-web/baseui/blob/master/src/helpers/overrides.js#L32
    // eslint-disable-next-line flowtype/no-weak-types
    Input: ({component: MaskOverride, props}: any),
    ...overrides,
  };

  return <Input {...props} overrides={nextOverrides} />;
}

MaskedInput.defaultProps = {
  ...Input.defaultProps,
  maskChar: ' ',
};
