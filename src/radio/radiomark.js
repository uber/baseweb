/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {RadioMarkOuter, RadioMarkInner} from './styled-components.js';

function RadioMark(props: *) {
  if (__DEV__) {
    // eslint-disable-next-line no-console
    console.warn(`This StyledRadioMark component will be deprecated in the next major version. Please
      update your code to use the 'StyledRadioInner' and 'StyledRadioOuter' instead. If you
      are using the 'StyledRadio' component, replace that with the 'Radio' component and this warning
      should go away. See examples at https://baseui.design/components/radio/.
    `);
  }

  return (
    <RadioMarkOuter {...props}>
      <RadioMarkInner {...props} />
    </RadioMarkOuter>
  );
}

export default RadioMark;
