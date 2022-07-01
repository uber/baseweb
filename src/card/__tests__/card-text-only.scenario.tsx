/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import { Card, StyledBody } from '../index.js';
import { styled } from '../../styles/index.js';

const Container = styled('div', { width: '328px' });

export function Scenario() {
  return (
    <Container>
      <Card>
        <StyledBody>
          Proin ut dui sed metus pharetra hend rerit vel non mi. Nulla ornare faucibus ex, non
          facilisis nisl. Maecenas aliquet mauris ut tempus cursus. Etiam semper luctus sem ac
          blandit.
        </StyledBody>
      </Card>
    </Container>
  );
}
