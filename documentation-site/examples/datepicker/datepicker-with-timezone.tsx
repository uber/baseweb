import React, {useState} from 'react';
import {Datepicker, TimezonePicker} from 'baseui/datepicker';
import {FormControl} from 'baseui/form-control';

export default () => {
  const [date, setDate] = useState(new Date());
  const [tz, setZone] = useState({
    id: 'America/Fort_Nelson',
    label: 'MST - America/Fort Nelson (GMT -07:00)',
    offset: 420,
  });

  return (
    <React.Fragment>
      <FormControl label="Date">
        <Datepicker
          onChange={({date}) => {
            setDate(date as Date);
          }}
          value={new Date(date.getTime() + tz.offset * 60000)}
        />
      </FormControl>
      <FormControl label="Timezone">
        <TimezonePicker date={date} onChange={setZone} />
      </FormControl>
    </React.Fragment>
  );
};
