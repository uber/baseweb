import * as React from "react";
import { Block } from "baseui/block";

export default function Example() {
  return (
    <Block
      as="h2"
      overrides={{
        Block: {
          style: { color: "red" },
        },
      }}
    >
      These styles are provided by styletron
    </Block>
  );
}
