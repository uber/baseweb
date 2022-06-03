// @flow
import * as React from 'react';
import {Badge, COLOR} from 'baseui/badge';

export default function Example() {
  return (
    <React.Fragment>
      Dining nearby <Badge color={COLOR.positive} content="New" />
    </React.Fragment>
  );
}
