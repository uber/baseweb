import * as React from "react";
import { Tag, KIND, HIERARCHY } from "baseui/tag";

export default function Scenario() {
  return (
    <React.Fragment>
      {[
        KIND.black,
        KIND.blue,
        KIND.green,
        KIND.red,
        KIND.yellow,
        KIND.orange,
        KIND.purple,
        KIND.brown,
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
