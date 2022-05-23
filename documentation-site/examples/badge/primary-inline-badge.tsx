import * as React from 'react';
import {InlineBadge, COLOR} from 'baseui/badge';

export default function Example() {
  return (
    <React.Fragment>
      Dining nearby{' '}
      <InlineBadge color={COLOR.positive}>New</InlineBadge>
    </React.Fragment>
  );
}
