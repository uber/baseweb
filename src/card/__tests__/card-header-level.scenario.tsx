/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import { Heading, HeadingLevel } from '../../heading/index.js';
import { Card, StyledBody } from '../index.js';
import { styled } from '../../styles/index.js';
import { header } from '../images.js';

const Container = styled('div', { width: '328px' });

export function Scenario() {
  return (
    <div>
      <HeadingLevel>
        <Heading>This should be H1</Heading>
        <HeadingLevel>
          <Heading>This should be H2</Heading>
          <HeadingLevel>
            <Heading>This should be H3</Heading>
            <Container>
              <Card headerImage={header} title="Card Title Should be H3">
                <StyledBody>
                  Proin ut dui sed metus pharetra hend rerit vel non mi. Nulla ornare faucibus ex,
                  non facilisis nisl. Maecenas aliquet mauris ut tempus cursus. Etiam semper luctus
                  sem ac blandit.
                </StyledBody>
              </Card>
            </Container>
          </HeadingLevel>
        </HeadingLevel>
      </HeadingLevel>
    </div>
  );
}
