import * as React from 'react';
import {Tag} from 'baseui/tag';

export default () => (
  <React.Fragment>
    <Tag kind="neutral">neutral</Tag>

    <Tag kind="primary">primary</Tag>

    <Tag kind="positive">positive</Tag>

    <Tag kind="warning">warning</Tag>

    <Tag kind="negative">negative</Tag>
  </React.Fragment>
);
