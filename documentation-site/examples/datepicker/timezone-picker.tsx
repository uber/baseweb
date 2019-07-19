import * as React from 'react';
import {Block} from 'baseui/block';
import {TimezonePicker} from 'baseui/datepicker';
import {FormControl} from 'baseui/form-control';

export default () => (
  <Block width="400px">
    <FormControl label="daylight savings time">
      <TimezonePicker date={new Date(2019, 3, 1)} />
    </FormControl>
    <FormControl label="standard time">
      <TimezonePicker date={new Date(2019, 2, 1)} />
    </FormControl>
  </Block>
);
