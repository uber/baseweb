import React from 'react';
import {Radio, RadioGroup} from 'baseui/radio';

export default function Disabled() {
  return (
    <RadioGroup disabled name="radio group" value="1">
      <Radio value="1">Checked</Radio>
      <Radio value="2">Unchecked</Radio>
    </RadioGroup>
  );
}
