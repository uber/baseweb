import React, {useState} from 'react';

import {Block} from 'baseui/block';
import {FormControl} from 'baseui/form-control';
import {ArrowRight} from 'baseui/icon';
import {
  Datepicker,
  TimePicker,
  formatDate,
} from 'baseui/datepicker';

const START_DATE = new Date(2019, 3, 1, 12, 0, 0);
const END_DATE = new Date(2019, 3, 10, 16, 0, 0);

function formatDateAtIndex(
  dates: Date | Array<Date>,
  index: number,
) {
  if (!dates || !Array.isArray(dates)) return '';
  const date = dates[index];
  if (!date) return '';
  return formatDate(date, 'yyyy/MM/dd') as string;
}

export default () => {
  const [dates, setDates] = useState([START_DATE, END_DATE]);

  return (
    <Block display="flex" alignItems="center">
      <Block width="120px" marginRight="scale300">
        <FormControl label="Start Date" caption="YYYY/MM/DD">
          <Datepicker
            value={dates}
            onChange={({date}) => setDates(date as Date[])}
            formatDisplayValue={date => formatDateAtIndex(date, 0)}
            timeSelectStart
            range
          />
        </FormControl>
      </Block>

      <Block width="120px" marginRight="scale300">
        <FormControl label="Start Time" caption="HH:MM">
          <TimePicker
            value={dates[0]}
            onChange={time => setDates([time, dates[1]])}
          />
        </FormControl>
      </Block>

      <Block marginRight="scale300">
        <ArrowRight size={24} />
      </Block>

      <Block width="120px" marginRight="scale300">
        <FormControl label="End Date" caption="yyyy/MM/DD">
          <Datepicker
            value={dates}
            onChange={({date}) => setDates(date as Date[])}
            formatDisplayValue={date => formatDateAtIndex(date, 1)}
            overrides={{
              TimeSelectFormControl: {
                props: {label: 'End time'},
              },
            }}
            timeSelectEnd
            range
          />
        </FormControl>
      </Block>

      <Block width="120px">
        <FormControl label="End Time" caption="HH:MM">
          <TimePicker
            value={dates[1]}
            onChange={time => setDates([dates[0], time])}
          />
        </FormControl>
      </Block>
    </Block>
  );
};
