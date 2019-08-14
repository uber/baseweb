// @flow
import * as React from 'react';
import {StatefulCalendar} from 'baseui/datepicker';
import ja from 'date-fns/locale/ja';

export default () => (
  <StatefulCalendar
    locale={ja}
    onChange={({date}) => console.log(date)}
  />
);
