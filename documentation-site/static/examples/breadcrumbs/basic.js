import React from 'react';
import {Breadcrumbs} from 'baseui/breadcrumbs';
import {StyledLink as Link} from 'baseui/link';

export default () => (
  <Breadcrumbs>
    <Link href="#">Parent Page</Link>
    <Link href="#">Sub-Parent Page</Link>
    <span>Current Page</span>
  </Breadcrumbs>
);
