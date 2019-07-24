// @flow
import React, {useState} from 'react';

import {Block} from 'baseui/block';
import {FormControl} from 'baseui/form-control';
import {
  Datepicker,
  TimePicker,
  TimezonePicker,
} from 'baseui/datepicker';

const DATE = new Date(2019, 3, 1, 12, 0, 0);

export default () => {
  const [date, setDate] = useState<any>(DATE);
  const [zone, setZone] = useState(null);

  return (
    <Block display="flex">
      <Block width="120px" marginRight="scale300">
        <FormControl label="Date" caption="YYYY/MM/DD">
          <Datepicker
            value={date}
            onChange={({date}) => setDate(date)}
            timeSelectStart
          />
        </FormControl>
      </Block>

      <Block width="120px" marginRight="scale300">
        <FormControl label="Time" caption="HH:MM">
          <TimePicker value={date} onChange={setDate} />
        </FormControl>
      </Block>

      <Block width="340px">
        <FormControl label="Timezone">
          <TimezonePicker
            date={date}
            value={zone && zone.id}
            onChange={setZone}
          />
        </FormControl>
      </Block>
    </Block>
  );
};
