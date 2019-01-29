# Typography Components

`baseui/typography` contains the BaseUI typography components. These components codify the BaseUI typography standards for H1 .. H6, Display, Caption1, Caption2, Label1, Label2, Paragraph1, Paragraph2.

## Motivation

Form interfaces, as well as informational pages, in Web apps have text blocks. BaseUI has a set of standards for these. Designers use them in their designs. This set of BaseUI components enable developers an easier out-of-the-box path to the BaseUI standard text blocks.

## Usage

```javascript
import * as React from 'react';
import {H1, Paragraph1} from 'baseui/typography';
export default () => (
  <React.Fragment>
    <H1>BaseUI Heading/H1 Title</H1>
    <Paragraph1>We ignite opportunity by setting the world in motion</Paragraph1>
  </React.Fragment>
);
```

## Exports

* `Display`
* `Caption1`
* `Caption2`
* `H1`
* `H2`
* `H3`
* `H4`
* `H5`
* `H6`
* `Label1`
* `Label2`
* `Paragraph1`
* `Paragraph2`

NOTE: These components take the same set of attributes that are in [&lt;Block&gt; API](https://github.com/uber-web/baseui/blob/master/src/block/README.md).

## Display, Caption1, Caption2, Label1, Label2 API

Same as [&lt;div&gt; MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div)

## H1, H2`, H3, H4, H5, H6 API

Same as [&lt;h1&gt;–&lt;h6&gt; MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements)

## Paragraph1, Paragraph2 API

Same as [&lt;p&gt; MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/p)

## Dependencies

Does this component depend on any 3rd party packages or other internal components?

For all but `Display`, <Block> with `as` attribute will be used to create the components. `Display` needs to change the fontFamily to secondary font. In all cases, `typography.font*` will be used and the theme's secondary font family.

## Accessibility

What are the accessibility best practices for this component (aria-\*, role, etc.)
Same as how the respective HTML element deal with accessibility concerns.  For example, for [&lt;p&gt;](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/p#Accessibility_concerns) or [&lt;h1&gt;–&lt;h6&gt;](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements#Accessibility_concerns)