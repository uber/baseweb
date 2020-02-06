import * as React from 'react';
import {StatefulDatepicker} from 'spaceweb/datepicker';
import hu from 'date-fns/locale/hu';

export default () => (
  <StatefulDatepicker
    locale={hu}
    onChange={({date}) => console.log(date)}
    formatString="yyyy MMMM d"
    mask={null}
  />
);
