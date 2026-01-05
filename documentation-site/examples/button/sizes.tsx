import * as React from "react";
import { useStyletron } from "baseui";
import { Button, SIZE } from "baseui/button";

export default function Example() {
  const [css, theme] = useStyletron();
  const space = css({ marginBottom: theme.sizing.scale300 });
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
