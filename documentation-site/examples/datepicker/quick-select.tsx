import * as React from 'react';
import {StatefulCalendar} from 'baseui/datepicker';

export default () => (
  <StatefulCalendar
    onChange={({date}) => console.log(date)}
    range
    quickSelect
  />
);
