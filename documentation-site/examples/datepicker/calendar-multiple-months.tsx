import React from 'react';
import {ORIENTATION, StatefulCalendar} from 'baseui/datepicker';

export default function Example() {
  return (
    <StatefulCalendar
      onChange={({date}) => console.log(date)}
      orientation={ORIENTATION.horizontal}
      monthsShown={2}
      range
      quickSelect
    />
  );
}
