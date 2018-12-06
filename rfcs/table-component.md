# Table Component

Component to render tabular data.

## Features

* Sorting

## Currently Unsupported

* Pagination
* Filtering
* Fixed Header
* Fixed Column
* Striped Tables
* Hoverable row styling
* Multi-column sort
* Row headers
* Expandable Row

## Usage

### Basic usage

```javascript
import React from 'react';
import {Table} from 'baseui/table';

const data = [
  [1, 'John', 'Smith'],
  [2, 'Lois', 'Lane'],
];

const columns = {
  {
    title: 'Employee ID',
    dataIndex: 1,
  },
  {
    title: 'First',
    dataIndex: 2,
  },
  {
    title: 'Last',
    dataIndex: 3,
  }
};

export default () => <Table data={data} columns={columns}/>;
```

#### Advanced Usage

```javascript
import React from 'react';
import {Table} from 'baseui/table';

const data = [
  ['1', 'Sarah', 'Brown', 31, 'New York No. 1 Anywhere'],
  ['2', 'Jane', 'Smith', 32, 'San Francisco No. 1 Anywhere'],
  ['3', 'Joe', 'Black', 33, 'Sydney No. 1 Anywhere'],
  ['4', 'Jane', 'Red', 34, 'London No. 1 Anywhere'],
];

const columns = [
  {
    title: 'Name',
    sortComparator: (a, b) => {
      return a[2] - b[2]; // sorts by last name
    },
    render: (rowData) => {
      const [id, firstName, lastName] = rowData;
      return (
        <span>
          `${firstName} ${lastName}`
        </span>
      );
    }
  },
  {
    title: 'Age',
    dataIndex: 3,
  },
  {
    title: 'Address',
    dataIndex: 4,
    sortComparator: (a, b) => a[4].length - b[4].length,
  }
];

export default = () => <Table columns={columns} data={data}/>,
```
<!--
#### Custom Table Rendering

There may be a case where more complex layouts are needed,
such as columns that with colSpan > 1 and/or rowspan > 1

```javascript
export default() => {
    <Table
     render: (dataSource, columns) => {
        return (<Tbody>
          <Thead>
            <TheadTr>
              <Th>Item</Th>
              <Th>Item</Th>
              <Th>0.0000</Th>
              <Th>Item</Th>
            </TheadTr>
          </Thead>
          <Tbody>
            <Tr>
              <Th rowSpan={3}>Item</Th>
              <Td>Item</Td>
              <Td>0.0788</Td>
              <Td>Item</Td>
            </Tr>
            <Tr>
              <Td>Item</Td>
              <Td>3.0210</Td>
              <Td>Item</Td>
            </Tr>
            <Tr>
              <Td>Item</Td>
              <Td>4.0797</Td>
              <Td>Item</Td>
            </Tr>
            <Tr>
              <Th rowSpan={2}>Item</Th>
              <Td>Item</Td>
              <Td>0.0640</Td>
              <Td>Item</Td>
            </Tr>
            <Tr>
              <Td>Item</Td>
              <Td isNumerical={true}>1.0117</Td>
              <Td>Item</Td>
            </Tr>
          </Tbody>
       );
     }
    />
}
``` -->

### Advanced Usages

#### Remote Data

Paginate data from a remote backend.

```javascript
import * as React from 'react';
import {Table} from 'baseui/table';
import {Pagination} from 'baseui/pagination';

const columns = {
    {
        title: 'Employee ID'
        dataIndex: 'id'
    },
    {
        title: 'First'
        dataIndex: 'firstName'
    },
    {
        title: 'Last'
        dataIndex: 'lastName'
    },
    {
        title: 'Full Name'
        render: (rowData) => {
            const {firstName, lastName} = rowData;
            return (
                <span>
                    `${firstName} ${lastName}`
                </span>
            );
        }
    }
};

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
                columns={columns}
                dataSource={this.state.data}
             />
             <Pagination currentPage={this.state.currentPage} numPages={this.state.numPages} onPageChange={this.onPageChange}/>
         );
    }
}
```

## Exports

* `Table`
* `Head`
* `HeadRow`
* `HeadCell`
* `Body`
* `BodyRow`
* `BodyCell`

## `Table` API

* `data: Array<Array<any>>` - Required
  * Matrix data to be rendered within the table.
* `columns: Array<{title: string, dataIndex: number, renderCell?: () => React.Node}>` - Required
  * Description of prop
* `render: (dataSource, columns) => $ReactNode` - Optional
    Custom render table body.
* `overrides - Object:` - Optional

* `overrides(continued):`
  * `Tbody` - Body of the table. Corresponds.
  * `Thead` - Container for the table header related elements.
  * `TheadTr` - A header row. `Tr` for the `Thead` element.
  * `Th` - A header cell. Corresponds with the `th` html element.
  * `Td` - A data cell in the table. Corresponds with the `td` html element.
  * `Tr` - A data row that contains `Td` components.

## `Column` API

One of the Table columns prop for describing the table's columns, Column has the same API.

* `title: string` - Required. Title of the column to display in the header.
* `dataIndex: string` - Optional. Attribute at which to index the row data.
* `render: <T>(<T>, index, Array<T>) => $ReactNode` - Optional. Renderer of the table cell. The return value should be a ReactNode.
* `sorter:Function`- Optional  Sort function for [local sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
* `defaultSortOrder:'ascend'|'descend'`: Only to be declared on one of the columns, this will be define the default sort on the initial set of data.

## `SORT_DIRECTION` Constant

* `ASC`
* `DESC`

### Dependencies

* [react-window](https://react-window.now.sh/#/examples/grid/variable-size)

## Accessibility

#### How can this component be used via keyboard controls?

No keyboard shortcuts will be enabled.

#### What are the accessibility best practices for this component (aria-\*, role, etc.)

We are making the assuming that in most use cases, a [table with one header](https://www.w3.org/WAI/tutorials/tables/one-header/)
will be rendered.

The [W3 guideline for table states](https://www.w3.org/WAI/tutorials/tables/):
> Header cells must be marked up with `<th>`, and data cells with `<td>` to make tables accessible. For more complex tables, explicit associations may be needed using `scope`, `id`, and `headers` attributes.

If support for rendering `th` in a data cell is added, use the `scope` attribute to [associate the data cells with the appropriate headers](https://webaim.org/techniques/tables/data#th)