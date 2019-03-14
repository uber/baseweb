import React from 'react';
import {StatefulNavigation} from 'baseui/side-navigation';

const nav = [
  {
    title: 'Colors',
    subnav: [
      {
        title: 'Primary',
        path: '#level1.1.1',
      },
      {
        title: 'Shades',
        path: '#level1.1.2',
        subnav: [
          {
            title: 'Dark',
            path: '#level1.1.2.1',
          },
          {
            title: 'Light',
            path: '#level1.1.2.2',
          },
        ],
      },
    ],
  },
  {
    title: 'Sizing',
    path: '#level1.2',
  },
  {
    title: 'Typography',
    path: '#level1.3',
  },
];

export default () => (
  <StatefulNavigation
    items={nav}
    initialState={{activePath: '#level1.1.1'}}
    onChange={item => console.log(item)}
  />
);
