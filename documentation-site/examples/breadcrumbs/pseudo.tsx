import * as React from 'react';
import {Breadcrumbs} from 'baseui/breadcrumbs';
import {StyledLink as Link} from 'baseui/link';
import {StyleObject} from 'styletron-react';

export default function Example() {
  return (
    <Breadcrumbs
      overrides={{
        ListItem: {
          style: ({$itemIndex, $theme}): StyleObject => {
            if ($itemIndex === 0) return {};
            return {
              ':before': {
                content: "'>'",
                color: $theme.colors.mono700,
                marginLeft: $theme.sizing.scale400,
                marginRight: $theme.sizing.scale400,
                ...$theme.typography.font350,
              },
            };
          },
        },
        Separator: {
          component: () => null,
        },
      }}
    >
      <Link href="#pseudo-parent">Parent Page</Link>
      <Link href="#pseudo-subparent">Sub-Parent Page</Link>
      <span>Current Page</span>
    </Breadcrumbs>
  );
}
