import * as React from 'react';
import {Tag} from 'baseui/tag';

export default function Example() {
  return (
    <React.Fragment>
      <React.Fragment>
        <Tag variant="solid">solid</Tag>
      </React.Fragment>

      <React.Fragment>
        <Tag variant="light">light</Tag>
      </React.Fragment>

      <React.Fragment>
        <Tag variant="outlined">outlined</Tag>
      </React.Fragment>
    </React.Fragment>
  );
}
