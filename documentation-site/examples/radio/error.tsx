import * as React from "react";
import { Radio, RadioGroup } from "baseui/radio";

export default function Example() {
  const [value, setValue] = React.useState("1");
  return (
    <RadioGroup
      error
      name="error"
      onChange={(e) => setValue(e.target.value)}
      value={value}
    >
      <Radio value="1">First</Radio>
      <Radio value="2">Second</Radio>
      <Radio value="3">Third</Radio>
    </RadioGroup>
  );
}
