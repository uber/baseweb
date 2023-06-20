/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import ChevronRight from 'baseui/icon/chevron-right';
import Check from 'baseui/icon/check';
import {ListItem, ListItemLabel, ARTWORK_SIZES} from 'baseui/list';

export default function Example() {
  return (
    <div>
      <ListItem
        onClick={() => console.log('click')}
        artwork={Check}
        artworkSize={ARTWORK_SIZES.MEDIUM}
        endEnhancer={() => <ChevronRight />}
      >
        <ListItemLabel description="description">
          Label
        </ListItemLabel>
      </ListItem>
    </div>
  );
}
