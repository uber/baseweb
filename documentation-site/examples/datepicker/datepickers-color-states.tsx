import React from 'react';

import {FormControl} from 'baseui/form-control';
import {Block} from 'baseui/block';
import {FlexGrid} from 'baseui/flex-grid';
import {
  StatefulDatepicker,
  TimePicker,
  TimezonePicker,
} from 'baseui/datepicker';

export default () => {
  return (
    <React.Fragment>
      Disabled state
      <FlexGrid flexDirection="row">
        <Block width="120px" marginRight="scale500">
          <FormControl label="DatePicker">
            <StatefulDatepicker disabled />
          </FormControl>
        </Block>
        <Block width="120px" marginRight="scale500">
          <FormControl label="TimePicker">
            <TimePicker disabled />
          </FormControl>
        </Block>
        <Block flex="1">
          <FormControl label="TimezonePicker">
            <TimezonePicker disabled />
          </FormControl>
        </Block>
      </FlexGrid>
      Positive state
      <FlexGrid flexDirection="row">
        <Block width="120px" marginRight="scale500">
          <FormControl label="DatePicker">
            <StatefulDatepicker positive />
          </FormControl>
        </Block>
        <Block width="120px" marginRight="scale500">
          <FormControl label="TimePicker">
            <TimePicker positive />
          </FormControl>
        </Block>
        <Block flex="1">
          <FormControl label="TimezonePicker">
            <TimezonePicker positive />
          </FormControl>
        </Block>
      </FlexGrid>
      Error state
      <FlexGrid flexDirection="row">
        <Block width="120px" marginRight="scale500">
          <FormControl label="DatePicker">
            <StatefulDatepicker error />
          </FormControl>
        </Block>
        <Block width="120px" marginRight="scale500">
          <FormControl label="TimePicker">
            <TimePicker error />
          </FormControl>
        </Block>
        <Block flex="1">
          <FormControl label="TimezonePicker">
            <TimezonePicker error />
          </FormControl>
        </Block>
      </FlexGrid>
    </React.Fragment>
  );
};
