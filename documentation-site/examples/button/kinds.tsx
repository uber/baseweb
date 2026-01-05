import * as React from "react";
import { Button, KIND } from "baseui/button";

export default function Example() {
  return (
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
      {Object.values(KIND).map((kind) => (
        <Button key={kind} kind={kind}>
          {kind.charAt(0).toUpperCase() + kind.slice(1)}
        </Button>
      ))}
    </div>
  );
}
