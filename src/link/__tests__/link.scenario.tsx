/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { StyledLink } from '..';
import { Block } from '../../block';

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
