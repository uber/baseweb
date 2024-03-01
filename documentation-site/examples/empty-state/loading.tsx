import * as React from "react";
import { useStyletron } from "baseui";
import { Spinner } from "baseui/spinner";

export default function Example() {
  const [css, theme] = useStyletron();
  return (
    <div
      className={css({
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      })}
    >
      <Spinner
        $borderWidth={theme.sizing.scale100}
        $size={theme.sizing.scale1600}
      />
      <div
        className={css({
          ...theme.typography.HeadingXSmall,
          paddingBlockStart: theme.sizing.scale650,
          paddingBlockEnd: theme.sizing.scale500,
        })}
      >
        Loading...
      </div>
    </div>
  );
}
