import * as React from "react";
import { Tag } from "baseui/tag";

export default function Example() {
  return (
    <React.Fragment>
      <React.Fragment>
        <Tag hierarchy="primary">primary</Tag>
      </React.Fragment>

      <React.Fragment>
        <Tag hierarchy="secondary">secondary</Tag>
      </React.Fragment>
    </React.Fragment>
  );
}
