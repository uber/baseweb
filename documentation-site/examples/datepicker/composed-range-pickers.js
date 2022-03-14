// @flow
import React, {useState} from 'react';
import {isAfter, isBefore} from 'date-fns';

import {useStyletron} from 'baseui';
import {FormControl} from 'baseui/form-control';
import ArrowRight from 'baseui/icon/arrow-right';
import {DatePicker, formatDate} from 'baseui/datepicker';
import {TimePicker} from 'baseui/timepicker';

const START_DATE = new Date(2019, 3, 1, 12, 0, 0);
const END_DATE = new Date(2019, 3, 10, 16, 0, 0);

export default function Example() {
  const [css, theme] = useStyletron();
  // flowlint-next-line unclear-type:off
  const [dates, setDates] = useState<any>([START_DATE, END_DATE]);

  return (
    <div
      className={css({
        [theme.mediaQuery.medium]: {
          display: 'flex',
          alignItems: 'center',
        },
      })}
    >
      <div className={css({display: 'flex'})}>
        <div
          className={css({
            width: '120px',
            marginRight: theme.sizing.scale300,
          })}
        >
          <FormControl label="Start Date" caption="YYYY/MM/DD">
            <DatePicker
              value={dates}
              onChange={({date}) => setDates(date)}
              timeSelectStart
              range
              mask="9999/99/99"
              displayValueAtRangeIndex={0}
              placeholder="Start Date"
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
              onChange={(time) => {
                if (time) {
                  if (isAfter(time, dates[1])) {
                    setDates([time, time]);
                  } else {
                    setDates([time, dates[1]]);
                  }
                }
              }}
            />
          </FormControl>
        </div>
      </div>

      <div
        className={css({
          display: 'none',
          marginRight: theme.sizing.scale300,
          [theme.mediaQuery.medium]: {
            display: 'block',
          },
        })}
      >
        <ArrowRight size={24} />
      </div>

      <div className={css({display: 'flex'})}>
        <div
          className={css({
            width: '120px',
            marginRight: theme.sizing.scale300,
          })}
        >
          <FormControl label="End Date" caption="yyyy/MM/DD">
            <DatePicker
              value={dates}
              onChange={({date}) => setDates(date)}
              timeSelectEnd
              range
              mask="9999/99/99"
              displayValueAtRangeIndex={1}
              placeholder="End Date"
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
              onChange={(time) => {
                if (time) {
                  if (isBefore(time, dates[0])) {
                    setDates([time, time]);
                  } else {
                    setDates([dates[0], time]);
                  }
                }
              }}
            />
          </FormControl>
        </div>
      </div>
    </div>
  );
}
