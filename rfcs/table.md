# Table Component

Represents control to render tabular data.

## Features
- Sorting


## Unsupported
- Pagination
- Filtering
- Fixed Header
- Fixed Column
- Striped Tables
- Hoverable row styling
- Multi-column sort
- Row headers

## Usage

### Basic usage
Render static tabular data.
```javascript
import * as React from 'react';
import {Table} from 'baseui/table';
const data = {
    {
        id: 1,
        firstName: 'John'
        lastName: 'Smith'
    },
    {
            id: 1,
            firstName: 'Lois'
            lastName: 'Lane'
    }
};
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
export default () => <Table data={data} columns={columns}>;
```

### Overriding Table Styles
Paginate data from a remote backend.


## Exports

* `Table`
* `StatefulTable`
* `Tbody`
* `Thead`
* `TheadTr`
* `Td`
* `Th`
* `Tr`

## `Table` API

* `data:Array<T>` - Required
  Description of prop
* `columns: Column` - Required
  Description of prop
* `overrides - Object:` - Optional

* `overrides(continued):`
  * `Tbody` - Body of the table. Corresponds.
  * `Thead` - Container for the table header related elements.
  * `TheadTr` - A header row. `Tr` for the `Thead` element.
  * `Th` - A header cell. Corresponds with the `th` html element.
  * `Td` - A data cell in the table. Corresponds with the `td` html element.
  * `Tr` - A data row that contains `Td` components.

## `Table` API


## `Column` API
One of the Table columns prop for describing the table's columns, Column has the same API.
* `title: string` - Required
* `dataIndex: string` - Optional
  Description of prop
* `render: <T>(<T>, index, Array<T>) => $ReactNode` - Optional.	Renderer of the table cell. The return value should be a ReactNode, or an object for

## Presentation Components

### `Tbody` API
Please refer to the [tbody DOM API](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tbody)

### `Thead` API
Please refer to the [thead DOM API](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/thead)

### `TheadTr` API
Please refer to the [tr DOM API](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tr)

### `Td` API
Please refer to the [td DOM API](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td)

### `Th` API
Please refer to the [th DOM API](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/th)

### `Tr` API
Please refer to the [th DOM API](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tr)


### Dependencies

Does this component depend on any 3rd party packages or other internal components?

## Accessibility

How can this component be used via keyboard controls?
No keyboard shortcuts will be enabled.

What are the accessibility best practices for this component (aria-\*, role, etc.)

We are making the assuming that in most use cases, a [table with one header](https://www.w3.org/WAI/tutorials/tables/one-header/)
will be rendered.

The [W3 guideline for table states](https://www.w3.org/WAI/tutorials/tables/):
> Header cells must be marked up with `<th>`, and data cells with `<td>` to make tables accessible. For more complex tables, explicit associations may be needed using `scope`, `id`, and `headers` attributes.

If support for rendering `th` in a data cell is added, use the `scope` attribute to [associate the data cells with the appropriate headers](https://webaim.org/techniques/tables/data#th)
