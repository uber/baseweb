import * as React from "react";

import { StatefulInput } from "baseui/input";
import { useStyletron } from "baseui";

export default function Example() {
  const [css] = useStyletron();
  return (
    <div
      className={css({
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      })}
    >
      <StatefulInput />
    </div>
  );
}
