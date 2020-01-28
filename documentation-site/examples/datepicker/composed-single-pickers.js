// @flow
import React, {useState} from 'react';

import {useStyletron} from 'baseui';
import {FormControl} from 'baseui/form-control';
import {Datepicker} from 'baseui/datepicker';
import {TimePicker} from 'baseui/timepicker';
import {TimezonePicker} from 'baseui/timezonepicker';

const DATE = new Date(2019, 3, 1, 12, 0, 0);

export default () => {
  const [css, theme] = useStyletron();
  const [date, setDate] = useState<any>(DATE);
  const [zone, setZone] = useState(null);

  return (
    <div className={css({display: 'flex'})}>
      <div
        className={css({
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
        className={css({
          width: '120px',
          marginRight: theme.sizing.scale300,
        })}
      >
        <FormControl label="Time" caption="HH:MM">
          <TimePicker value={date} onChange={setDate} />
        </FormControl>
      </div>

      <div
        className={css({
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
