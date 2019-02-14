/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import {Checkbox} from '../checkbox/index.js';
import StyledRadioMark from './radiomark.js';

import {
  Label as StyledLabel,
  Input as StyledInput,
  Root as StyledRoot,
} from './styled-components.js';

const Radio = (props: *) => {
  if (__DEV__) {
    // eslint-disable-next-line no-console
    console.warn(`This StyledRadio component will be deprecated in the next major version. Please
      update your code to use the 'Radio' component instead. See examples at https://baseui.design/components/radio/.
    `);
  }

  return (
    <Checkbox
      overrides={{
        Root: StyledRoot,
        Checkmark: StyledRadioMark,
        Label: StyledLabel,
        Input: StyledInput,
      }}
      {...props}
    />
  );
};

export default Radio;
