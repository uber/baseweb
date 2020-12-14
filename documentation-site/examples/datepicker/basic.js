// @flow
import * as React from 'react';
import {StatefulCalendar} from 'baseui/datepicker';

export default function Example() {
  return (
    <StatefulCalendar
      // use the 'onChange' prop to pull data from the component into your application state
      onChange={({date}) => console.log(date)}
    />
  );
}
