import * as React from 'react';
import {Tag} from 'baseui/tag';

export default () => (
  <>
    <React.Fragment>
      <Tag variant="solid" kind="primary">
        solid
      </Tag>
    </React.Fragment>

    <React.Fragment>
      <Tag variant="light" kind="primary">
        light
      </Tag>
    </React.Fragment>

    <React.Fragment>
      <Tag variant="outlined" kind="primary">
        outlined
      </Tag>
    </React.Fragment>
  </>
);
