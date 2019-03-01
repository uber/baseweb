import React from 'react';
import {StatefulList} from 'baseui/dnd-list';

export default () => (
  <StatefulList
    removable
    initialState={{
      items: ['Item 1', 'Item 2', 'Item 3'],
    }}
  />
);
