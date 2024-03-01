import * as React from "react";
import { AspectRatioBox, AspectRatioBoxBody } from "baseui/aspect-ratio-box";

export default function Example() {
  return (
    <AspectRatioBox width="scale1400">
      <AspectRatioBoxBody
        as="img"
        // @ts-ignore
        src="https://avatars.dicebear.com/api/human/aspect.svg?width=285&mood=happy"
      />
    </AspectRatioBox>
  );
}
