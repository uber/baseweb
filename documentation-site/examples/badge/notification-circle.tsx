import * as React from "react";
import { NotificationCircle, COLOR } from "baseui/badge";
import { Skeleton } from "baseui/skeleton";

export default function Example() {
  return (
    <NotificationCircle content={5} color={COLOR.accent}>
      <Skeleton width="48px" height="48px" />
    </NotificationCircle>
  );
}
