import React from 'react';
import {Tag, KIND} from 'baseui/tag';

export default () => (
  <React.Fragment>
    <Tag disabled kind={KIND.primary}>
      {KIND.primary}
    </Tag>
    <Tag disabled kind={KIND.warning}>
      {KIND.warning}
    </Tag>
    <Tag disabled kind={KIND.positive}>
      {KIND.positive}
    </Tag>
    <Tag disabled kind={KIND.negative}>
      {KIND.negative}
    </Tag>
  </React.Fragment>
);
