import * as React from "react";
import { Checkbox } from "baseui/checkbox-v2";

export default function Example() {
  const [checked, setChecked] = React.useState(true);
  return (
    <Checkbox checked={checked} onChange={() => setChecked(!checked)}>
      click me
    </Checkbox>
  );
}
