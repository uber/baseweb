import * as React from "react";
import { Button } from "baseui/button";
import { StatefulPopover } from "baseui/popover";
import { ParagraphSmall } from "baseui/typography";

export default function Example() {
  return (
    <StatefulPopover
      content={
        <ParagraphSmall padding="scale500">
          Server-side rendered (check source!)
        </ParagraphSmall>
      }
      accessibilityType={"tooltip"}
      renderAll
    >
      <Button>Always Rendered for SEO / server-side rendering</Button>
    </StatefulPopover>
  );
}
