# Table Component

Component to render tabular data.

## Features

* Sorting

## Currently Unsupported

* Pagination
* Filtering
* Fixed row
* Fixed column
* Striped rows
* Hoverable row styling
* Multi-column sort
* Row headers
* Expandable row

## Usage

### Basic usage

```javascript
import React from 'react';
import {Table} from 'baseui/table';

const data = [
  ['1', 'Sarah', 'Brown', 31, 'New York No. 1 Anywhere'],
  ['2', 'Jane', 'Smith', 32, 'San Francisco No. 1 Anywhere'],
  ['3', 'Joe', 'Black', 33, 'Sydney No. 1 Anywhere'],
  ['4', 'Jane', 'Red', 34, 'London No. 1 Anywhere'],
 ].map(row => [`${row[1]} ${row[2]}`, row[3], row[4]]); // selects data to display

export default = () => <Table columns={['Name', 'Age', 'Address']} data={data}/>,
```

### Advanced Usage

#### Custom rendering

```javascript
import {
  StyledRoot
  StyledHead
  StyledHeadCell
  StyledBody
  StyledRow
  StyledCell
} from 'baseui/table';

const data = [
  [1, 'John', 'Smith'],
  [2, 'Lois', 'Lane'],
];

export default () => (
  <StyledRoot>
    <StyledHead>
      <StyledHeadCell>Employee ID</StyledHeadCell>
      <StyledHeadCell>First Name</StyledHeadCell>
      <StyledHeadCell>Last Name</StyledHeadCell>
    </StyledHead>
    <StyledBody>
      {data.map(row => (
        <StyledRow>
          {row.map(data => <StyledCell>{data}</StyledCell>)}
        </StyledRow>
      ))}
    </StyledBody>
  </StyledRoot>
);
```

#### Remote data and pagination

```javascript
import React from 'react';
import {Table} from 'baseui/table';
import {Pagination} from 'baseui/pagination';

class TableWithPagination extends React.Component {
  state = {
      currentPage: 1,
      pageSize: 10,
      data: [],
      numPages: 0
  };

  fetch = (pageNumber, pageSize) => {
      // logic to fetch data based on page number
      // `currentPage` and `data` and `numPages` will be updated here.
  }

  componentDidMount = () => {
      const {currentPage, pageSize} = this.state;
      this.fetch(currentPage, pageSize);
  }

  onPageChange = (nextPage, prevPage) => {
      const {pageSize} = this.state;
      this.fetch(nextPage, pageSize);
  }

  render = () => {
    return (
        <Table
          columns={['Employee ID', 'First', 'Last']}
          data={this.state.data.map(employee => [employee.id, employee.firstName, employee.lastName])}
        />
        <Pagination currentPage={this.state.currentPage} numPages={this.state.numPages} onPageChange={this.onPageChange}/>
    );
  }
}
```

## Exports

* `Table`
* `StyledRoot`
* `StyledHead`
* `StyledHeadCell`
* `StyledBody`
* `StyledRow`
* `StyledCell`

## `Table` API

* `columns: Array<string>` - Required
  * Describes the column titles.
* `data: Array<Array<any>>` - Required
  * Matrix data to be rendered within the table.
* `estimatedRowSize?: number = 40px`
  * Passed to `react-virtualized`. Used to estimate table height.
* `isLoading?: boolean = false`
  * If true, renders loading indicator.
* `overrides?: {Root, Head, HeadCell, Body, Row, Cell} = {}`
  * `Root?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
    * Wraps the set of elements.
  * `Head?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
    * Container for the table header related elements.
  * `HeadCell?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
    * A header row. `Tr` for the `Thead` element.
  * `Body?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
    * A header cell. Corresponds with the `th` html element.
  * `Row?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
    * A data cell in the table. Corresponds with the `td` html element.
  * `Cell?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
    * A data row that contains `Td` components.
* `useDynamicRowHeight?: boolean = false`
  * Dynamically measure row heights, if size of rendered data is unknown.

## Dependencies

* [react-virtualized](https://bvaughn.github.io/react-virtualized/#/components/List)
  * leveraging several features from the package:
  * [autosizer](https://bvaughn.github.io/react-virtualized/#/components/AutoSizer) so that the table fills available height/width.
  * [cellmeasurer](https://bvaughn.github.io/react-virtualized/#/components/CellMeasurer) so that row heights can be programmatically generated.

## Accessibility

### How can this component be used via keyboard controls

No keyboard shortcuts will be enabled.

### What are the accessibility best practices for this component (aria-\*, role, etc.)

We are making the assuming that in most use cases, a [table with one header](https://www.w3.org/WAI/tutorials/tables/one-header/)
will be rendered.

The [W3 guideline for table states](https://www.w3.org/WAI/tutorials/tables/):
> Header cells must be marked up with `<th>`, and data cells with `<td>` to make tables accessible. For more complex tables, explicit associations may be needed using `scope`, `id`, and `headers` attributes.

If support for rendering `th` in a data cell is added, use the `scope` attribute to [associate the data cells with the appropriate headers](https://webaim.org/techniques/tables/data#th)
