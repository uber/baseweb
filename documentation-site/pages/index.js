/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import {Card, StyledTitle, StyledBody} from 'baseui/card';

export default function Hello() {
  return (
    <Card>
      <StyledTitle>Hello from Base UI</StyledTitle>
      <StyledBody>Lorem ipsum...</StyledBody>
    </Card>
  );
}
