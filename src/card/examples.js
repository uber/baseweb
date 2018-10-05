/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import React from 'react';
import {
  Card as BaseCard,
  StyledAction,
  StyledBody,
  StyledThumbnail,
  StyledTitle,
  hasThumbnail,
} from './';

import {Button} from '../button';

import {mergeOverrides} from '../helpers/overrides';

import {thumbnail as thumbnailImg, header as headerImg} from './images';

import type {CardsPropsT} from './types';

import examples from './examples-list';

const cardWidth = '328px';
const placeholderTitle = 'Card Title Entry';
const placeholderText =
  'Proin ut dui sed metus pharetra hend rerit vel non mi. Nulla ornare faucibus ex, non facilisis nisl. Maecenas aliquet mauris ut tempus cursus. Etiam semper luctus sem ac blandit. ';

const Card = (props: CardsPropsT) => {
  const {overrides, ...otherProps} = props;
  const cardOverrides = mergeOverrides(
    {
      Root: {
        style: {
          width: cardWidth,
        },
      },
    },
    overrides,
  );
  //$FlowFixMe
  return <BaseCard {...otherProps} overrides={cardOverrides} />;
};
Card.defaultProps = {
  hasThumbnail,
  overrides: {},
};

export default {
  [examples.TEXT_ONLY]: function Story1() {
    return (
      <Card>
        <StyledBody>{placeholderText}</StyledBody>
      </Card>
    );
  },
  [examples.TEXT_IMAGE]: function Story2() {
    return (
      <Card headerImage={headerImg} title={placeholderTitle}>
        {placeholderText}
      </Card>
    );
  },
  [examples.TEXT_IMAGE_LINK]: function Story3() {
    return (
      <Card headerImage={headerImg} title={placeholderTitle}>
        <StyledBody>{placeholderText}</StyledBody>
        <StyledAction>
          <a href="#">Link to a Place&nbsp;&nbsp;&nbsp;&gt;</a>
        </StyledAction>
      </Card>
    );
  },
  [examples.TEXT_IMAGE_BUTTON]: function Story4() {
    return (
      <Card headerImage={headerImg} title={placeholderTitle}>
        <StyledBody>{placeholderText}</StyledBody>
        <StyledAction>
          <Button style={{width: '100%'}}>Button Label</Button>
        </StyledAction>
      </Card>
    );
  },
  [examples.TEXT_LINK]: function Story5() {
    return (
      <Card>
        <StyledTitle>{placeholderTitle}</StyledTitle>
        <StyledBody>{placeholderText}</StyledBody>
        <StyledAction>
          <a href="#">Link to a Place&nbsp;&nbsp;&nbsp;&gt;</a>
        </StyledAction>
      </Card>
    );
  },
  [examples.TEXT_BUTTON]: function Story6() {
    return (
      <Card>
        <StyledTitle>{placeholderTitle}</StyledTitle>
        <StyledBody>{placeholderText}</StyledBody>
        <StyledAction>
          <Button style={{width: '100%'}}>Button Label</Button>
        </StyledAction>
      </Card>
    );
  },
  [examples.HEADLINE_TEXT_THUMBNAIL]: function Story7() {
    return (
      <Card thumbnail={thumbnailImg} title={placeholderTitle}>
        <StyledBody>{placeholderText}</StyledBody>
        <StyledAction>
          <Button style={{width: '100%'}}>Button Label</Button>
        </StyledAction>
      </Card>
    );
  },
  [examples.HEADLINE_IMAGE]: function Story8() {
    return <Card headerImage={headerImg} title={placeholderTitle} />;
  },
  [examples.HEADLINE_TEXT]: function Story9() {
    return (
      <Card>
        <StyledTitle>{placeholderTitle}</StyledTitle>
        <StyledBody>{placeholderText}</StyledBody>
      </Card>
    );
  },
  [examples.THUMBNAIL_LINK]: function Story10() {
    return (
      <Card thumbnail={thumbnailImg} title={placeholderTitle}>
        <StyledBody>{placeholderText}</StyledBody>
        <StyledAction>
          <a href="#">Link to a Place&nbsp;&nbsp;&nbsp;&gt;</a>
        </StyledAction>
      </Card>
    );
  },
  [examples.THUMBNAIL_BUTTON]: function Story11() {
    return (
      <Card thumbnail={thumbnailImg} title={placeholderTitle}>
        <StyledBody>{placeholderText}</StyledBody>
        <StyledAction>
          <Button style={{width: '100%'}}>Button Label</Button>
        </StyledAction>
      </Card>
    );
  },
  [examples.KITCHEN_SINK_PROPS]: function Story12() {
    return (
      <Card
        action={<Button style={{width: '100%'}}>Button Label</Button>}
        headerImage={headerImg}
        title={placeholderTitle}
        thumbnail={thumbnailImg}
      >
        {placeholderText}
      </Card>
    );
  },
  [examples.KITCHEN_SINK_COMPOSED]: function Story13() {
    return (
      <Card headerImage={headerImg}>
        <StyledThumbnail src={thumbnailImg} />
        <StyledTitle $hasThumbnail={true}>{placeholderTitle}</StyledTitle>
        <StyledBody>{placeholderText}</StyledBody>
        <StyledAction>
          <Button style={{width: '100%'}}>Button Label</Button>
        </StyledAction>
      </Card>
    );
  },
};
