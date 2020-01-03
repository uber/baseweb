/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {
  Card,
  StyledAction,
  StyledBody,
  StyledThumbnail,
  StyledTitle,
} from '../index.js';
import {Button} from '../../button/index.js';
import {styled} from '../../styles/index.js';

import {thumbnail} from '../images.js';

export const name = 'card';

const Container = styled('div', {width: '328px'});

export const component = () => (
  <Container>
    <Card>
      <StyledThumbnail src={thumbnail} alt="my-image" />
      <StyledTitle $hasThumbnail={true}>Card Title Entry</StyledTitle>
      <StyledBody>Card text</StyledBody>
      <StyledAction>
        <Button style={{width: '100%'}}>Button Label</Button>
      </StyledAction>
    </Card>
  </Container>
);
