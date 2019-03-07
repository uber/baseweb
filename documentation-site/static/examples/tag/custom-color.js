import React from 'react';
import {Tag, KIND, VARIANT} from 'baseui/tag';

export default () => (
  <>
    <Tag color="#4D26B0" kind={KIND.custom} onClick={() => {}}>
      custom
    </Tag>
    <Tag
      color="#4D26B0"
      variant={VARIANT.outlined}
      kind={KIND.custom}
      onClick={() => {}}
    >
      custom
    </Tag>
    <Tag
      color="#4D26B0"
      variant={VARIANT.solid}
      kind={KIND.custom}
      onClick={() => {}}
    >
      custom
    </Tag>
  </>
);
