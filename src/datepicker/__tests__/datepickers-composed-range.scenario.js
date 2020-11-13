/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React, {useState} from 'react';
import {isAfter, isBefore} from 'date-fns';

import {useStyletron} from '../../styles/index.js';
import {FormControl} from '../../form-control/index.js';
import ArrowRight from '../../icon/arrow-right.js';
import {Datepicker, TimePicker} from '../index.js';

const START_DATE = new Date(2019, 3, 1, 12, 0, 0);
const END_DATE = new Date(2019, 3, 10, 16, 0, 0);

function printDate(dt) {
  if (!dt) return 'undefined';
  return dt.getFullYear() + '/' + (dt.getMonth() + 1) + '/' + dt.getDate();
}

function printTime(dt) {
  if (!dt) return 'undefined';
  return dt.toLocaleTimeString();
}

export default function Controlled() {
  const [css, theme] = useStyletron();
  const [dates, setDates] = useState<Array<Date>>([START_DATE, END_DATE]);

  const inputGap = theme.sizing.scale300;

  return (
    <div>
      <div className={css({display: 'flex', alignItems: 'center'})}>
        <div
          id="start-date"
          className={css({width: '120px', marginRight: inputGap})}
        >
          <FormControl label="Start Date" caption="YYYY/MM/DD">
            <Datepicker
              value={dates}
              // typecast to any because if datepicker is range, value is always array type
              // eslint-disable-next-line flowtype/no-weak-types
              onChange={({date}) => setDates((date: any))}
              timeSelectStart
              range
              placeholder="Start Date"
              displayValueAtRangeIndex={0}
              mask="9999/99/99"
              overrides={{
                TimeSelectContainer: {
                  props: {id: 'time-select-start'},
                },
              }}
            />
          </FormControl>
        </div>

        <div
          id="start-time"
          className={css({width: '120px', marginRight: inputGap})}
        >
          <FormControl label="Start Time" caption="HH:MM">
            <TimePicker
              value={dates[0]}
              onChange={time => {
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

        <div className={css({marginRight: inputGap})}>
          <ArrowRight size={24} />
        </div>

        <div
          id="end-date"
          className={css({width: '120px', marginRight: inputGap})}
        >
          <FormControl label="End Date" caption="YYYY/MM/DD">
            <Datepicker
              value={dates}
              // typecast to any because if datepicker is range, value is always array type
              // eslint-disable-next-line flowtype/no-weak-types
              onChange={({date}) => setDates((date: any))}
              timeSelectEnd
              range
              placeholder="End Date"
              displayValueAtRangeIndex={1}
              mask="9999/99/99"
            />
          </FormControl>
        </div>

        <div id="end-time" className={css({width: '120px'})}>
          <FormControl label="End Time" caption="HH:MM">
            <TimePicker
              value={dates[1]}
              onChange={time => {
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

      <button id="set-undefined" onClick={() => setDates([])}>
        set undefined
      </button>

      <div>
        <p id="display-start-date">{printDate(dates[0])}</p>
        <p id="display-start-time">{printTime(dates[0])}</p>
        <p id="display-end-date">{printDate(dates[1])}</p>
        <p id="display-end-time">{printTime(dates[1])}</p>
      </div>
    </div>
  );
}
