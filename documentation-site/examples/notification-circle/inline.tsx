import * as React from "react";
import { NotificationCircle, COLOR } from "baseui/badge";

export default function Example() {
  return (
    <React.Fragment>
      Inbox <NotificationCircle color={COLOR.positive} content={14} />
    </React.Fragment>
  );
}
