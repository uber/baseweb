import * as React from 'react';
import {Tag, KIND, VARIANT} from 'baseui/tag';

export default function Example() {
  return (
    <React.Fragment>
      <Tag
        color="#4327F1"
        variant={VARIANT.solid}
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
        variant={VARIANT.outlined}
        kind={KIND.custom}
        onClick={() => {}}
      >
        custom
      </Tag>
    </React.Fragment>
  );
}
