import * as React from 'react';
import {Tag, KIND, VARIANT} from 'baseui/tag';

export default function Scenario() {
  return (
    <React.Fragment>
      {[
        KIND.primary,
        KIND.accent,
        KIND.positive,
        KIND.negative,
        KIND.warning,
      ].map(kind => (
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
            variant={VARIANT.solid}
          >
            {kind}
          </Tag>
        </div>
      ))}
    </React.Fragment>
  );
}
