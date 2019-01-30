# Typography Components

`baseui/typography` contains the BaseUI typography components. These components codify the BaseUI typography standards for H1 .. H6, Display, Caption1, Caption2, Label1, Label2, Paragraph1, Paragraph2.

## Motivation

Form interfaces, as well as informational pages, in Web apps have text blocks. BaseUI has a set of standards for these. Designers use them in their designs. This set of BaseUI typography components provide developers with an easy, out-of-the-box, means to use the standard text blocks without creating `styled` or higher-order components.

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

If `color`, `margin`, `padding`, etc. are different and they are available as [&lt;Block&gt; attributes](https://github.com/uber-web/baseui/blob/master/src/block/README.md), they can be used on the typography component (e.g., `<H2 position="absolute" bottom="0" left="10px">`).

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

The &lt;Block&gt; component is the underlying building block for the typography components.  All attributes available in [&lt;Block&gt; API](https://github.com/uber-web/baseui/blob/master/src/block/README.md) are available to the typography components as enhancements (e.g., using a different color, different padding/margins).

## Accessibility

Same as how the respective HTML element deal with accessibility concerns.  For example, for [&lt;p&gt;](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/p#Accessibility_concerns) or [&lt;h1&gt;–&lt;h6&gt;](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements#Accessibility_concerns)