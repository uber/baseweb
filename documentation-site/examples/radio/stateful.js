// @flow
import * as React from 'react';
import {Radio, StatefulRadioGroup} from 'baseui/radio';

export default () => (
  <StatefulRadioGroup
    name="choose one option"
    initialState={{value: '2'}}
  >
    <Radio value="1">First</Radio>
    <Radio value="2">Second</Radio>
    <Radio value="3">Third</Radio>
  </StatefulRadioGroup>
);
