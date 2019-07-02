import * as React from 'react';
import {StatefulList} from 'baseui/dnd-list';

export default () => (
  <StatefulList
    removable
    initialState={{
      items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'],
    }}
    overrides={{
      Root: {
        style: {
          maxWidth: '300px',
        },
      },
    }}
    onChange={console.log}
  />
);
