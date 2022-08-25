/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { Card, StyledAction, StyledBody } from '..';
import { StyledLink } from '../../link';
import { styled } from '../../styles';

import { header } from './images';

const Container = styled('div', { width: '328px' });

export function Scenario() {
  return (
    <Container>
      <Card headerImage={header} title="Card Title Entry">
        <StyledBody>
          Proin ut dui sed metus pharetra hend rerit vel non mi. Nulla ornare faucibus ex, non
          facilisis nisl. Maecenas aliquet mauris ut tempus cursus. Etiam semper luctus sem ac
          blandit.
        </StyledBody>
        <StyledAction>
          <StyledLink href="#">Link to a Place</StyledLink>
        </StyledAction>
      </Card>
    </Container>
  );
}
