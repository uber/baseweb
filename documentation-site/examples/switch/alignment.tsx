import * as React from "react";
import { Switch, LABEL_PLACEMENT } from "baseui/switch";

export default function Example() {
  const [switches, setSwitches] = React.useState([false, false]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        gap: "4px",
      }}
    >
      <Switch
        checked={switches[0]}
        onChange={(e) => {
          const nextSwitches = [...switches];
          nextSwitches[0] = e.currentTarget.checked;
          setSwitches(nextSwitches);
        }}
        labelPlacement={LABEL_PLACEMENT.left}
      >
        Label on the left
      </Switch>
      <Switch
        checked={switches[1]}
        onChange={(e) => {
          const nextSwitches = [...switches];
          nextSwitches[1] = e.currentTarget.checked;
          setSwitches(nextSwitches);
        }}
        labelPlacement={LABEL_PLACEMENT.right}
      >
        Label on the right
      </Switch>
    </div>
  );
}
