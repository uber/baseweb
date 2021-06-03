import React, {useState} from 'react';
import {DatePicker} from 'baseui/datepicker';
import {TimezonePicker} from 'baseui/timezonepicker';
import {FormControl} from 'baseui/form-control';

export default function Example() {
  const [date, setDate] = useState(new Date());
  const [tz, setZone] = useState({
    id: 'America/Fort_Nelson',
    label: 'MST - America/Fort Nelson (GMT -07:00)',
    offset: 420,
  });

  return (
    <React.Fragment>
      <FormControl label="Date">
        <DatePicker
          onChange={({date}) => setDate(date as Date)}
          value={
            date
              ? new Date(date.getTime() + tz.offset * 60000)
              : undefined
          }
        />
      </FormControl>
      <FormControl label="Timezone">
        <TimezonePicker date={date} onChange={setZone} />
      </FormControl>
    </React.Fragment>
  );
}
