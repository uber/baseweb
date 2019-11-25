import React, {useState} from 'react';

import {useStyletron} from 'baseui';
import {FormControl} from 'baseui/form-control';
import {ArrowRight} from 'baseui/icon';
import {Datepicker, formatDate} from 'baseui/datepicker';
import {TimePicker} from 'baseui/timepicker';

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
  const [css, theme] = useStyletron();
  const [dates, setDates] = useState([START_DATE, END_DATE]);

  return (
    <div className={css({display: 'flex', alignItems: 'center'})}>
      <div
        className={css({
          width: '120px',
          marginRight: theme.sizing.scale300,
        })}
      >
        <FormControl label="Start Date" caption="YYYY/MM/DD">
          <Datepicker
            value={dates}
            onChange={({date}) => setDates(date as Array<Date>)}
            formatDisplayValue={date => formatDateAtIndex(date, 0)}
            timeSelectStart
            range
            mask="9999/99/99"
          />
        </FormControl>
      </div>

      <div
        className={css({
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
        className={css({
          marginRight: theme.sizing.scale300,
        })}
      >
        <ArrowRight size={24} />
      </div>

      <div
        className={css({
          width: '120px',
          marginRight: theme.sizing.scale300,
        })}
      >
        <FormControl label="End Date" caption="yyyy/MM/DD">
          <Datepicker
            value={dates}
            onChange={({date}) => setDates(date as Array<Date>)}
            formatDisplayValue={date => formatDateAtIndex(date, 1)}
            overrides={{
              TimeSelectFormControl: {
                props: {label: 'End time'},
              },
            }}
            timeSelectEnd
            range
            mask="9999/99/99"
          />
        </FormControl>
      </div>

      <div
        className={css({
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
