import * as React from "react";
import { HintDot, COLOR } from "baseui/badge";
import { Skeleton } from "baseui/skeleton";

export default function Example() {
  return (
    <HintDot color={COLOR.accent}>
      <Skeleton width="48px" height="48px" />
    </HintDot>
  );
}
