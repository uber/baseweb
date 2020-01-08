/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {Card, type ImagePropsT, StyledBody} from '../index.js';
import {header as headerImg, thumbnail as thumbnailImg} from '../images.js';
import {styled} from '../../styles/index.js';

export const name = 'card-image-object';

const Container = styled('div', {width: '328px'});

const headerImage: ImagePropsT = {
  src: headerImg,
  srcSet: `${thumbnailImg}, ${headerImg} 1.5x`,
  alt: 'Card Alt Entry',
};

export const component = () => (
  <Container>
    <Card headerImage={headerImage} title="Card Title Entry">
      <StyledBody>
        Proin ut dui sed metus pharetra hend rerit vel non mi. Nulla ornare
        faucibus ex, non facilisis nisl. Maecenas aliquet mauris ut tempus
        cursus. Etiam semper luctus sem ac blandit.
      </StyledBody>
    </Card>
  </Container>
);
