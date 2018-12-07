# DatePicker Component

Represents control to work and pick date, time value or a range of values

## Usage

### Basic usage

```javascript
import * as React from 'react';
import {DatePicker} from 'baseui/datepicker';

export default () => <DatePicker />;
```

### Advanced usage

```javascript
import * as React from 'react';
import {DatePicker} from 'baseui/datepicker';

export default () => {
  return <DatePicker
    initialState={{
      value: [new Date(2018, 1, 15), new Date(2018, 8, 25)]
    }}
    isRange={true}
    dateFormat={'MM/DD/YY'}
    minDate={new Date(2000, 1, 1)}
    maxDate={new Date(2020, 1, 1)}
    monthRange={2}
    onChange={(event, value)=>{console.log(value)}}
    getMonthGridDay={props => <div style={{
        color: props.$inRange ? 'red' : 'blue',
        borderRadius: '5px',
      }}>{props.$value.getDate()}</div>
    }
    />
}
```

## Exports

* `DatePicker`
* `StatefulDatePicker`
* `StatefulDatePickerContainer`
* `StyledRoot`
* `StyledDateLabel`
* `StyledDateInput`
* `StyledMonthAndYearBar`
* `StyledMonthSelect`
* `StyledYearSelect`
* `StyledMonthGrid`
* `StyledMonthGridLabel`
* `StyledQuickSelect`

## `DatePicker` API

* `isRange: boolean` - Optional
  If set, datepicker is to select 2 dates range, so there are two date input and `value` comes as Array of two dates, min and max. Otherwise only one date is selected. Default is `false`
* `dateFormat: string | () => string` - Optional
  Date format that is accepted by `Date.parse` function. RFC2822 tools.ietf.org/html/rfc2822#section-3.3 standard. Default is `DD/MM/YYYY`
* `value: Date | Array<Date>` - Optional
  Selected `Date`. If `isRange` is set, `value` is an array of 2  Date values".
* `minDate: Date` - Optional
  minimum date available for selection. Default is `Jan 01 1970`
* `maxDate: Date` - Optional
  maximum date available for selection. Default is current date + 3 years.
* `disabled: boolean`:
  Disable control from being changed
* `monthRange: number`
  The number of calendar months to show at once. Accepts number of visible months(mostly 1 or 2). Default is `1`
* `overrides - Object:` - Optional

```js
 {  
   Root: {props: {}, style: {}, component: ReactComponent} | ReactComponent,
   DateLabel: {props: {}, style: {}, component: ReactComponent} | ReactComponent,
   DateInput: {props: {}, style: {}, component: ReactComponent} | ReactComponent,
   MonthAndYearBar: {props: {}, style: {}, component: ReactComponent} | ReactComponent,
   MonthSelect: {props: {}, style: {}, component: ReactComponent} | ReactComponent,
   YearSelect: {props: {}, style: {}, component: ReactComponent} | ReactComponent,
   MonthGrid: {props: {}, style: {}, component: ReactComponent} | ReactComponent,
   MonthGridLabel: {props: {}, style: {}, component: ReactComponent} | ReactComponent,
   QuickSelect: {props: {}, style: {}, component: ReactComponent} | ReactComponent
 }
```

* `overrides(continued):`
  * `Root` - parent element of whole datepicker
  * `DateLabel` - label above date input
  * `DateInput` -  date input showing current selected date
  * `MonthAndYearBar` - a bar\panel showing current selected month and year
  * `MonthSelect` - select component to pick a month
  * `YearSelect` - select component to pick a year
  * `MonthGrid` - a grid of days in month
  * `MonthGridLabel` - label for day of week in grid
  * `QuickSelect` - set of buttons or any other components. Default contains quick selection of current week, month, year and other common ranges
* `onChange: func(event, value)` - Optional
  handler for events on trigger element, current selected date `value` (single or 2 dates)
* `onMonthSelect: func(event, month)` - Optional
  handler for events on trigger element, current month selected in Select dropdown. From 0 to 11.
* `onYearSelect: func(event, year)` - Optional
  handler for events on trigger element, current year selected in Select dropdown.

## `StatefulDatePicker` API

* `initialState: {}`
  Initial state of an uncontrolled datepicker component.
  * `value: Date | Array<Date>` - Optional
    Selected `Date`. If `isRange` is set, `value` is an array of 2 values.
* `stateReducer: (type: text, nextState: {}, currentState: {}, e: any) => nextState`
  A state change handler.
  * `type` - state change type
  * `nextState` - a new state changes that will be set
  * `currentState` - current full state of the component
* `isRange: boolean` - Optional
  If set, datepicker is to select 2 dates range, so there are two date input and `value` comes as Array of two dates, min and max. Otherwise only one date is selected. Default is `false`
* `dateFormat: string | () => string` - Optional
  Date format that is accepted by `Date.parse` function. RFC2822 tools.ietf.org/html/rfc2822#section-3.3 standard. Default is `DD/MM/YYYY`
* `minDate: Date` - Optional
  minimum date available for selection. Default is `Jan 01 1970`
* `maxDate: Date` - Optional
  maximum date available for selection. Default is current date + 3 years.  
* `monthRange: number`
  The number of calendar months to show at once. Accepts number of visible months(mostly 1 or 2). Default is `1`
* `getMonthGridDay: func(props) => React$Node` - Optional.
  Method, which returns current markupda for day in month. Default is number of month. Receives most useful properties, such as:
  * `$inRange: boolean`
    True if day is in range between min and max selected date value
  * `$value: number`
    `Date` of this day.
* `disabled: boolean`:
  Disable control from being changed  
* `onChange: func(event, value)` - Optional
  handler for events on trigger element, current selected date `value` (single or 2 dates)
* `onMonthSelect: func(event, month)` - Optional
  handler for events on trigger element, current month selected in Select dropdown. From 0 to 11.
* `onYearSelect: func(event, year)` - Optional
  handler for events on trigger element, current year selected in Select dropdown.

## Presentational components props API

These properties are passed to every presentational (styled) component that is exported:

* `$disabled: boolean`
  Disable control from being changed
* `$isHovered: boolean`
  If component is hovered
* `$isActive: boolean`
  If component is active

## Accessibility

Should support keyboard hotkeys: `tab` - to switch between inputs, arrows, month\year select and day grid. `escape` to close datepicker dropdown.
When month and year selects focused, `up` and `down` should cause dropdown to open and move to value, `enter` and `space` to choose selected year or month.
When day grid is focused, `left`, `down` `right` and `up` to move through the grid days. `Enter` to pick date.
When left or right arrow is in focus, `enter` should cause the same as click on this arrow
Accessibility best practices for this component (`aria-valuenow`, `aria-valuetext`, `aria-valuemin`, `aria-valuemax`, `role=datepicker`)
