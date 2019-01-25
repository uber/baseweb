# Typography package

This proposal is to create a `baseui/typography` package containing the typography components. These components codify the [BaseUI typography standards](https://www.figma.com/file/L7MSVAit4clxkfGE22NMX86Q/%E2%9D%96-Base-UI?node-id=19590%3A824) for H1 .. H6, Display, Caption, CaptionLabel, Label1, Label2, P1, P2,

## Motivation

Form interfaces, as well as informational pages, in Web apps have a text blocks. BaseUI has a set of standards for these text elements. Designers use them in their designs. This proposal enables developers to use these elements just like other BaseUI components.

## Usage

```javascript
import * as React from 'react';
import {H1, P1} from 'baseui/typography';

export default () => (
  <React.Fragment>
    <H1>BaseUI Heading/H1 Title</H1>
    <P1>We ignite opportunity by setting the world in motion</P1>
  </React.Fragment>
);
```

## Exports

* `Display`
* `Caption`
* `CaptionLabel`
* `H1`
* `H2`
* `H3`
* `H4`
* `H5`
* `H6`
* `Label1`
* `Label2`
* `P1`
* `P2`

## `Display`, `CaptionLabel`, `Label1`, `Label2` API

Same as [<div> MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div)

## `H1`, `H2`, `H3`, `H4`, `H5`, `H6` API

Same as [<h1>–<h6> MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements)

## `Caption` API

Same as [<caption> MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/caption)

## `P1`, `P2` API

Same as [<p> MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/p)

## Dependencies

Does this component depend on any 3rd party packages or other internal components?

For all but `Display`, <Block> with `as` attribute will be used to create the components. `Display` needs to change the fontFamily to secondary font. In all cases, `typography.font*` will be used and the theme's secondary font family.

## Accessibility

What are the accessibility best practices for this component (aria-\*, role, etc.)
Same as how the respective HTML element deal with accessibility concerns.  For example, for [<p>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/p#Accessibility_concerns) or [<h1>...<h6>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements#Accessibility_concerns)
