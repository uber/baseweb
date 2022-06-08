// @flow
import * as React from 'react';
import {Tag, SIZE} from 'baseui/tag';
import {HintDot, COLOR} from 'baseui/badge';

export default function Example() {
  return (
    <React.Fragment>
      <HintDot
        color={COLOR.negative}
        horizontalOffset="2px"
        verticalOffset="2px"
      >
        <Tag closeable={false} size={SIZE.medium}>
          Ipsum
        </Tag>
      </HintDot>
    </React.Fragment>
  );
}
