import * as React from "react";
import { Radio, RadioGroup } from "baseui/radio-v2";
import { RadioOverrides } from "baseui/radio-v2";

export default function Example() {
  const [value, setValue] = React.useState("1");
  const radioOverrides: RadioOverrides = {
    RadioMarkOuter: {
      style: ({ $theme }) => ({
        backgroundColor: $theme.colors.positive,
      }),
    },
  };
  return (
    <RadioGroup
      name="overrides"
      onChange={(e) => setValue(e.target.value)}
      value={value}
    >
      <Radio overrides={radioOverrides} value="1">
        Custom label for value 1
      </Radio>
      <Radio overrides={radioOverrides} value="2">
        Custom label for value 2
      </Radio>
      <Radio overrides={radioOverrides} value="3">
        Custom label for value 3
      </Radio>
    </RadioGroup>
  );
}
