import * as React from "react";
import { Tag, KIND, HIERARCHY } from "baseui/tag";

console.log(KIND);

export default function Scenario() {
  return (
    <React.Fragment>
      {[
        KIND.gray,
        KIND.blue,
        KIND.green,
        KIND.red,
        KIND.yellow,
        KIND.orange,
        KIND.purple,
        KIND.magenta,
        KIND.teal,
        KIND.lime,
      ].map((kind) => (
        <div>
          <Tag
            kind={kind}
            onClick={() => alert(`click ${kind}`)}
            onActionClick={() => alert(`action ${kind}`)}
          >
            {kind}
          </Tag>
          <Tag
            kind={kind}
            onClick={() => alert(`click ${kind}`)}
            onActionClick={() => alert(`action ${kind}`)}
            hierarchy={HIERARCHY.primary}
          >
            {kind}
          </Tag>
        </div>
      ))}
    </React.Fragment>
  );
}
