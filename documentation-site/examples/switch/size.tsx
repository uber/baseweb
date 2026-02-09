import * as React from "react";
import { Switch, SIZE } from "baseui/switch";

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
        size={SIZE.default}
      >
        Default size
      </Switch>
      <Switch
        checked={switches[1]}
        onChange={(e) => {
          const nextSwitches = [...switches];
          nextSwitches[1] = e.currentTarget.checked;
          setSwitches(nextSwitches);
        }}
        size={SIZE.small}
      >
        Small size
      </Switch>
    </div>
  );
}
