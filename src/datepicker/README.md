# DatePicker Component

Represents control to work and pick date, time value or a range of values

## Usage

### Basic usage

```javascript
import * as React from 'react';
import {Unstable_StatefulCalendar as DatePicker} from 'baseui/datepicker';

export default () => <DatePicker />;
```

### Advanced usage

```javascript
import * as React from 'react';
import {Unstable_StatefulCalendar as DatePicker} from 'baseui/datepicker';

export default () => {
  return <DatePicker
    initialState={{
      value: [new Date(2018, 1, 15), new Date(2018, 8, 25)]
    }}
    minDate={new Date(2000, 1, 1)}
    maxDate={new Date(2020, 1, 1)}
    onSelect={({event, date})=>{console.log(date)}}
    />
}
```

## Exports

* `Calendar`
* `StatefulDatepicker`
* `StatefulContainer`
* `StyledRoot`
* `StyledCalendarContainer`
* `StyledHeader`
* `StyledMonthHeader`
* `StyledMonth`
* `StyledWeek`
* `StyledDay`

## `Unstable_Calendar` API

  * `excludeDates?: ?Array<Date> = null`
    * A list of dates to disable.
  * `filterDate?: ?(day: Date) => boolean = null`
    * A filter function that is called to check the disabled state of a day. If `false` is returned the day is considered to be disabled.
  * `highlightedDate?: ?Date = null`
    * A date to highlight on an initial render when the selected value is not set.
  * `includeDates?: ?Array<Date> = null`
    * A list of selectable dates.
  * `locale?: ?LocaleT = null`
    * A locale object. See `date-fns` for more details https://github.com/date-fns/date-fns/tree/master/src/locale 
  * `maxDate?: ?Date = null`
    * A max date that is selectable.
  * `minDate?: ?Date = null`
    * A min date that is selectable.
  * `monthsShown?: number = 1` (not supported yet)
    * A number of months rendered in the calendar.
  * `onDayClick?: ({date: Date, event: Event}) => void`
    * Day's `click` event handler.
  * `onDayMouseOver?: ({date: Date, event: Event}) => void`
    * Day's `mouseover` event handler.
  * `onDayMouseLeave?: ({date: Date, event: Event}) => void`
    * Day's `mouseleave` event handler.
  * `onMonthChange?: ({date: Date}) => void`
    * Event handler that is called when the current rendered month is changed.
  * `onYearChange?: ({date: Date}) => void`
    * Event handler that is called when the current rendered month's year is changed.
  * `onSelect?: ({date: Date}) => void`
    * Event handler that is called when a new date is selected.
  * `peekNextMonth?: boolean = false`
    * Defines if dates outside of the range of the current month are displayed.
  * `selected?: ?Date = null`
    * Currently selected date.
  * `setActiveState?: boolean => void = null`
    * A helper handler for disabling a keyboard navigation and keyboard selection through the calendar dates while navigation through the month or year select controls.

## `Unstable_StatefulCalendar` API

* All props of `Calendar` component except of `selected`.
* `initialState: {}`
  * Initial state of an uncontrolled datepicker component.
  * `value: ?Date = null`
    * Selected `Date`. If `isRange` is set, `value` is an array of 2 values.
  * `highlightedDate: ?Date = initialState.value || new Date()`
    * indicates an initially highlighted date
* `stateReducer: (type: text, nextState: {}, currentState: {}, e: any) => nextState`
  A state change handler.
  * `type` - state change type
  * `nextState` - a new state changes that will be set
  * `currentState` - current full state of the component

## Presentational components props API

These properties are passed to the day presentational (styled) component:

* `$disabled: boolean`
  * Defines if the day is disabled
* `$isHovered: boolean`
  * Defines if the day is hovered
* `$isHighlighted: boolean`
  * Defines if the day is highlighted
* `$selected: boolean`
  * Defines if the day is selected
* `$today: boolean`
  * Defines if the day is today date
* `$weekend: boolean`
  * Defines if the day is a weekend day
* `$outsideMonth: boolean`
  * Defines if the day is outside of the currently rendered month

## Accessibility

Should support keyboard hotkeys: `tab` - to switch between inputs, arrows, month\year select and day grid. `escape` to close datepicker dropdown.
When month and year selects focused, `up` and `down` should cause dropdown to open and move to value, `enter` and `space` to choose selected year or month.
When day grid is focused, `left`, `down` `right` and `up` to move through the grid days. `Enter` to pick date.
When left or right arrow is in focus, `enter` should cause the same as click on this arrow
Accessibility best practices for this component (`aria-valuenow`, `aria-valuetext`, `aria-valuemin`, `aria-valuemax`, `role=datepicker`)
