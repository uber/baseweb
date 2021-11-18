/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {useStyletron} from '../../styles/index.js';

import {AppNavBar, setItemActive} from '../index.js';

export function Scenario() {
  const [css] = useStyletron();

  const [mainItems, setMainItems] = React.useState([
    {label: 'main one', info: {color: 'blue'}},
    {label: 'main two', info: {color: 'red'}},
    {label: 'main three', info: {color: 'purple'}},
    {label: 'main four', info: {color: 'orange'}},
  ]);

  const userItems = [
    {label: 'user one', info: {color: 'green'}},
    {label: 'user two', info: {color: 'yellow'}},
    {label: 'user three', info: {color: 'lightskyblue'}},
    {label: 'user four', info: {color: 'lightgreen'}},
  ];

  function handleMainItemSelect(item) {
    setMainItems(prev => setItemActive(prev, item));
  }

  return (
    <AppNavBar
      title="map item to node"
      mainItems={mainItems}
      userItems={userItems}
      mapItemToNode={item => (
        <span
          className={css({
            border: `dashed 2px ${item.info ? item.info.color : 'green'}`,
          })}
        >
          {item.info ? `color: ${item.info.color}` : item.label}
        </span>
      )}
      onMainItemSelect={handleMainItemSelect}
    />
  );
}
