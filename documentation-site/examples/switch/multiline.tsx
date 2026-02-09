import * as React from "react";
import { Switch } from "baseui/switch";

export default function Example() {
  const [checked, setChecked] = React.useState(true);
  return (
    <Switch checked={checked} onChange={() => setChecked(!checked)}>
      It started as a simple idea: What if you could request a ride from your
      phone? More than 5 billion trips later, we’re working to make
      transportation safer and more accessible, helping people order food
      quickly and affordably, reducing congestion in cities by getting more
      people into fewer cars, and creating opportunities for people to work on
      their own terms.
    </Switch>
  );
}
