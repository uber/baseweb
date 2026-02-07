import * as React from "react";
import { Checkbox } from "baseui/checkbox-v2";

export default function Example() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Checkbox disabled>Disabled checkbox</Checkbox>
      <Checkbox disabled checked>
        Disabled checkbox (checked)
      </Checkbox>
    </div>
  );
}
