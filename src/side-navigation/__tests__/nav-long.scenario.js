/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {Navigation} from '../index.js';

export const name = 'side-navigation-long';

function createItems(floor) {
  const nav = [];
  for (let i = 0; i < 300; i++) {
    nav.push({
      title: `item ${i + floor + 1}`,
      itemId: String(i),
    });
  }
  return nav;
}

export const component = () => {
  const [location, setLocation] = React.useState('0');
  const [floor, setFloor] = React.useState(0);
  const [items, setItems] = React.useState([]);
  const [color, setColor] = React.useState('red');

  React.useEffect(() => setItems(createItems(floor)), [floor]);

  return (
    <div>
      <button onClick={() => setFloor(floor + 1)}>change</button>
      <button
        onClick={() => {
          if (color === 'red') {
            setColor('green');
          } else {
            setColor('red');
          }
        }}
      >
        change override
      </button>

      <Navigation
        onChange={({event, item}) => {
          event.preventDefault();
          setLocation(item.itemId);
        }}
        items={items}
        activeItemId={location}
      />
    </div>
  );
};
