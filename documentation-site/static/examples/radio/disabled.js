import React from 'react';
import {Radio, RadioGroup} from 'baseui/radio';

export default function Disabled() {
  return (
    <RadioGroup name="radio group" value="1">
      <Radio disabled value="1">
        Checked
      </Radio>
      <Radio disabled value="2">
        Unchecked
      </Radio>
    </RadioGroup>
  );
}
