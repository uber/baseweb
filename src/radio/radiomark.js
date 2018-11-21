/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import {RadioMarkOuter, RadioMarkInner} from './styled-components';

function RadioMark(props: *) {
  return (
    <RadioMarkOuter {...props}>
      <RadioMarkInner {...props} />
    </RadioMarkOuter>
  );
}

export default RadioMark;
