# Block Component

One of the most common needs when building web apps is creating layout elements that have certain layout and typography styles.

For more traditional apps that use global stylesheets, many of the popular CSS frameworks have helper classes to quickly create styled elements (see [Bootstrap](https://getbootstrap.com/docs/4.1/utilities/sizing/), [Tachyons](http://tachyons.io/docs/layout/spacing/)). Uber's superfine css framework also had this and it was used very widely–just search something like `push-large` in sourcegraph.

The move to CSS-in-JS sort of eliminates these classes in favor of encapsulating styles within components. This is a generally a good thing because it promotes reusability, however the reality is that there are dozens or hundreds of different layout/spacing/typography combinations in any app, and there's not always a clear semantic meaning or potential for reuse. In practice you end up just defining and naming a bunch of things at the top of the file:

```js
const PricingPageHero = styled('div', {
  margin: '10px',
  color: '#ccc',
  display: 'flex',
});

const PricingPageHeroText = styled('h2', {
  margin: '10px',
});
```

## Proposal

### `<Block/>` Component

The `Block` component is a helper component that lets you write these common less-reusable elements more succinctly inline.

The above example might turn into:

```js
<Block margin="scale200" color="primary200" display="flex" flexDirection="column">
  <Block as="h2" margin="scale150" justifySelf="left">
    Simple Pricing
  </Block>
  {/* ... etc */}
</Block>
```

### `Block` API

All other props are spread onto the base element.

* `children: (props: Props) => React.Node` - Optional
* `as: string | React.Node` - Optional
  * Modifies the base element used to render the block
* `overrides: {Block}` - Optional
  * Block: {style: {} | () => {}} - Optional
* `color: String` - Optional
  * Accepts all themeable color properties (`primary200`, etc.)
* `font: String` - Optional
  * Accepts all themeable font properties (`font200`, etc.)
* `alignContent: 'start' | 'end' | 'center' | 'between' | 'around' | 'stretch'` - Optional
* `alignItems: 'start' | 'end' | 'center' | 'baseline' | 'stretch'` - Optional
* `alignSelf: 'auto' | 'start' | 'end' | 'center' | 'baseline' | 'stretch'` - Optional
* `flexDirection: 'row' | 'column'` - Optional
* `display: 'none' | 'flex' | 'block' | 'inline-block'` - Optional
* `flex: 'grow' | 'shrink' | 'none'` - Optional
* `justifyContent: 'start' | 'end' | 'center' | 'between' | 'around'` - Optional
* `justifySelf: string` - Optional
* `position: 'static' | 'absolute' | 'relative' | 'fixed'` - Optional
* `width: string` - Optional
* `minWidth: string` - Optional
* `maxWidth: string` - Optional
* `height: string` - Optional
* `minHeight: string` - Optional
* `maxHeight: string` - Optional
* `overflow: 'visible' | 'hidden' | 'scroll' | 'scrollX' | 'scrollY' | 'auto'` - Optional
* `margin: string` - Optional
  * Accepts all themeable sizing properties (`scale100`, etc.)
* `marginTop: string` - Optional
  * Accepts all themeable sizing properties (`scale100`, etc.)
* `marginRight: string` - Optional
  * Accepts all themeable sizing properties (`scale100`, etc.)
* `marginBottom: string` - Optional
  * Accepts all themeable sizing properties (`scale100`, etc.)
* `marginLeft: string` - Optional
  * Accepts all themeable sizing properties (`scale100`, etc.)
* `padding: string` - Optional
  * Accepts all themeable sizing properties (`scale100`, etc.)
* `paddingTop: string` - Optional
  * Accepts all themeable sizing properties (`scale100`, etc.)
* `paddingRight: string` - Optional
  * Accepts all themeable sizing properties (`scale100`, etc.)
* `paddingBottom: string` - Optional
  * Accepts all themeable sizing properties (`scale100`, etc.)
* `paddingLeft: string` - Optional
  * Accepts all themeable sizing properties (`scale100`, etc.)
* `flexWrap: boolean` - Optional
* `left: string` - Optional
* `top: string` - Optional
* `right: string` - Optional
* `bottom: string` - Optional

## Motivation

[Pinterest's Gestalt has a similar Box component](https://pinterest.github.io/gestalt/#/Box), and [other](http://mineral-ui.com/components/text) [frameworks](https://evergreen.surge.sh/components/typography) have Text components that focus primarily on quick typography helpers. The [jsxstyle](https://github.com/jsxstyle/jsxstyle) css-in-js library uses this pattern as well. I've also created similar helper components internally at Uber and they've been helpful.

> **Note** that we would likely _not_ use this component internally to build other baseui components. It's primarily a helper component for customers when building their apps.

### Why not separate `Spacing`,  `Color`, `Text`, `Shadow` etc components

The reality is you often want to apply multiple of these concerns to one element, but instead you'd end up with something like this:

```js
<Shadow type="overlay150">
  <Spacing sides="scale150" ends="scale200">
    <Color color="primary">Hello world</Color>
  </Spacing>
</Shadow>
```

Having multiple elements can complicate things like layout, as well as just needlessly increasing the amount of DOM the client has to deal with.

Combining most things into a single `Block` component allows you to keep things as a single element, and generally has less cognitive overload due to fewer react elements. (maybe there's a happy middle-ground though, for example a `Block` and `Text` component?)
