// @flow

import * as React from 'react';
import {Tag, KIND, VARIANT} from 'baseui/tag';

export default function Scenario() {
  return (
    <React.Fragment>
      {[
        KIND.black,
        KIND.blue,
        KIND.red,
        KIND.orange,
        KIND.yellow,
        KIND.green,
        KIND.purple,
        KIND.brown,
      ].map(kind => (
        <div key={kind}>
          <div>
            <Tag kind={kind} closeable={false}>
              Label
            </Tag>
            <Tag
              kind={kind}
              onClick={() => alert('click')}
              closeable={false}
            >
              Label
            </Tag>
            <Tag
              kind={kind}
              variant={VARIANT.solid}
              closeable={false}
            >
              Label
            </Tag>
            <Tag kind={kind} disabled closeable={false}>
              Label
            </Tag>
          </div>
          <div>
            <Tag kind={kind} onActionClick={() => alert('action')}>
              Label
            </Tag>
            <Tag
              kind={kind}
              onClick={() => alert('click')}
              onActionClick={() => alert('action')}
            >
              Label
            </Tag>
            <Tag
              kind={kind}
              variant={VARIANT.solid}
              onActionClick={() => alert('action')}
            >
              Label
            </Tag>
            <Tag
              kind={kind}
              disabled
              onActionClick={() => alert('action')}
            >
              Label
            </Tag>
          </div>
        </div>
      ))}
    </React.Fragment>
  );
}
