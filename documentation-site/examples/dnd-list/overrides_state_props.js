// @flow
import * as React from 'react';
import {StatefulList} from 'baseui/dnd-list';

export default function Example() {
  return (
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
}
