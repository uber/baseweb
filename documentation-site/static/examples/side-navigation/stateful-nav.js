import React from 'react';
import {StatefulNavigation} from 'baseui/side-navigation';
import nav from './data.js';

export default () => (
  <StatefulNavigation
    items={nav}
    initialState={{activeItemId: '#level1.2'}}
    onChange={item => console.log(item)}
  />
);
