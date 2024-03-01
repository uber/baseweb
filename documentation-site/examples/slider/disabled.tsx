import * as React from "react";
import { Slider } from "baseui/slider";

export default function Example() {
  const [value, setValue] = React.useState([40]);
  return (
    <Slider disabled value={value} onChange={({ value }) => setValue(value)} />
  );
}
