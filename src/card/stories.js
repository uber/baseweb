/* @flow */
/*global module */
import React from 'react';

import {storiesOf} from '@storybook/react';
import {withReadme} from 'storybook-readme';

//$FlowFixMe
import CardReadme from '../../rfcs/card-component.md';

import {mergeOverrides} from '../helpers/overrides';

import {
  Card as BaseCard,
  StyledAction,
  StyledBody,
  StyledThumbnail,
  StyledTitle,
  hasThumbnail,
} from './';

import {Button} from '../button';

import {thumbnail as thumbnailImg, header as headerImg} from './images';

import type {CardsPropsT} from './types';

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

storiesOf('Card', module)
  .addDecorator(withReadme(CardReadme))
  .add('Headline & Text', () => (
    <Card>
      <StyledTitle>{placeholderTitle}</StyledTitle>
      <StyledBody>{placeholderText}</StyledBody>
    </Card>
  ))
  .add('Text only', () => (
    <Card>
      <StyledBody>{placeholderText}</StyledBody>
    </Card>
  ))
  .add('Text w/Link', () => (
    <Card>
      <StyledTitle>{placeholderTitle}</StyledTitle>
      <StyledBody>{placeholderText}</StyledBody>
      <StyledAction>
        <a href="#">Link to a Place&nbsp;&nbsp;&nbsp;&gt;</a>
      </StyledAction>
    </Card>
  ))
  .add('Text w/Button', () => (
    <Card>
      <StyledTitle>{placeholderTitle}</StyledTitle>
      <StyledBody>{placeholderText}</StyledBody>
      <StyledAction>
        <Button style={{width: '100%'}}>Button Label</Button>
      </StyledAction>
    </Card>
  ))
  .add('Headline & Text w/Thumbnail', () => (
    <Card thumbnail={thumbnailImg} title={placeholderTitle}>
      <StyledBody>{placeholderText}</StyledBody>
      <StyledAction>
        <Button style={{width: '100%'}}>Button Label</Button>
      </StyledAction>
    </Card>
  ))
  .add('w/Thumbnail & Link', () => (
    <Card thumbnail={thumbnailImg} title={placeholderTitle}>
      <StyledBody>{placeholderText}</StyledBody>
      <StyledAction>
        <a href="#">Link to a Place&nbsp;&nbsp;&nbsp;&gt;</a>
      </StyledAction>
    </Card>
  ))
  .add('w/Thumbnail & Button', () => (
    <Card thumbnail={thumbnailImg} title={placeholderTitle}>
      <StyledBody>{placeholderText}</StyledBody>
      <StyledAction>
        <Button style={{width: '100%'}}>Button Label</Button>
      </StyledAction>
    </Card>
  ))
  .add('Headline w/Image', () => (
    <Card headerImage={headerImg} title={placeholderTitle} />
  ))
  .add('Text w/Image', () => (
    <Card headerImage={headerImg} title={placeholderTitle}>
      {placeholderText}
    </Card>
  ))
  .add('Text w/Image & Link', () => (
    <Card headerImage={headerImg} title={placeholderTitle}>
      <StyledBody>{placeholderText}</StyledBody>
      <StyledAction>
        <a href="#">Link to a Place&nbsp;&nbsp;&nbsp;&gt;</a>
      </StyledAction>
    </Card>
  ))
  .add('Text w/Image & Button', () => (
    <Card headerImage={headerImg} title={placeholderTitle}>
      <StyledBody>{placeholderText}</StyledBody>
      <StyledAction>
        <Button style={{width: '100%'}}>Button Label</Button>
      </StyledAction>
    </Card>
  ))
  .add('Kitchen Sink (props)', () => (
    <Card
      action={<Button style={{width: '100%'}}>Button Label</Button>}
      headerImage={headerImg}
      title={placeholderTitle}
      thumbnail={thumbnailImg}
    >
      {placeholderText}
    </Card>
  ))
  .add('Kitchen Sink (composed)', () => (
    <Card headerImage={headerImg}>
      <StyledThumbnail src={thumbnailImg} />
      <StyledTitle $hasThumbnail={true}>{placeholderTitle}</StyledTitle>
      <StyledBody>{placeholderText}</StyledBody>
      <StyledAction>
        <Button style={{width: '100%'}}>Button Label</Button>
      </StyledAction>
    </Card>
  ));
