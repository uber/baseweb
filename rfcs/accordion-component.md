# Accordion Component

## Usage

### Basic usage

```js
import * as React from 'react';
import {Accordion, AccordionItem, Root, Toggle} from 'baseui/accordion';

export default () => {
  return (
    <div>
      <Accordion>
        <AccordionItem key={1} title={'First title'}><div>First content</div></AccordionItem>
        <AccordionItem key={2} title={'Second title'}><div>Second content</div></AccordionItem>
      </Accordion>
    </div>
  );
};
```

### Advanced usage

```js
import * as React from 'react';
import {Accordion, AccordionItem, Root, Toggle} from 'baseui/accordion';
import {styled} from 'baseui';

const CustomRoot = styled(Root, props => ({
  textColor: 'red',
}));

const CustomToggle = styled(Toggle, props => ({
  backgroundColor: props.$isExpanded ? 'green' : 'blue',
}));

export default () => {
  return (
    <div>
      <Accordion
        onToggle={(event, index, isExpanded) => {console.log('Accordian ' + index + ' is ' + (isExpanded ? 'expanded' : 'collapsed') )}}
        overrides={{
          Root: CustomRoot,
          Toggle: CustomToggle,
        }}
        expanded={[false, true]}
      >
          <AccordionItem key={1} title={'First title'}><div>First content</div></AccordionItem>
          <AccordionItem key={2} title={'Second title'}><div>Second content</div></AccordionItem>
          <AccordionItem key={3} title={'Third title'}><div>Third content</div></AccordionItem>
      </Accordion>
    </div>
  );
};
```

## Exports

* `Accordion`
* `StatefulAccordion`
* `StatefulAccordionContainer`
* `AccordionItem`
* `StyledRoot`
* `StyledToggle`
* `StyledTitle`
* `StyledContent`

## `Accordion` API

* `children: Array<AccordionItem>` - Required
  All accordion items in component. Each `AccordionItem` has:
  * `title: React$Node` - title of accordion item
  * `children: React$Node` - content of accordion item is represented as children of it correspondingly
* `expanded: Array<boolean>` - Optional
  Array of the same size as `children`(array of `AccordionItem`). If element is `true` corresponding accordion item is expanded. Default is `Array<false>`
* `disabled: boolean`:
  Disable control from being changed
* `overrides: {Root: (props: {[string]: any}) => React$Node, Toggle: (props: {[string]: any}) => React$Node, Title: (props: {[string]: any}) => React$Node, Content: (props: {[string]: any}) => React$Node}`
  * `Root` container element to render.
  * `Toggle` is the expand\collapse button for each accordion item.
  * `Title` to render for each accordion item.
  * `Content` to render for each accordion item.
* `onToggle: func(event, index, isExpanded)` - Optional
  handler for events on trigger element. `index` indicates number of accordion item toggled. `isExpanded` boolean to show if accordion item expands or collapses.

## `StatefulAccordion` API

* `initialState: {}`
  Initial state of an uncontrolled accordion component.
  * `expanded: Array<boolean>` initial state of array of the same size as `children`(array of `AccordionItem`). If element is `true` corresponding accordion item is expanded
* `stateReducer: (type: text, nextState: {}, currentState: {}, e: any) => nextState`
  A state change handler.
  * `type` - state change type
  * `nextState` - a new state changes that will be set
  * `currentState` - current full state of the component
* `children: Array<AccordionItem>` - Required
  All accordion items in component. Each `AccordionItem` has:
  * `title: React$Node` - title of accordion item
  * `children: React$Node` - content of accordion item is represented as children of it correspondingly
* `exclusive: boolean` - Optional
  If set to true, it will exclusively expand only one accordion item. So next accordion item to be expanded right after current is collapsed. Default is `'false`
* `disabled: boolean` - Optional
  Disable control from being changed
* `onToggle: func(event, index, isExpanded)` - Optional
  handler for events on trigger element. `index` indicates number of accordion item toggled. `isExpanded` boolean to show if accordion item expands or collapses.

## `AccordionItem` API

Represents content and title of each accordion item

* `title: React$Node` - title of accordion item
* `expanded: boolean` - If `true` accordion item is expanded. It has higher priority than value coming from `expanded` Array of parent accordion.
* `children: React$Node` - content of accordion item is represented as children of it correspondingly

## Presentational components props API

These properties are passed to every presentational (styled) component that is exported:

* `$disabled: boolean`
  Disable control from being changed
* `$index: number`
  For `Toggle`, `Title` and `Content` to indicate number of accordion item.
* `$isExpanded: number`
  For `Toggle`, `Title` and `Content` to indicate if accordion item is expanded.

## Accessibility

Should support keyboard hotkeys: `tab` - to switch between accordion and expand the next one.
Accessibility best practices for this component (`aria-expanded`, `aria-controls`, `aria-disabled`, `aria-level`, `role=presentation` for all component, `role=heading` and `role=region` for title and content of each accordion item)
Please, see w3.org/TR/wai-aria-practices-1.1/examples/accordion/accordion.html