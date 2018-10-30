# Foo Component

Delete this line and any sections, exports, props, etc below where applicable.

## Usage

### Basic usage

```javascript
import * as React from 'react';

```javascript
import * as React from 'react';
import {Table, Thead, TheadTr, Th, Tbody, Tr, Td} from 'baseui/table';

export default () => {
  return (
    <Table>
      <Thead>
          <TheadTr>
            <Th>Item</Th>
            <Th>Item</Th>
            <Th>Item</Th>
            <Th>Cost</Th>
          </TheadTr>
       </Thead>
      <Tbody>
        <Tr>
          <Td>
            <a href={''}>{'Link Item'}</a>
          </Td>
          <Td>Item</Td>
          <Td>Item</Td>
          <Td>Item</Td>
          <Td>0.00</Td>
        </Tr>
        <Tr>
          <Td>
            <a href={''}>{'Link Item'}</a>
          </Td>
          <Td>Item</Td>
          <Td>Item</Td>
          <Td>Item</Td>
          <Td>0.00</Td>
        </Tr>
      </Tbody>
    </Table>
 );
}
```

## Exports

* `Table`
* `Tbody`
* `Td`
* `Th`
* `Thead`
* `TheadTr`
* `Tr`

## `Table` API

* `prop: type` - Optional|Required
  Description of prop
* `prop: type` - Optional|Required
  Description of prop
* `prop: type` - Optional|Required
  Description of prop

## `Tbody` API

* `prop: type` - Optional|Required
  Description of prop
* `prop: type` - Optional|Required
  Description of prop
* `prop: type` - Optional|Required
  Description of prop

## `Td` API

* `prop: type` - Optional|Required
  Description of prop
* `prop: type` - Optional|Required
  Description of prop
* `prop: type` - Optional|Required
  Description of prop

## `Th` API

* `prop: type` - Optional|Required
  Description of prop
* `prop: type` - Optional|Required
  Description of prop
* `prop: type` - Optional|Required
  Description of prop

## `Thead` API

* `prop: type` - Optional|Required
  Description of prop
* `prop: type` - Optional|Required
  Description of prop
* `prop: type` - Optional|Required
  Description of prop

## `TheadTr` API

* `prop: type` - Optional|Required
  Description of prop
* `prop: type` - Optional|Required
  Description of prop
* `prop: type` - Optional|Required
  Description of prop

## Presentational components props API

These properties are passed to every presentational (styled) component that is exported:

* `$prop: type`
* `$prop: type`
* `$prop: type`

## Dependencies

Does this component depend on any 3rd party packages or other internal components?

## Accessibility

How can this component be used via keyboard controls?
What are the accessibility best practices for this component (aria-\*, role, etc.)
