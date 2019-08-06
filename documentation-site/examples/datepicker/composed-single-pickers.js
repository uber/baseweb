// @flow
import React, {useState} from 'react';

import {useStyletron} from 'baseui';
import {FormControl} from 'baseui/form-control';
import {
  Datepicker,
  TimePicker,
  TimezonePicker,
} from 'baseui/datepicker';

const DATE = new Date(2019, 3, 1, 12, 0, 0);

export default () => {
  const [useCss, theme] = useStyletron();
  const [date, setDate] = useState<any>(DATE);
  const [zone, setZone] = useState(null);

  return (
    <div className={useCss({display: 'flex'})}>
      <div
        className={useCss({
          width: '120px',
          marginRight: theme.sizing.scale300,
        })}
      >
        <FormControl label="Date" caption="YYYY/MM/DD">
          <Datepicker
            value={date}
            onChange={({date}) => setDate(date)}
            timeSelectStart
          />
        </FormControl>
      </div>

      <div
        className={useCss({
          width: '120px',
          marginRight: theme.sizing.scale300,
        })}
      >
        <FormControl label="Time" caption="HH:MM">
          <TimePicker value={date} onChange={setDate} />
        </FormControl>
      </div>

      <div
        className={useCss({
          width: '340px',
        })}
      >
        <FormControl label="Timezone">
          <TimezonePicker
            date={date}
            value={zone && zone.id}
            onChange={setZone}
          />
        </FormControl>
      </div>
    </div>
  );
};
