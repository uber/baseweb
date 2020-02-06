import * as React from 'react';
import {useStyletron} from 'baseui';
import {TimezonePicker} from 'spaceweb/timezonepicker';
import {FormControl} from 'spaceweb/form-control';

export default () => {
  const [css] = useStyletron();
  return (
    <div className={css({width: '400px'})}>
      <FormControl label="daylight savings time">
        <TimezonePicker date={new Date(2019, 3, 1)} />
      </FormControl>
      <FormControl label="standard time">
        <TimezonePicker date={new Date(2019, 2, 1)} />
      </FormControl>
    </div>
  );
};
