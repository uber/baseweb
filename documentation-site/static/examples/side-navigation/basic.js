import React from 'react';
import {Navigation} from 'baseui/side-navigation';
import nav from './data.js';

export default () => (
  <Navigation
    items={nav}
    activeItemId={'/'}
    onChange={item => console.log(item)}
  />
);
