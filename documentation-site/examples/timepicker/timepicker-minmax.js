// @flow
import React, {useState} from 'react';
import {useStyletron} from 'baseui';
import {TimePicker} from 'baseui/timepicker';
import {FormControl} from 'baseui/form-control';

const initial = new Date('December 6, 2021 9:00:00');
const sameDateMin = new Date('December 6, 2021 8:00:00');
const sameDateMax = new Date('December 6, 2021 10:00:00');
const beyondDateMin = new Date('December 4, 2021 8:00:00');
const beyondDateMax = new Date('December 8, 2021 10:00:00');

export default function Example() {
  const [css] = useStyletron();
  const [sameDate, setSameDate] = useState(initial);
  const [clampDate, setClampDate] = useState(initial);
  const [ignoreDate, setIgnoreDate] = useState(initial);

  return (
    <div className={css({width: '500px'})}>
      <FormControl
        label="min/max times on the same date"
        id="same-date"
      >
        <TimePicker
          value={sameDate}
          minTime={sameDateMin}
          maxTime={sameDateMax}
          onChange={setSameDate}
        />
      </FormControl>

      <FormControl
        label="min/max times beyond the value date clamp to date start/end"
        id="clamp-date"
      >
        <TimePicker
          value={clampDate}
          minTime={beyondDateMin}
          maxTime={beyondDateMax}
          onChange={setClampDate}
        />
      </FormControl>

      <FormControl
        label="min/max times can also ignore the date components"
        id="ignore-date"
      >
        <TimePicker
          ignoreMinMaxDateComponent
          value={ignoreDate}
          minTime={beyondDateMin}
          maxTime={beyondDateMax}
          onChange={setIgnoreDate}
        />
      </FormControl>
    </div>
  );
}
