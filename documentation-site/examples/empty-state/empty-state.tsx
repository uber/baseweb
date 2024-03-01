import * as React from "react";
import { useStyletron } from "baseui";
import { Button, KIND, SHAPE, SIZE } from "baseui/button";
// @ts-ignore
import Hide from "baseui/icon/hide";

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
      <Hide size={theme.sizing.scale1600} />
      <div
        className={css({
          ...theme.typography.HeadingXSmall,
          paddingBlockStart: theme.sizing.scale650,
          paddingBlockEnd: theme.sizing.scale500,
        })}
      >
        All caught up
      </div>
      <div
        className={css({
          ...theme.typography.ParagraphMedium,
          paddingBlockEnd: theme.sizing.scale650,
        })}
      >
        Check back for new messages.
      </div>
      <Button
        onClick={() => {}}
        kind={KIND.secondary}
        shape={SHAPE.pill}
        size={SIZE.compact}
      >
        Go back
      </Button>
    </div>
  );
}
