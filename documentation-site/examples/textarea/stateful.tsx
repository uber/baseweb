import * as React from "react";
import { StatefulTextarea } from "baseui/textarea";

export default function Example() {
  return (
    <StatefulTextarea
      initialState={{ value: "I manage my own state..." }}
      onChange={console.log}
      placeholder="I manage my own state..."
    />
  );
}
