/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {StyledLink} from '../index.js';
import {Block} from '../../block/index.js';

export const name = 'link';

export const component = () => (
  <Block font="font450">
    <StyledLink href="#">I am a Link!</StyledLink>
  </Block>
);
