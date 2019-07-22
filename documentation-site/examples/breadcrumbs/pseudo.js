// @flow
import * as React from 'react';
import {Breadcrumbs} from 'baseui/breadcrumbs';
import {StyledLink as Link} from 'baseui/link';

export default () => (
  <Breadcrumbs
    overrides={{
      ListItem: {
        style: ({$itemIndex, $theme}) => {
          if ($itemIndex === 0) return {};
          return {
            ':before': {
              content: "'>'",
              color: $theme.colors.mono700,
              marginLeft: $theme.sizing.scale400,
              marginRight: $theme.sizing.scale400,
              ...$theme.typography.font450,
            },
          };
        },
      },
      Separator: {
        component: () => null,
      },
    }}
  >
    <Link href="#">Parent Page</Link>
    <Link href="#">Sub-Parent Page</Link>
    <span>Current Page</span>
  </Breadcrumbs>
);
