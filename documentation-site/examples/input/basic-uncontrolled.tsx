import * as React from "react";
import { StatefulInput } from "baseui/input";

export default function Example() {
  return (
    <StatefulInput
      initialState={{ value: "I manage my own state..." }}
      placeholder="I manage my own state..."
    />
  );
}
