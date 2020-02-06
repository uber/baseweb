import * as React from 'react';
import {StatefulList} from 'spaceweb/dnd-list';

export default () => (
  <StatefulList
    initialState={{
      items: ['Item 1', 'Item 2', 'Item 3'],
    }}
    overrides={{
      Label: {
        style: ({$theme, $isDragged}) => ({
          color: $isDragged
            ? $theme.colors.primary
            : $theme.colors.accent400,
        }),
      },
    }}
  />
);
