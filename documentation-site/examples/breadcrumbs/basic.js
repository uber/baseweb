// @flow
import * as React from 'react';
import {Breadcrumbs} from 'baseui/breadcrumbs';
import {StyledLink as Link} from 'baseui/link';

export default function Example() {
  return (
    <Breadcrumbs>
      <Link href="#basic-parent">Parent Page</Link>
      <Link href="#basic-subparent">Sub-Parent Page</Link>
      <span>Current Page</span>
    </Breadcrumbs>
  );
}
