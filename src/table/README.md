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
  StyledTable,
  StyledContent,
  StyledHead,
  StyledHeadCell,
  StyledBody,
  StyledRow,
  StyledCell,
} from 'baseui/table';

const data = [
  [1, 'John', 'Smith'],
  [2, 'Lois', 'Lane'],
];

export default () => (
  <StyledTable>
    <StyledContent>
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
    </StyledContent>
  </StyledTable>
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
* `StyledTable`
* `StyledContent`
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
* `isLoading?: boolean = false`
  * If true, renders loading indicator.

## Accessibility

### How can this component be used via keyboard controls

No keyboard shortcuts will be enabled.

### What are the accessibility best practices for this component (aria-\*, role, etc.)

We are making the assuming that in most use cases, a [table with one header](https://www.w3.org/WAI/tutorials/tables/one-header/)
will be rendered.

The [W3 guideline for table states](https://www.w3.org/WAI/tutorials/tables/):
> Header cells must be marked up with `<th>`, and data cells with `<td>` to make tables accessible. For more complex tables, explicit associations may be needed using `scope`, `id`, and `headers` attributes.

If support for rendering `th` in a data cell is added, use the `scope` attribute to [associate the data cells with the appropriate headers](https://webaim.org/techniques/tables/data#th)
