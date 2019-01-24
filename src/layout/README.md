# Align Layout Components

## Usage

```javascript
import {Row, Column} from '@uber/layout-align';

// "1fr" is similar to flex-grow: 1 on the target item
<Row items="100px 1fr 20%">
  <Item>100px</Item>
  <Item>Rest</Item>
  <Item>20%</Item>
</Row>

// automatically translate gap to row-gap or column-gap
<Column items="100px 1fr 20%" gap="24px">
  <Item>100px</Item>
  <Item>Rest</Item>
  <Item>20%</Item>
</Row>

// support common CSS properties
<Column items="100px 1fr 20%" width="360px" height="240px" color="primary200">
  <Item>100px</Item>
  <Item>Rest</Item>
  <Item>20%</Item>
</Row>
```

## Exports

* `Row`
* `Column`

## `Row` & `Column`API

* `items: string`

  * Expression to specify child space allocation. [CSS grid row and column templates](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-rows).

* `gap?: string`

  * Specifies item gaps. The value translates to [grid-gap / row-gap](https://developer.mozilla.org/en-US/docs/Web/CSS/row-gap).

* `center: boolean`

  * Whether the child nodes should be aligned in the middle along the row / column axis.
This translates either to `align-item: center` or `justify-items: center`.

* `color: string`
  * https://developer.mozilla.org/en-US/docs/Web/CSS/color

* `font: string`
  * https://developer.mozilla.org/en-US/docs/Web/CSS/font

* `width: string`
  * https://developer.mozilla.org/en-US/docs/Web/CSS/width

* `height: string`
  * https://developer.mozilla.org/en-US/docs/Web/CSS/height

* `padding / paddingTop / paddingRight / paddingBottom / paddingLeft: string`
  * https://developer.mozilla.org/en-US/docs/Web/CSS/padding

* `margin / marginTop / marginRight / marginBottom / marginLeft: string`
  * https://developer.mozilla.org/en-US/docs/Web/CSS/margin

* `overflow: string`
  * https://developer.mozilla.org/en-US/docs/Web/CSS/overflow

  > These attributes specify respective css properties.

