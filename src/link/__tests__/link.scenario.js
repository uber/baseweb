/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import { StyledLink } from '../index.js';
import { Block } from '../../block/index.js';

export function Scenario() {
  return (
    <Block font="font450">
      <StyledLink href="#">I am a Link!</StyledLink>
      <br />
      <br />
      <StyledLink animateUnderline href="#">
        animate underline
      </StyledLink>
    </Block>
  );
}
