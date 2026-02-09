import * as React from "react";
import { Switch } from "baseui/switch";

export default function Example() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "4px",
      }}
    >
      <Switch disabled>Disabled switch</Switch>
      <Switch disabled checked>
        Disabled switch (checked)
      </Switch>
    </div>
  );
}
