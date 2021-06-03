/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import Search from '../../icon/search.js';
import {ListItem, ListItemLabel, ARTWORK_SIZES} from '../index.js';

export default function Scenario() {
  return (
    <div
      style={{width: '375px', padding: '24px', backgroundColor: 'lightgreen'}}
    >
      <ListItem>
        <ListItemLabel>No Artwork</ListItemLabel>
      </ListItem>

      <ListItem artwork={Search} artworkSize={ARTWORK_SIZES.SMALL}>
        <ListItemLabel>Small Artwork</ListItemLabel>
      </ListItem>

      <ListItem artwork={Search} artworkSize={ARTWORK_SIZES.MEDIUM}>
        <ListItemLabel>Medium Artwork</ListItemLabel>
      </ListItem>

      <ListItem artwork={Search} artworkSize={ARTWORK_SIZES.LARGE}>
        <ListItemLabel>Large Artwork</ListItemLabel>
      </ListItem>

      <ListItem
        artwork={() => (
          <div
            style={{
              backgroundColor: 'lightskyblue',
              width: '64px',
              height: '24px',
            }}
          />
        )}
        artworkSize={64}
      >
        <ListItemLabel>64px Artwork</ListItemLabel>
      </ListItem>

      <ListItem
        artwork={() => (
          <div
            style={{
              backgroundColor: 'lightskyblue',
              width: '96px',
              height: '24px',
            }}
          />
        )}
        artworkSize={96}
      >
        <ListItemLabel>96px Artwork</ListItemLabel>
      </ListItem>
    </div>
  );
}
