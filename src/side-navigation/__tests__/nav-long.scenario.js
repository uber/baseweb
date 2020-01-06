/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {Navigation} from '../index.js';

export const name = 'nav-long';

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

function areEqualShallow(a, b) {
  if (!a || !b) return false;
  if (typeof a !== 'object' || typeof b !== 'object') return false;

  if (Object.keys(a).length !== Object.keys(b).length) return false;

  for (var key in a) {
    if (a[key] !== b[key]) {
      return false;
    }
  }
  return true;
}

function pragmaticCompare(prevProps, nextProps) {
  return (
    prevProps.$active === nextProps.$active &&
    prevProps.$level === nextProps.$level &&
    prevProps.$selectable === nextProps.$selectable &&
    areEqualShallow(prevProps.item, nextProps.item)
  );
}

export const component = () => {
  const [location, setLocation] = React.useState('0');
  const [floor, setFloor] = React.useState(0);
  const [items, setItems] = React.useState([]);
  const [color, setColor] = React.useState('red');

  React.useEffect(() => setItems(createItems(floor)), [floor]);

  return (
    <div>
      <button onClick={() => setFloor(floor + 1)}>
        change (this works since we compare item)
      </button>
      <button
        onClick={() => {
          if (color === 'red') {
            setColor('green');
          } else {
            setColor('red');
          }
        }}
      >
        change override (this does not work with given comparator)
      </button>

      <Navigation
        onChange={({event, item}) => {
          event.preventDefault();
          setLocation(item.itemId);
        }}
        items={items}
        itemMemoizationComparator={pragmaticCompare}
        activeItemId={location}
        overrides={{NavItem: {style: {color}}}}
      />
    </div>
  );
};
