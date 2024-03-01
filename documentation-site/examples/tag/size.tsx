import * as React from "react";
import { Tag, SIZE } from "baseui/tag";

export default function Example() {
  return (
    <React.Fragment>
      <Tag size={SIZE.small}>small</Tag>
      <Tag size={SIZE.medium}>medium</Tag>
      <Tag size={SIZE.large}>large</Tag>
    </React.Fragment>
  );
}
