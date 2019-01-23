import React from 'react';
import {Tag, KIND} from 'baseui/tag';

export default () => (
  <React.Fragment>
    <Tag kind={KIND.primary}>{KIND.primary}</Tag>
    <Tag kind={KIND.warning}>{KIND.warning}</Tag>
    <Tag kind={KIND.positive}>{KIND.positive}</Tag>
    <Tag kind={KIND.negative}>{KIND.negative}</Tag>
  </React.Fragment>
);
