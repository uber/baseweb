import * as React from 'react';
import {Breadcrumbs} from 'spaceweb/breadcrumbs';
import {StyledLink as Link} from 'spaceweb/link';

export default () => (
  <Breadcrumbs>
    <Link href="#basic-parent">Parent Page</Link>
    <Link href="#basic-subparent">Sub-Parent Page</Link>
    <span>Current Page</span>
  </Breadcrumbs>
);
