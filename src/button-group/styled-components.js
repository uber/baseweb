/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import {withStyle} from 'styletron-react';

import {BaseButton} from '../button/styled-components.js';

export const StyledButton = withStyle(BaseButton, (props: Object) => ({
  backgroundColor: 'red',
}));
