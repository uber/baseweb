// @flow
import * as React from 'react';
import {DatePicker} from 'baseui/datepicker';
import {addDays} from 'date-fns';

export default () => {
  const [singleDate, setSingleDate] = React.useState(null);
  const [rangeDate, setRangeDate] = React.useState([
    new Date(),
    addDays(new Date(), 4),
  ]);

  return (
    <React.Fragment>
      <DatePicker
        value={singleDate}
        onChange={({date}) => setSingleDate(date)}
      />
      <br />
      <DatePicker
        range
        value={rangeDate}
        onChange={({date}) => setRangeDate(date)}
        placeholder="YYYY/MM/DD – YYYY/MM/DD"
        quickSelect
      />
    </React.Fragment>
  );
};
