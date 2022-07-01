/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { Card, type ImagePropsT, StyledBody } from '../index';
import { header as headerImg, thumbnail as thumbnailImg } from '../images';
import { styled } from '../../styles/index';

const Container = styled('div', { width: '328px' });

const headerImage: ImagePropsT = {
  src: headerImg,
  srcSet: `${thumbnailImg}, ${headerImg} 1.5x`,
  alt: 'Card Alt Entry',
};

export function Scenario() {
  return (
    <Container>
      <Card headerImage={headerImage} title="Card Title Entry">
        <StyledBody>
          Proin ut dui sed metus pharetra hend rerit vel non mi. Nulla ornare faucibus ex, non
          facilisis nisl. Maecenas aliquet mauris ut tempus cursus. Etiam semper luctus sem ac
          blandit.
        </StyledBody>
      </Card>
    </Container>
  );
}
