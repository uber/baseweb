import * as React from 'react';
import {StatefulDatepicker} from 'baseui/datepicker';
import {Block} from 'baseui/block';
import {addDays} from 'date-fns';

export default () => (
  <React.Fragment>
    <StatefulDatepicker />
    <Block as="br" />
    <StatefulDatepicker
      range
      initialState={{value: [new Date(), addDays(new Date(), 4)]}}
      placeholder="YYYY/MM/YY - YYYY/MM/YY"
    />
  </React.Fragment>
);
