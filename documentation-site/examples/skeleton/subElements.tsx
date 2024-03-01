import * as React from "react";
import { Skeleton } from "baseui/skeleton";

export default function Example() {
  return (
    <Skeleton
      rows={3}
      width="200px"
      overrides={{
        Row: {
          style: {
            height: "20px",
            marginBottom: "15px",
          },
        },
      }}
    />
  );
}
