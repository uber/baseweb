import * as React from "react";
import { Tag, KIND, HIERARCHY } from "baseui/tag";

export default function Example() {
  return (
    <React.Fragment>
      <Tag
        color="#4327F1"
        hierarchy={HIERARCHY.primary}
        kind={KIND.custom}
        onClick={() => {}}
      >
        custom
      </Tag>
      <br />
      <Tag color="#4327F1" kind={KIND.custom} onClick={() => {}}>
        custom
      </Tag>
      <br />
      <Tag
        color="#4327F1"
        hierarchy={HIERARCHY.secondary}
        kind={KIND.custom}
        onClick={() => {}}
      >
        custom
      </Tag>
    </React.Fragment>
  );
}
