# baseui/heading

This is a proposal to create a new component `baseui/heading` that can serve as a smarter alternative to `baseui/typography/h*` family components. If this proposal gets approved and implemented we should slowly deprecate `baseui/typography/h*` components.

## Motivation

Headings are absolutely critical for screen reader users and it's important to correctly set their levels. For example, you should never skip a level (having h2 and not h1 on the same page).

The problem is that levels are a question of context. When you move components with headings around, you need to check if levels still make sense and adjust them if not. That's a lot of mundane work and developers often rather take shortcuts such as using `h1` element only.

There is proposal for an `<h>` element and [document outline algorithm](http://adrianroselli.com/2016/08/there-is-no-document-outline-algorithm.html) to solve this problem once for all but there is no browser support yet. Fortunately, we [can use React Context](https://medium.com/@Heydon/managing-heading-levels-in-design-systems-18be9a746fa3) to implement our own document outline algorithm.

## Usage

```jsx
import * as React from 'react';
import {Heading, HeadingLevel} from 'baseui/heading';
export default () => (
  <HeadingLevel>
    <Heading>Base Web</Heading>
    Welcome
    <HeadingLevel>
      <Heading>Introduction</Heading>
      Introduction of Base Web
      <HeadingLevel>
        <Heading>Quotes</Heading>
      </HeadingLevel>
      <Heading>Motivation</Heading>
      Our motivation
    </HeadingLevel>
  </HeadingLevel>
```

This would output

```html
<h1 class=".h1">Base Web</h1>
Welcome
<h2 class=".h2">Introduction</h2>
Introduction of Base Web
<h3 class=".h3">Quotes</h3>
<h2 class=".h2">Motivation</h2>
Our motivation
```

As you can see, the component keeps track of its context and sets the correct levels automatically.

h1, h2... h6 elements would match the styles of our current typography elements.

## Set the style level manually

Ideally, the user will use the default styles but sometimes it might make sense to set a fixed style no matter what the level was used.

```jsx
export default () => (
  <HeadingLevel>
    <Heading>Level 1</Heading>
    <HeadingLevel>
      <Heading styleLevel={1}>Level 2</Heading>
      <Heading styleLevel={3}>Level 2</Heading>
    </HeadingLevel>
  </HeadingLevel>
```

would output something like this

```html
<h1 class=".h1">Level 1<h1>
<h2 class=".h1">Level 2<h2>
<h2 class=".h3">Level 2<h2>
```

## Landmark elements

There are many new HTML5 elements as `<section>`, `<header>`, `<main>` or `<footer>`. In theory, they should be eventually used to determine the resulting outline. However, since browsers didn't agreed yet on a standardized outline algorithm, it's still up to the user to explictily set it with h1...h6 elements.

## API

The Heading component will have the same API as all other Base Web components with an adition of the optional `styleLevel` prop.
