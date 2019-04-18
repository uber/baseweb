import React, {useState} from 'react';
import {styled} from 'baseui';
import {TimePicker} from 'baseui/datepicker';
import {FormControl} from 'baseui/form-control';

const Container = styled('div', {width: '120px'});

export default () => {
  const [twelveHourTime, setTwelveHourTime] = useState(0);
  const [twentyFourHourTime, setTwentyFourHourTime] = useState(0);

  return (
    <Container>
      <FormControl label="12 hour format">
        <TimePicker value={twelveHourTime} onChange={setTwelveHourTime} />
      </FormControl>
      <FormControl label="24 hour format">
        <TimePicker
          value={twentyFourHourTime}
          onChange={setTwentyFourHourTime}
          format="24"
        />
      </FormControl>
    </Container>
  );
};
