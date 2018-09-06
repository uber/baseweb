# Card Component

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

* `action: React.Node` - Optional
  Contents of the `StyledAction` component
* `children: React.Node` - Optional
  Contents of the `StyledBody` component
* `hasThumbnail: ({+thumbnail?: string}) => boolean` - Optional
  Function that takes `Card` props and returns a boolean that represents if a thumbnail will be rendered
* `headerImage: string` - Optional
  `src` of the `StyledHeaderImage` component
* `overrides: {Action, Body, Contents, HeaderImage, Root, Thumbnail, Title}` - Optional
  * `Action: OverrideObjectT` - Optional
  * `Body: OverrideObjectT` - Optional
  * `Contents: OverrideObjectT` - Optional
  * `HeaderImage: OverrideObjectT` - Optional
  * `Root: OverrideObjectT` - Optional
  * `Thumbnail: OverrideObjectT` - Optional
  * `Title: OverrideObjectT` - Optional
    Overrides for presentational components.
* `thumbnail: string` - Optional
  `src` of the `StyledThumbnail` component
* `title: React.Node` - Optional
  Contents of the `StyledTitle` component

## Usage

Basic usage:

```javascript
import * as React from 'react';
import {Card} from 'baseui/card';

export default () => <Card title="This is a card" />;
```

## Dependencies

No external dependencies. It will depend on internal button and title components once they are built

## Accessibility

Ensure that action elements support keyboard interaction.
Ensure that all images have meaningful `alt` tags
