import * as React from "react";
import { Radio, RadioGroup } from "baseui/radio";

export default function Example() {
  return (
    <RadioGroup disabled name="disabled" value="1">
      <Radio value="1">Checked</Radio>
      <Radio value="2">Unchecked</Radio>
    </RadioGroup>
  );
}
