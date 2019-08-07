// @flow
import * as React from 'react';
import {StatefulDatepicker} from 'baseui/datepicker';
import {addDays} from 'date-fns';

export default () => (
  <React.Fragment>
    <StatefulDatepicker />
    <br />
    <StatefulDatepicker
      range
      initialState={{value: [new Date(), addDays(new Date(), 4)]}}
      placeholder="YYYY/MM/YY - YYYY/MM/YY"
    />
  </React.Fragment>
);
