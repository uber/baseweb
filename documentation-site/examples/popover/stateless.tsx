import * as React from "react";
import { useStyletron } from "baseui";
import { Popover } from "baseui/popover";
import { ParagraphSmall } from "baseui/typography";

export default function Example() {
  const [css, theme] = useStyletron();
  return (
    <Popover
      isOpen
      content={<ParagraphSmall padding="scale500">hello world</ParagraphSmall>}
    >
      <div className={css({ ...theme.typography.font300 })}>Always open</div>
    </Popover>
  );
}
