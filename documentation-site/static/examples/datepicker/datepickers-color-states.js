import React, {useState} from 'react';

import {FormControl} from 'baseui/form-control';
import {Block} from 'baseui/block';
import {FlexGrid} from 'baseui/flex-grid';
import {
  StatefulDatepicker,
  TimePicker,
  TimezonePicker,
} from 'baseui/datepicker';
import {Radio, RadioGroup} from 'baseui/radio';

const STATES = ['normal', 'disabled', 'positive', 'error'];

const Pickers = ({pickersState}) => (
  <FlexGrid flexDirection="row">
    <Block width="120px" marginRight="scale500">
      <FormControl label="DatePicker">
        <StatefulDatepicker
          disabled={pickersState === 'disabled'}
          positive={pickersState === 'positive'}
          error={pickersState === 'error'}
        />
      </FormControl>
    </Block>
    <Block width="120px" marginRight="scale500">
      <FormControl label="TimePicker">
        <TimePicker
          disabled={pickersState === 'disabled'}
          positive={pickersState === 'positive'}
          error={pickersState === 'error'}
        />
      </FormControl>
    </Block>
    <Block flex="1">
      <FormControl label="TimezonePicker">
        <TimezonePicker
          disabled={pickersState === 'disabled'}
          positive={pickersState === 'positive'}
          error={pickersState === 'error'}
        />
      </FormControl>
    </Block>
  </FlexGrid>
);

export default () => {
  const [pickersState, setPickersState] = useState('positive');
  return (
    <>
      <RadioGroup
        name="Chose pickers state"
        onChange={e => setPickersState(e.target.value)}
        value={pickersState}
      >
        {STATES.map((val, index) => (
          <Radio value={val} key={index}>
            {val}
          </Radio>
        ))}
      </RadioGroup>
      <Pickers pickersState={pickersState} />
    </>
  );
};
