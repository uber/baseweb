/* @flow */
/*global module */
import React from 'react';

import {storiesOf} from '@storybook/react';

import {LightTheme} from '../themes';
import {ThemeProvider} from '../styles';

import BaseCard from './card';
import {
  Action as CardAction,
  Body as CardBody,
  Thumbnail as CardThumbnail,
  Title as CardTitle,
} from './styled-components';

import {thumbnail as thumbnailImg, header as headerImg} from './images';

import type {Props} from './card';

const cardWidth = '328px';
const placeholderTitle = 'Card Title Entry';
const placeholderText =
  'Proin ut dui sed metus pharetra hend rerit vel non mi. Nulla ornare faucibus ex, non facilisis nisl. Maecenas aliquet mauris ut tempus cursus. Etiam semper luctus sem ac blandit. ';

const Card = (props: Props) => (
  <BaseCard style={{width: cardWidth}} {...props} />
);
Card.defaultProps = {
  hasThumbnail: (props: {+thumbnail?: string}) => Boolean(props.thumbnail),
  overrides: {},
};

function Button(props) {
  return <button {...props} />;
}

storiesOf('Card', module)
  .addDecorator(story => (
    <ThemeProvider theme={LightTheme}>{story()}</ThemeProvider>
  ))
  .add('Headline & Text', () => (
    <Card>
      <CardTitle>{placeholderTitle}</CardTitle>
      <CardBody>{placeholderText}</CardBody>
    </Card>
  ))
  .add('Text only', () => (
    <Card style={{width: cardWidth}}>
      <CardBody>{placeholderText}</CardBody>
    </Card>
  ))
  .add('Text w/Link', () => (
    <Card>
      <CardTitle>{placeholderTitle}</CardTitle>
      <CardBody>{placeholderText}</CardBody>
      <CardAction>
        <a href="#">Link to a Place&nbsp;&nbsp;&nbsp;&gt;</a>
      </CardAction>
    </Card>
  ))
  .add('Text w/Button', () => (
    <Card>
      <CardTitle>{placeholderTitle}</CardTitle>
      <CardBody>{placeholderText}</CardBody>
      <CardAction>
        <Button style={{width: '100%'}}>Button Label</Button>
      </CardAction>
    </Card>
  ))
  .add('Headline & Text w/Thumbnail (props)', () => (
    <Card
      action={<Button style={{width: '100%'}}>Button Label</Button>}
      title={placeholderTitle}
      thumbnail={thumbnailImg}
    >
      {placeholderText}
    </Card>
  ))
  .add('Headline & Text w/Thumbnail (composed)', () => (
    <Card>
      <CardThumbnail src={thumbnailImg} />
      <CardTitle $hasThumbnail={true}>{placeholderTitle}</CardTitle>
      <CardBody>{placeholderText}</CardBody>
      <CardAction>
        <Button style={{width: '100%'}}>Button Label</Button>
      </CardAction>
    </Card>
  ))
  .add('w/Thumbnail & Link', () => (
    <Card thumbnail={thumbnailImg} title={placeholderTitle}>
      <CardBody>{placeholderText}</CardBody>
      <CardAction>
        <a href="#">Link to a Place&nbsp;&nbsp;&nbsp;&gt;</a>
      </CardAction>
    </Card>
  ))
  .add('w/Thumbnail & Button', () => (
    <Card thumbnail={thumbnailImg} title={placeholderTitle}>
      <CardBody>{placeholderText}</CardBody>
      <CardAction>
        <Button style={{width: '100%'}}>Button Label</Button>
      </CardAction>
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
      <CardBody>{placeholderText}</CardBody>
      <CardAction>
        <a href="#">Link to a Place&nbsp;&nbsp;&nbsp;&gt;</a>
      </CardAction>
    </Card>
  ))
  .add('Text w/Image & Button', () => (
    <Card headerImage={headerImg} title={placeholderTitle}>
      <CardBody>{placeholderText}</CardBody>
      <CardAction>
        <Button style={{width: '100%'}}>Button Label</Button>
      </CardAction>
    </Card>
  ));
