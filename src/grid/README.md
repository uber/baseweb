# Grid

## Grid values

| Breakpoints   | Viewport family | Columns | Margins | Gutters |
| ------------- | --------------- | ------- | ------- | ------- |
| 320 — 599     | Small           | 4       | 16px    | 16px    |
| 600 — 1135    | Medium          | 8       | 36px    | 36px    |
| 1136 — ∞      | Large           | 12      | 64px    | 36px    |

*Margins are for left/right edges, while gutters are margins between columns in a row.*

## Design considerations

* To support Internet Explorer, `Grid` will use `flex` layout under the hood
* Grid values will live in the `Theme`, and the component will pick them up from there

## API

### Row

* `gutter` - optionally, it can override the margin between columns for a specific `Row`
* `align` - vertical alignment of columns inside a row (`top`, `middle` or `bottom`)
* `justify` - horizontal alignment of columns inside a row (`start`, `end` ...)

### Cel

* `offset` - the number of columns to offset, starting from the left
* `span` - the number of columns to occupy. If there is not enough column in the current viewport, it will take up the entire
* `width` - if the consumer wishes to set a fixed with for the `Cel`, they can supply a number here

### GridContainer

No API. It just adds the left and right margins based on the viewport family.

### Basic usage

```jsx
import { GridContainer, Grid, Cel } from 'baseui/grid';

export default () => (
  <GridContainer>
    <Grid>
      <Cel span={6}>cel-6</Cel>
      <Cel span={6}>cel-6</Cel>
    </Grid>
    <Grid>
      <Cel span={4}>cel-4</Cel>
      <Cel span={4}>cel-4</Cel>
      <Cel span={4}>cel-4</Cel>
    </Grid>
  </GridContainer>
)
```

### Responsive usage

```jsx
import { GridContainer, Grid, Cel } from 'baseui/grid';

export default () => (
  <GridContainer>
    <Grid>
      <Cel span={[2,3,5]}>cel-6</Cel>
      <Cel span={6}>cel-6</Cel>
    </Grid>
  </GridContainer>
)
```
