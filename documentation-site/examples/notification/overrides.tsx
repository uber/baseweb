import * as React from "react";
import { Notification } from "baseui/notification";
import { DeleteAlt } from "baseui/icon";
import { expandBorderStyles } from "baseui/styles";

export default function Example() {
  return (
    <Notification
      overrides={{
        Body: {
          style: ({ $theme }) => ({
            ...expandBorderStyles($theme.borders.border600),
          }),
        },
        CloseIcon: {
          component: DeleteAlt as React.FC<any>,
          style: { float: "right", cursor: "pointer" },
        },
      }}
      closeable
    >
      Notification with overrides
    </Notification>
  );
}
