import React from 'react';
import {ORIENTATION, StatefulCalendar} from 'spaceweb/datepicker';

export default () => (
  <StatefulCalendar
    onChange={({date}) => console.log(date)}
    orientation={ORIENTATION.horizontal}
    monthsShown={2}
    range
    quickSelect
  />
);
