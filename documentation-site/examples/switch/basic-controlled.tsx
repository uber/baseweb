import * as React from "react";
import { Switch } from "baseui/switch";

export default function Example() {
  const [checked, setChecked] = React.useState(true);
  return (
    <Switch checked={checked} onChange={() => setChecked(!checked)}>
      click me
    </Switch>
  );
}
