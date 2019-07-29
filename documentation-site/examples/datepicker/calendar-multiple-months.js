// @flow
import React from 'react';
import {ORIENTATION, StatefulCalendar} from 'baseui/datepicker';

export default () => (
  <StatefulCalendar
    orientation={ORIENTATION.horizontal}
    monthsShown={2}
    range
    quickSelect
  />
);
