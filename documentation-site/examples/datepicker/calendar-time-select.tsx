import React from 'react';
import {StatefulCalendar} from 'spaceweb/datepicker';

export default () => (
  <StatefulCalendar
    onChange={({date}) => console.log(date)}
    timeSelectStart
  />
);
