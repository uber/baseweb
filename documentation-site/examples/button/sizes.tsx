import * as React from "react";
import { Button, SIZE } from "baseui/button";

export default function Example() {
  return (
    <div
      style={{
        display: "flex",
        gap: "8px",
        flexWrap: "wrap",
        alignItems: "flex-start",
      }}
    >
      {Object.values(SIZE).map((size) => (
        <Button key={size} size={size}>
          {size.charAt(0).toUpperCase() + size.slice(1)}
        </Button>
      ))}
    </div>
  );
}
