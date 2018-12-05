# Card Component

## Usage

Basic usage:

```javascript
import * as React from 'react';
import {Card} from 'baseui/card';

export default () => <Card title="This is a card" />;
```

Props based usage:

```javascript
import * as React from 'react';
import {Card} from 'baseui/card';
import {StyledLink} from 'baseui/link';

export default () => (
  <Card
   action={<StyledLink href="#">Link to a Place</StyledLink>}
   thumbnail="thumbnail_image.p"
   overrides={{
     Thumbnail: {
       props: {
         alt: 'Descriptive card thumbnail image title',
       },
     },
   }}
   title="Card title goes here"
  >
    Card body contents go here.
  </Card>
);
```

Composition based usage:

```javascript
import * as React from 'react';
import {Card} from 'baseui/card';
import {StyledAction, StyledBody, StyledThumbnail, StyledTitle} from 'baseui/card';

export default () => (
  <Card>
    <StyledThumbnail src="thumbnail_image.png" alt="Descriptive card thumbnail image title" />
    {/*
      Note that $hasThumbnail is not computed for you when using the styled components
      directly and must be manually passed to the StyledTitle component.
    */}
    <StyledTitle $hasThumbnail={true}>Card title goes here</StyledTitle>
    <StyledBody>Card body contents go here.</StyledBody>
    <StyledAction>
      <StyledLink href="#">Link to a Place</StyledLink>
    </StyledAction>
  </Card>
);
```

## Exports

* `Card`
* `StyledAction`
* `StyledBody`
* `StyledContents`
* `StyledHeaderImage`
* `StyledRoot`
* `StyledThumbnail`
* `StyledTitle`

## `Card` API

* `action?: React.Node = undefined`
  * Contents to be rendered at the bottom of the `Card`. Used to organize UI which enables user
    action.
* `children?: React.Node = undefined`
  * Content to be rendered within the `Card` body.
* `hasThumbnail?: ({+thumbnail?: string}) => boolean = () => false`
  * Function that takes `Card` props and returns a boolean that represents if a thumbnail will be
  rendered.
* `headerImage?: string = undefined`
  * Image `src` to be positioned at the top of the `Card`.
* `overrides?: {Action, Body, Contents, HeaderImage, Root, Thumbnail, Title} = {}`
  * `Action?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
  * `Body: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
  * `Contents: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
  * `HeaderImage: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
  * `Root: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
  * `Thumbnail: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
  * `Title: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
* `thumbnail?: string = null`
  * Image `src` that by default is rendered to the side of children content.
* `title?: React.Node = null`
  * Content to render above the body content.

## Accessibility

* Ensure that action elements support keyboard interaction.
* Ensure that all images have meaningful `alt` tags
