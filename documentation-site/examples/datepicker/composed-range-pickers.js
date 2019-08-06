// @flow
import React, {useState} from 'react';

import {useStyletron} from 'baseui';
import {FormControl} from 'baseui/form-control';
import ArrowRight from 'baseui/icon/arrow-right';
import {
  Datepicker,
  TimePicker,
  formatDate,
} from 'baseui/datepicker';

const START_DATE = new Date(2019, 3, 1, 12, 0, 0);
const END_DATE = new Date(2019, 3, 10, 16, 0, 0);

function formatDateAtIndex(
  dates: ?Date | ?Array<Date>,
  index: number,
) {
  if (!dates || !Array.isArray(dates)) return '';
  const date = dates[index];
  if (!date) return '';
  return formatDate(date, 'yyyy/MM/dd');
}

export default () => {
  const [useCss, theme] = useStyletron();
  const [dates, setDates] = useState<any>([START_DATE, END_DATE]);

  return (
    <div
      className={useCss({display: 'flex', alignItems: 'center'})}
    >
      <div
        className={useCss({
          width: '120px',
          marginRight: theme.sizing.scale300,
        })}
      >
        <FormControl label="Start Date" caption="YYYY/MM/DD">
          <Datepicker
            value={dates}
            onChange={({date}) => setDates(date)}
            formatDisplayValue={date => formatDateAtIndex(date, 0)}
            timeSelectStart
            range
          />
        </FormControl>
      </div>

      <div
        className={useCss({
          width: '120px',
          marginRight: theme.sizing.scale300,
        })}
      >
        <FormControl label="Start Time" caption="HH:MM">
          <TimePicker
            value={dates[0]}
            onChange={time => setDates([time, dates[1]])}
          />
        </FormControl>
      </div>

      <div
        className={useCss({
          marginRight: theme.sizing.scale300,
        })}
      >
        <ArrowRight size={24} />
      </div>

      <div
        className={useCss({
          width: '120px',
          marginRight: theme.sizing.scale300,
        })}
      >
        <FormControl label="End Date" caption="yyyy/MM/DD">
          <Datepicker
            value={dates}
            onChange={({date}) => setDates(date)}
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
      </div>

      <div
        className={useCss({
          width: '120px',
        })}
      >
        <FormControl label="End Time" caption="HH:MM">
          <TimePicker
            value={dates[1]}
            onChange={time => setDates([dates[0], time])}
          />
        </FormControl>
      </div>
    </div>
  );
};
